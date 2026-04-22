import { useRouter } from 'expo-router';
import { Info } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const ChooseModeScreen = () => {
  const router = useRouter();
  const modes = ['easy-peasy', 'easy', 'medium', 'hard', 'hardcore'];
  const [selectedMode, setSelectedMode] = useState(2);

  return (
    <AppLayout title="choose strictness" showBack>
      <Card>
        <View style={styles.rowGap}>
          <Info size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardText}>how strict do you want your accountability to be?</Text>
        </View>
      </Card>
      {modes.map((mode, index) => (
        <Pressable key={mode} onPress={() => setSelectedMode(index)} style={[styles.optionRow, selectedMode === index && styles.optionRowActive]}>
          <Text style={styles.optionRowText}>{mode}</Text>
        </Pressable>
      ))}
      <Button text="continue" onPress={() => router.push('/app-picker')} />
    </AppLayout>
  );
};

export default ChooseModeScreen;

