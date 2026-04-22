import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}>
      <Text style={[styles.text, disabled && styles.disabledText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: colors.surfaceAlt,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
  disabledText: {
    color: colors.textSoft,
  },
});
