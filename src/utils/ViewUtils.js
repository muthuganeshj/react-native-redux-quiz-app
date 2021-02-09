import React from 'react'
import { Text } from 'react-native'
import { Typography } from '../styles'

export const Bold = (props) => <Text style={{ fontWeight: Typography.FONT_WEIGHT_BOLD }}>{props.children}</Text>
