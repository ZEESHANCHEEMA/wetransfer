import { Check, Edit3, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Dock } from '../components/Dock';
import { controlledApps } from '../data/mockData';
import { colors } from '../theme';

export function SettingsScreen() {
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const toggleApp = (appId: string) => {
    setSelectedApps((current) =>
      current.includes(appId) ? current.filter((id) => id !== appId) : [...current, appId]
    );
  };

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>todays limit</Text>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerChip}>
              <Plus size={16} color={colors.textMuted} strokeWidth={1.8} />
              <Text style={styles.headerChipText}>select apps</Text>
            </Pressable>
            <Pressable style={styles.headerChip} onPress={() => setBulkEditMode((v) => !v)}>
              {bulkEditMode ? (
                <Check size={16} color={colors.textMuted} strokeWidth={1.8} />
              ) : (
                <Edit3 size={16} color={colors.textMuted} strokeWidth={1.8} />
              )}
              <Text style={styles.headerChipText}>{bulkEditMode ? 'done' : 'multiple'}</Text>
            </Pressable>
          </View>
        </View>

        {bulkEditMode && (
          <Pressable style={styles.selectAll}>
            <View style={[styles.checkbox, selectedApps.length === controlledApps.length && styles.checkboxActive]}>
              {selectedApps.length === controlledApps.length && <Check size={12} color="#fff" strokeWidth={2.4} />}
            </View>
            <Text style={styles.selectAllText}>select all apps</Text>
          </Pressable>
        )}

        {controlledApps.map((app) => {
          const selected = selectedApps.includes(app.id);
          return (
            <Pressable
              key={app.id}
              style={styles.appCard}
              onPress={() => (bulkEditMode ? toggleApp(app.id) : undefined)}>
              <View style={styles.appRow}>
                {bulkEditMode && (
                  <View style={[styles.checkbox, selected && styles.checkboxActive]}>
                    {selected && <Check size={12} color="#fff" strokeWidth={2.4} />}
                  </View>
                )}
                <View style={styles.appInfo}>
                  <Text style={styles.appName}>{app.name}</Text>
                  <Text style={styles.appLimit}>{app.limit} daily</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <Dock />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
    marginBottom: 18,
    gap: 12,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'lowercase' },
  headerActions: { flexDirection: 'row', gap: 10 },
  headerChip: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#ebe8e3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
  headerChipText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textTransform: 'lowercase' },
  selectAll: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  selectAllText: { color: colors.text, fontWeight: '600', textTransform: 'lowercase' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  appCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
  },
  appRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  appInfo: { flex: 1 },
  appName: { color: colors.text, fontSize: 16, fontWeight: '700', textTransform: 'lowercase' },
  appLimit: { color: colors.textMuted, fontSize: 13, marginTop: 4, textTransform: 'lowercase' },
});
