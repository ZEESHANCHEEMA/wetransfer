import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const isValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.header}>
            <Text style={styles.title}>create account</Text>
            <Text style={styles.subtitle}>join us to build better habits</Text>
          </View>

          <View style={styles.form}>
            <FormField value={email} onChangeText={setEmail} placeholder="email address" autoCapitalize="none" />
            <PrimaryButton title="continue" onPress={() => navigation.replace('Home')} disabled={!isValid} />
          </View>

          <Text style={styles.footerText}>
            already have an account?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.goBack()}>
              log in
            </Text>
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    textTransform: 'lowercase',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textMuted,
    textTransform: 'lowercase',
  },
  form: {
    gap: 18,
  },
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '700',
  },
});
