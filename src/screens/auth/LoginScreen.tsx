import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <Text style={styles.heroTitle}>welcome back</Text>
        <Text style={styles.heroSubtitle}>log in to manage your screen time</Text>
        <View style={styles.form}>
          <TextInput value={email} onChangeText={setEmail} placeholder="email" placeholderTextColor={colors.textSoft} style={styles.input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
          <Button text="log in" onPress={() => router.replace('/')} />
        </View>
        <Text style={styles.inlineText}>
          don&apos;t have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/register')}>
            sign up
          </Text>
        </Text>
      </View>
    </AppLayout>
  );
};

export default LoginScreen;

