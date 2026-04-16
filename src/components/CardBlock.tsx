import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { COLORS }  from '../constants/colors';
import { SPACING } from '../constants/spacing';

interface Props {
  children: React.ReactNode;
  style?:   ViewStyle;
}

export default function CardBlock({ children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius:    16,
    borderWidth:     1,
    borderColor:     COLORS.cardBorder,
    padding:         SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical:   SPACING.sm,
  },
});