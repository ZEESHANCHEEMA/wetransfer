import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const RegisterScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <Text style={styles.heroTitle}>create account</Text>
        <Text style={styles.heroSubtitle}>join us to build better habits</Text>
        <View style={styles.form}>
          <TextInput value={email} onChangeText={setEmail} placeholder="email address" placeholderTextColor={colors.textSoft} style={styles.input} />
          <Button text="continue" onPress={() => router.push('/verify-email')} />
        </View>
        <Text style={styles.inlineText}>
          already have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/login')}>
            log in
          </Text>
        </Text>
      </View>
    </AppLayout>
  );
};

export default RegisterScreen;

