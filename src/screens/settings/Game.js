import React from 'react'
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import TextInput from '../../components/ui/TextInput'
import Picker from '../../components/ui/Picker'
import { useSelector, useDispatch } from 'react-redux'

import {
    saveNumberOfQuestions,
    saveQuestionLevel,
    saveQuestionType,
    saveNickName
} from '../../services/settings/settings.service'

import { Typography } from '../../styles';

export default function Settings() {

    const numberOfQuestions = useSelector(state => state.settings.numberOfQuestions)

    const level = useSelector(state => state.settings.level)

    const type = useSelector(state => state.settings.type)

    const nickName = useSelector(state => state.settings.nickName)

    const questionOptions = useSelector(state => state.settings.questionOptions)

    const questionLevelOptions = useSelector(state => state.settings.questionLevelOptions)

    const questionTypeOptions = useSelector(state => state.settings.questionTypeOptions)

    const dispatch = useDispatch()

    const onQuestionOptionsChanged = (value) => dispatch(saveNumberOfQuestions(value))

    const onQuestionLevelOptionsChanged = (value) => dispatch(saveQuestionLevel(value))

    const onQuestionTypeOptionsChanged = (value) => dispatch(saveQuestionType(value))

    const onNickNameChanged = (value) => dispatch(saveNickName(value))

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput
                    testID="nickName"
                    label="Nick Name"
                    value={nickName}
                    maxLength={15}
                    action={onNickNameChanged}
                />
                <Text style={styles.settingsOptionTitle}>Number of questions</Text>
                {
                    questionOptions &&
                    questionOptions.length > 0 &&
                    <Picker
                        selectedValue={numberOfQuestions}
                        options={questionOptions}
                        action={onQuestionOptionsChanged} />
                }
                <Text style={styles.settingsOptionTitle}>Level</Text>
                {
                    questionLevelOptions &&
                    questionLevelOptions.length > 0 &&
                    <Picker
                        selectedValue={level}
                        options={questionLevelOptions}
                        action={onQuestionLevelOptionsChanged} />
                }

                <Text style={styles.settingsOptionTitle}>Type</Text>
                {
                    questionTypeOptions &&
                    questionTypeOptions.length > 0 &&
                    <Picker
                        selectedValue={type}
                        options={questionTypeOptions}
                        action={onQuestionTypeOptionsChanged}/>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16
    },
    settingsOptionTitle: {
        fontSize: Typography.FONT_SIZE_18,
    }
})