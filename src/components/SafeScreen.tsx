import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../constants/spacing';

interface Props {
  children:       React.ReactNode;
  style?:         ViewStyle;
  withBottomNav?: boolean;  
}

const NAV_OFFSET = 64 + SPACING.navBarBottom + 8;

export default function SafeScreen({
  children,
  style,
  withBottomNav = false,
}: Props) {
  const insets = useSafeAreaInsets();

  const paddingTop = Platform.OS === 'android'
    ? SPACING.safeTop
    : insets.top;

  const paddingBottom = Platform.OS === 'android'
    ? SPACING.safeBottom + (withBottomNav ? NAV_OFFSET : 0)
    : insets.bottom    + (withBottomNav ? NAV_OFFSET : 0);

  return (
    <View
      style={[
        styles.root,
        { paddingTop, paddingBottom },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});