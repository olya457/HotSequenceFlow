import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

type Variant = 'purple' | 'brown';

interface Props {
  label:     string;
  onPress:   () => void;
  variant?:  Variant;
  style?:    ViewStyle;
  disabled?: boolean;
  loading?:  boolean;
}

export default function AppButton({
  label,
  onPress,
  variant  = 'purple',
  style,
  disabled = false,
  loading  = false,
}: Props) {
  const bgColor = variant === 'purple' ? COLORS.btnPurple : COLORS.btnBrown;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.btn,
        { backgroundColor: bgColor },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius:      16,
    paddingVertical:   16,
    paddingHorizontal: SPACING.lg,
    alignItems:        'center',
    justifyContent:    'center',
    marginHorizontal:  SPACING.lg,
    minHeight:         54,
  },
  label: {
    color:         COLORS.white,
    fontSize:      17,
    fontWeight:    '700',
    letterSpacing: 0.3,
  },
  disabled: {
    opacity: 0.45,
  },
});