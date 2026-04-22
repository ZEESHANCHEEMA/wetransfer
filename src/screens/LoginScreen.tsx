import { Cloud } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/PrimaryButton';
import { Screen } from '../components/Screen';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.header}>
            <Text style={styles.title}>welcome back</Text>
            <Text style={styles.subtitle}>log in to manage your screen time</Text>
          </View>

          <View style={styles.form}>
            <FormField value={email} onChangeText={setEmail} placeholder="email" autoCapitalize="none" />
            <FormField
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              secureTextEntry
              autoCapitalize="none"
            />
            <PrimaryButton title="log in" onPress={() => navigation.replace('Home')} />
          </View>

          <Pressable>
            <Text style={styles.link}>forgot password?</Text>
          </Pressable>

          <View style={styles.altWrap}>
            <Text style={styles.altLabel}>or continue with</Text>
            <Pressable style={styles.socialBtn}>
              <Text style={styles.socialText}>google</Text>
            </Pressable>
            <Pressable style={styles.socialBtn}>
              <Cloud size={18} color={colors.text} strokeWidth={1.8} />
              <Text style={styles.socialText}>icloud</Text>
            </Pressable>
          </View>

          <Text style={styles.footerText}>
            don&apos;t have an account?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
              sign up
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
    gap: 14,
    marginBottom: 28,
  },
  link: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  altWrap: {
    marginTop: 28,
    gap: 12,
  },
  altLabel: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  socialBtn: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  socialText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'lowercase',
  },
  footerText: {
    marginTop: 28,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    textTransform: 'lowercase',
  },
  footerLink: {
    color: colors.text,
    fontWeight: '700',
  },
});
