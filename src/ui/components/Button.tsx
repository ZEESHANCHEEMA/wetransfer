import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from '../styles';

type ButtonProps = {
  text: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button = ({ text, onPress, variant = 'primary' }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}>
      <Text style={[styles.buttonText, variant === 'secondary' && styles.buttonTextSecondary]}>{text}</Text>
    </Pressable>
  );
};

