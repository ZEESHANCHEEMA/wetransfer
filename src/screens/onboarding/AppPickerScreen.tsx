import { useRouter } from 'expo-router';
import { Check, ChevronRight, Plus, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { appPickerApps } from '../../constants/appPickerApps';
import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const AppPickerScreen = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(['instagram', 'youtube']);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <AppLayout title="choose apps" showBack>
      <Pressable onPress={() => setShowPicker(true)} style={styles.selectAppsCard}>
        <Plus size={22} color={colors.textMuted} strokeWidth={1.8} />
        <View style={styles.flexOne}>
          <Text style={styles.cardTitle}>select apps</Text>
          <Text style={styles.cardText}>choose apps to limit</Text>
        </View>
      </Pressable>

      {selected.map((appId) => (
        <Pressable key={appId} onPress={() => router.push({ pathname: '/settings/[appId]', params: { appId } })} style={styles.listCard}>
          <Text style={styles.cardTitle}>{appId}</Text>
          <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
        </Pressable>
      ))}

      <Button text="continue" onPress={() => router.push('/quiet-hours')} />

      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>select apps</Text>
              <Pressable onPress={() => setShowPicker(false)}>
                <X size={18} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>
            {appPickerApps.map((app) => {
              const active = selected.includes(app.id);
              return (
                <Pressable
                  key={app.id}
                  onPress={() => setSelected((current) => (current.includes(app.id) ? current.filter((id) => id !== app.id) : [...current, app.id]))}
                  style={styles.listCard}>
                  <Text style={styles.cardTitle}>{app.name}</Text>
                  {active ? <Check size={16} color={colors.primary} strokeWidth={2} /> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default AppPickerScreen;

