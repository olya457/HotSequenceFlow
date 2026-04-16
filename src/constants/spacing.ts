import { Platform } from 'react-native';

export const SPACING = {
  safeTop:      Platform.OS === 'android' ? 20 : 0,
  safeBottom:   Platform.OS === 'android' ? 20 : 0,
  navBarBottom: Platform.OS === 'android' ? 30 : 20,

  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};