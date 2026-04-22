import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { colors } from '../theme';

export function FormField(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.textSoft}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 16,
  },
});
