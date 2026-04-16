import React from 'react';
import {
  View, StyleSheet, Platform,
  ViewStyle, StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING } from '../constants/spacing';

const NAV_OFFSET = 64 + SPACING.navBarBottom + 8;

interface Props {
  children:       React.ReactNode;
  style?:         StyleProp<ViewStyle>;
  withBottomNav?: boolean;
}

export default function SafeScreen({ children, style, withBottomNav = false }: Props) {
  const insets = useSafeAreaInsets();

  const paddingTop = Platform.OS === 'android'
    ? SPACING.safeTop
    : insets.top;

  const paddingBottom = Platform.OS === 'android'
    ? SPACING.safeBottom + (withBottomNav ? NAV_OFFSET : 0)
    : insets.bottom    + (withBottomNav ? NAV_OFFSET : 0);

  return (
    <View style={[styles.root, { paddingTop, paddingBottom }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});