import { useRouter } from 'expo-router';
import { Moon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const QuietHoursScreen = () => {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<'block' | 'allow'>('block');

  return (
    <AppLayout title="quiet hours" showBack>
      <Card>
        <View style={styles.rowBetween}>
          <View style={styles.rowGap}>
            <Moon size={20} color={colors.primary} strokeWidth={1.8} />
            <Text style={styles.cardTitle}>enable quiet hours</Text>
          </View>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>
      </Card>
      {enabled ? (
        <>
          <Card>
            <Text style={styles.cardTitle}>10:00 pm - 8:00 am</Text>
            <Text style={styles.cardText}>block apps during specific times</Text>
          </Card>
          <View style={styles.segmented}>
            <Pressable onPress={() => setMode('block')} style={[styles.segment, mode === 'block' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'block' && styles.segmentTextActive]}>block apps</Text>
            </Pressable>
            <Pressable onPress={() => setMode('allow')} style={[styles.segment, mode === 'allow' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'allow' && styles.segmentTextActive]}>allow apps</Text>
            </Pressable>
          </View>
        </>
      ) : null}
      <Button text="continue" onPress={() => router.push('/')} />
    </AppLayout>
  );
};

export default QuietHoursScreen;

