import React from 'react'
import { Text, ActivityIndicator, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { Avatar } from 'react-native-paper';

import { gql, useQuery } from '@apollo/client'
import { Typography } from '../../styles';

export default function Settings() {
    const PROFILE_IMAGE_QUERY = gql`
        query ProfileImage {
            loadProfilePicture {
                data
            }
        }
    `
    const profileImageQuery = useQuery(PROFILE_IMAGE_QUERY)

    const ABOUT_ME_QUERY = gql`
        query About {
            loadInfoAboutMe {
                name
                place
                aboutMe
            }
        }
    `
    const aboutMeQuery = useQuery(ABOUT_ME_QUERY)

    if (aboutMeQuery.loading || profileImageQuery.loading) {
        return <ActivityIndicator color="#25AEDE" size="large" />
    }

    if (aboutMeQuery.error || profileImageQuery.error) {
        return (
            <SafeAreaView>
                <Text>Ops! Something went wrong while loading user profile</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Avatar.Image
                        testID="userProfilePicture"
                        source={{ uri: `data:image/gif;base64,${profileImageQuery.data.loadProfilePicture.data}` }} />

                    <View style={styles.aboutMeContainer}>
                        <Text testID="userName" style={styles.name}>{aboutMeQuery.data.loadInfoAboutMe.name}</Text>
                        <Text testID="userLocation" style={styles.place}>{aboutMeQuery.data.loadInfoAboutMe.place}</Text>
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text testID="userDescription" style={styles.description}>{aboutMeQuery.data.loadInfoAboutMe.aboutMe}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 16
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 24
    },
    aboutMeContainer: {
        margin: 10
    },
    descriptionContainer: {
        margin: 10
    },
    name: {
        fontSize: Typography.FONT_SIZE_18,
        fontWeight: Typography.FONT_WEIGHT_BOLD
    },
    place: {
        fontSize: Typography.FONT_SIZE_14,
        fontWeight: Typography.FONT_WEIGHT_REGULAR
    },
    description: {
        fontSize: Typography.FONT_SIZE_14,
        flexWrap: 'wrap'
    }
})