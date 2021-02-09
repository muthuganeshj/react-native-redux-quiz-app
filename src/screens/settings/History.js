import React from 'react'
import { Text, ActivityIndicator, SafeAreaView, StyleSheet, FlatList, View, Platform } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { Colors, Typography } from '../../styles'

import moment from 'moment';

export default function History(props) {
    const HISTORY_QUERY = gql`
        query History {
            loadGameHistory {
                id
                maxQuestion
                numberOfRightQuestions
                creation_at
            }
        }
    `
    const { data, error, loading } = useQuery(HISTORY_QUERY)

    if (loading) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <ActivityIndicator testID="loading" color={Colors.primary} size="large" />
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView>
                <Text>Ops! Something went wrong while loading game history</Text>
            </SafeAreaView>
        )
    }

    if (!data || !data.loadGameHistory || data.loadGameHistory.length === 0) {
        return (
            <SafeAreaView style={styles.centerContainer}>
                <Text style={styles.noGameHistoryText}>No game history</Text>
            </SafeAreaView>
        )
    }

    const Item = ({ data, index }) => {
        const dateOfGame = moment(data.creation_at)
            .locale('en')
            .format('ddd, D [of] MMMM');

        return (
            <>
                <View style={[ styles.scoreContainer, index % 2 === 0 ? styles.strippedItem : null ]}>
                    <View style={styles.scoreTitleContainer}>
                        <Text style={styles.scoreTitle}>SCORE</Text>
                    </View>

                    <View style={styles.scoreResultContainer}>
                        <Text style={styles.scoreResultText}>{data.numberOfRightQuestions} out of {data.maxQuestion}</Text>
                        <Text>{dateOfGame}</Text>
                    </View>
                </View>
            </>
        )
    }

    const renderItem = ({ item, index }) => {
        console.log(index)
        return <Item data={item} index={index} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                testID="gameHistoryList"
                style={styles.resultList}
                data={data.loadGameHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noGameHistoryText: {
        fontSize: Typography.FONT_SIZE_20
    },
    resultList: {
        margin: 16
    },
    scoreContainer: {
        flexDirection: 'row',
        margin: Platform.OS === 'ios' ? 16 : 10,
        padding: Platform.OS === 'ios' ? 16 : 10
    },
    scoreTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreTitle: {
        fontSize: Typography.FONT_SIZE_24
    },
    scoreDateResultContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    scoreResultContainer: {
        flex: 1,
        marginStart: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    scoreResultText: {
        fontSize: Typography.FONT_SIZE_24,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    strippedItem: {
        backgroundColor: Colors.silver
    }
})