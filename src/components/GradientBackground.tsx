import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Preset = 'splash' | 'onboarding' | 'main';

const BG_COLOR: Record<Preset, string> = {
  splash:     COLORS.splashMid,
  onboarding: COLORS.onboardMid,
  main:       COLORS.mainMid,
};

interface Props {
  preset?:   Preset;
  children?: React.ReactNode;
}

export default function GradientBackground({
  preset   = 'main',
  children,
}: Props) {
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: BG_COLOR[preset] }]}>
      {children}
    </View>
  );
}