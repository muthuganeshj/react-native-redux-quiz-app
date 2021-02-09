import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import { RadioButton } from 'react-native-paper';
import { Colors, Typography } from '../../styles';

export default function RadioButtonComponent(props) {

    const questionChanged = useSelector(state => state.quiz.questionChanged)
    const [ value, setValue ] = useState(null)
    const { options, action } = props

    useEffect(() => {
        if (questionChanged > 0) {
            setValue(null)
        }
    }, [ questionChanged ])

    return (
        <View>
            {options.map(res => {
                return (
                    <View style={styles.container} key={res.key}>
                        <RadioButton
                            testID={res.key}
                            theme={{
                                colors: {
                                    primary: Colors.primary, accent: Colors.primary
                                }
                            }}
                            status={value === res.key ? 'checked' : 'unchecked'}
                            onPress={() => {
                                action(res.key)
                                setValue(res.key);
                            }} />
                        <Text style={styles.radioText}>{res.text}</Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    radioText: {
        marginRight: 35,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.black,
        fontWeight: Typography.FONT_WEIGHT_REGULAR,
        marginStart: 12
    }
});