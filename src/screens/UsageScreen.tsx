import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Dock } from '../components/Dock';
import { limitedApps } from '../data/mockData';
import { colors } from '../theme';

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export function UsageScreen() {
  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>progress</Text>
        </View>

        <View style={styles.compareHeader}>
          <Text style={styles.compareLabel}>without accountability</Text>
          <View style={styles.divider} />
          <Text style={styles.compareLabel}>with accountability</Text>
        </View>

        {limitedApps.map((app) => (
          <View key={app.id} style={styles.card}>
            <Text style={styles.appName}>{app.name.toLowerCase()}</Text>
            <View style={styles.compareRow}>
              <Text style={styles.time}>{formatMinutes(app.beforeAppMinutes)}</Text>
              <View style={styles.miniDivider} />
              <Text style={styles.time}>{formatMinutes(app.todayMinutes)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Dock />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  header: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 16, marginBottom: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'lowercase' },
  compareHeader: {
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0ede8',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  compareLabel: { flex: 1, textAlign: 'center', color: colors.textMuted, fontSize: 11, fontWeight: '600', textTransform: 'lowercase' },
  divider: { width: 1, height: 40, backgroundColor: colors.borderMuted },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },
  appName: { color: colors.textMuted, fontSize: 13, marginBottom: 10, textTransform: 'lowercase' },
  compareRow: { flexDirection: 'row', alignItems: 'center' },
  time: { flex: 1, textAlign: 'center', color: colors.textMuted, fontSize: 24, fontWeight: '700' },
  miniDivider: { width: 1, height: 28, backgroundColor: colors.borderMuted },
});
