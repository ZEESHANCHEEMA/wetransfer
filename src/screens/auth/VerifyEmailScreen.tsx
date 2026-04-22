import { useRouter } from 'expo-router';
import { Mail } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const VerifyEmailScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = useRef<Array<TextInput | null>>([]);

  const setDigit = (index: number, value: string) => {
    const next = [...code];
    next[index] = value.slice(0, 1);
    setCode(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <View style={styles.mailIcon}>
          <Mail size={36} color={colors.white} strokeWidth={1.7} />
        </View>
        <Text style={styles.heroTitle}>check your email</Text>
        <Text style={styles.heroSubtitle}>we sent a verification code to your email</Text>
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              value={digit}
              onChangeText={(value) => setDigit(index, value)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.codeInput}
            />
          ))}
        </View>
        <Button text="continue" onPress={() => router.push('/onboarding')} />
      </View>
    </AppLayout>
  );
};

export default VerifyEmailScreen;

