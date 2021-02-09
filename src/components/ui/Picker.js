import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';

export default function PickerComponent(props) {

    const [ value, setValue ] = useState(props.selectedValue)
    const { options, action } = props

    return (
        <Picker
            selectedValue={value}
            onValueChange={(value, itemIndex) => {
                action(value)
                setValue(value)
            }}>
            {options.map(res => {
                return (
                    <Picker.Item key={res.key} label={res.text} value={res.key} />
                )
            })}
        </Picker>
    );
}