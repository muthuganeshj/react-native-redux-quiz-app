import React, { useState } from 'react'
import { TextInput, HelperText } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { Colors } from '../../styles';

export default function TextInputComponent(props) {
    const { label, value, action, maxLength, testID } = props
    const [ text, setText ] = useState(value);

    const styles = StyleSheet.create({
        counterHelper: {
            textAlign: 'right',
            color: text.length === maxLength ?
                Colors.exceededNumberOfChars :
                Colors.validNumberOfCharacters
        }
    })

    return (
        <>
            <TextInput
                testID={testID}
                theme={{ colors: { primary: Colors.primary } }}
                label={label}
                value={text}
                maxLength={maxLength || 255}
                onChangeText={text => {
                    action(text)
                    setText(text)}
                }/>
            <HelperText visible style={styles.counterHelper}>
                {text.length} / {maxLength || 255}
            </HelperText>
        </>
    );
}