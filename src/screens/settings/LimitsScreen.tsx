import { useRouter } from 'expo-router';
import { Check, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { controlledApps } from '../../data/mockData';
import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const LimitsScreen = () => {
  const router = useRouter();
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  return (
    <AppLayout
      title="todays limit"
      withDock
      right={
        <View style={styles.topActions}>
          <Button text="select apps" variant="secondary" onPress={() => router.push('/app-picker')} />
          <Button text={bulkEditMode ? 'done' : 'multiple'} variant="secondary" onPress={() => setBulkEditMode((value) => !value)} />
        </View>
      }>
      {bulkEditMode ? (
        <Card>
          <Pressable
            onPress={() => setSelectedApps(selectedApps.length === controlledApps.length ? [] : controlledApps.map((app) => app.id))}
            style={styles.rowGap}>
            <View style={[styles.radio, selectedApps.length === controlledApps.length && styles.radioActive]}>
              {selectedApps.length === controlledApps.length ? <Check size={12} color={colors.white} strokeWidth={2} /> : null}
            </View>
            <Text style={styles.cardTitle}>select all apps</Text>
          </Pressable>
        </Card>
      ) : null}

      {controlledApps.map((app) => (
        <Pressable
          key={app.id}
          onPress={() => {
            if (bulkEditMode) {
              setSelectedApps((current) => (current.includes(app.id) ? current.filter((id) => id !== app.id) : [...current, app.id]));
              return;
            }
            router.push({ pathname: '/settings/[appId]', params: { appId: app.id } });
          }}
          style={styles.listCard}>
          <View style={styles.rowGap}>
            {bulkEditMode ? (
              <View style={[styles.radio, selectedApps.includes(app.id) && styles.radioActive]}>
                {selectedApps.includes(app.id) ? <Check size={12} color={colors.white} strokeWidth={2} /> : null}
              </View>
            ) : null}
            <View>
              <Text style={styles.cardTitle}>{app.name}</Text>
              <Text style={styles.cardText}>{app.limit} daily</Text>
            </View>
          </View>
          <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
        </Pressable>
      ))}
      {bulkEditMode && selectedApps.length > 0 ? <Button text="bulk edit selected apps" onPress={() => router.push('/settings/bulk')} /> : null}
    </AppLayout>
  );
};

export default LimitsScreen;

