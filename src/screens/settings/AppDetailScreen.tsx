import { useLocalSearchParams } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, Switch, Text, View } from 'react-native';

import { friends } from '../../data/mockData';
import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const AppDetailScreen = () => {
  const { appId } = useLocalSearchParams<{ appId: string }>();
  const [sameLimit, setSameLimit] = useState(true);
  const [sameDowntime, setSameDowntime] = useState(true);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState<number[]>([1]);
  const name = (appId ?? 'app').toString();

  return (
    <AppLayout title={name} showBack>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>same limit all days</Text>
          <Switch value={sameLimit} onValueChange={setSameLimit} />
        </View>
        <Text style={styles.cardText}>1h 30m</Text>
      </Card>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>same downtime all days</Text>
          <Switch value={sameDowntime} onValueChange={setSameDowntime} />
        </View>
        <Text style={styles.cardText}>10:00 pm - 8:00 am</Text>
      </Card>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>accountability partners</Text>
          <Button text="add" variant="secondary" onPress={() => setShowPartnerModal(true)} />
        </View>
        {selectedPartners.map((id) => {
          const partner = friends.find((friend) => friend.id === id);
          return (
            <Text key={id} style={styles.cardText}>
              {partner?.name ?? 'partner'}
            </Text>
          );
        })}
      </Card>

      <Modal visible={showPartnerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>add partner</Text>
              <Pressable onPress={() => setShowPartnerModal(false)}>
                <X size={18} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>
            {friends.map((friend) => (
              <Pressable
                key={friend.id}
                onPress={() => setSelectedPartners((current) => Array.from(new Set([...current, friend.id])))}
                style={styles.listCard}>
                <Text style={styles.cardTitle}>{friend.name}</Text>
                {selectedPartners.includes(friend.id) ? <Check size={16} color={colors.primary} strokeWidth={2} /> : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default AppDetailScreen;

