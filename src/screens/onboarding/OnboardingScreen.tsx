import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const OnboardingScreen = () => {
  const router = useRouter();
  const features = ['accountability makes it easy', 'you set your own limits', 'need more time? ask your partner'];

  return (
    <AppLayout title="how it works" showBack>
      {features.map((feature) => (
        <Card key={feature}>
          <Text style={styles.cardTitle}>{feature}</Text>
        </Card>
      ))}
      <Button text="continue" onPress={() => router.push('/choose-partner')} />
    </AppLayout>
  );
};

export default OnboardingScreen;

