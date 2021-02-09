import { Platform } from 'react-native'
import { scaleFont } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'Lato-Regular';
export const FONT_FAMILY_BOLD = 'Lato-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_24 = scaleFont(Platform.OS === 'ios' ? 26 : 24);
export const FONT_SIZE_20 = scaleFont(Platform.OS === 'ios' ? 22 : 20);
export const FONT_SIZE_18 = scaleFont(Platform.OS === 'ios' ? 20 : 18);
export const FONT_SIZE_16 = scaleFont(Platform.OS === 'ios' ? 18 : 16);
export const FONT_SIZE_14 = scaleFont(Platform.OS === 'ios' ? 16 : 14);
export const FONT_SIZE_12 = scaleFont(Platform.OS === 'ios' ? 14 : 12);

// LINE HEIGHT
export const LINE_HEIGHT_30 = scaleFont(Platform.OS === 'ios' ? 32 : 30);
export const LINE_HEIGHT_24 = scaleFont(Platform.OS === 'ios' ? 26 : 24);
export const LINE_HEIGHT_20 = scaleFont(Platform.OS === 'ios' ? 22 : 20);
export const LINE_HEIGHT_16 = scaleFont(Platform.OS === 'ios' ? 18 : 16);

// // FONT STYLE
// export const FONT_REGULAR = {
//     fontFamily: FONT_FAMILY_REGULAR,
//     fontWeight: FONT_WEIGHT_REGULAR,
// };

// export const FONT_BOLD = {
//     fontFamily: FONT_FAMILY_BOLD,
//     fontWeight: FONT_WEIGHT_BOLD,
// };