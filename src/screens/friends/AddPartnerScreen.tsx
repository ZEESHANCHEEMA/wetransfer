import { useRouter } from 'expo-router';
import { CheckCircle2, Scan, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, TextInput, View } from 'react-native';

import { choosePartnerContacts } from '../../constants/contacts';
import { colors } from '../../theme';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const AddPartnerScreen = () => {
  const router = useRouter();
  const [showUserIdModal, setShowUserIdModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [added, setAdded] = useState<number[]>([]);
  const isValidUserId = userId.length === 9 && userId.includes('-');

  const handleUserIdChange = (value: string) => {
    let next = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (next.length > 4) next = `${next.slice(0, 4)}-${next.slice(4, 8)}`;
    setUserId(next);
  };

  return (
    <AppLayout title="add partner" showBack>
      <Text style={styles.sectionLabel}>add by user id</Text>
      <View style={styles.largeRowCard}>
        <View style={styles.scanBubble}>
          <Scan size={22} color={colors.white} strokeWidth={1.8} />
        </View>
        <View style={styles.flexOne}>
          <Text style={styles.largeRowTitle}>enter user id</Text>
          <Text style={styles.largeRowSubtitle}>add a friend using their unique code</Text>
        </View>
        <Pressable onPress={() => setShowUserIdModal(true)} style={styles.inlineChip}>
          <Text style={styles.inlineChipText}>enter</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>from contacts</Text>
      {choosePartnerContacts.map((contact) => (
        <View key={contact.id} style={styles.contactListCard}>
          <View style={styles.rowBetween}>
            <View style={styles.contactRow}>
              <Image source={{ uri: contact.image }} style={styles.avatar} />
              <View>
                <Text style={styles.cardTitle}>{contact.name}</Text>
                <Text style={styles.cardText}>{contact.phone}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setAdded((current) => [...current, contact.id])}
              disabled={added.includes(contact.id)}
              style={[styles.addPill, added.includes(contact.id) && styles.addPillDisabled]}>
              {added.includes(contact.id) ? <CheckCircle2 size={15} color={colors.textSoft} strokeWidth={1.8} /> : null}
              <Text style={[styles.addPillText, added.includes(contact.id) && styles.addPillTextDisabled]}>{added.includes(contact.id) ? 'added' : 'add'}</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <Modal visible={showUserIdModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>enter user id</Text>
              <Pressable onPress={() => setShowUserIdModal(false)}>
                <X size={18} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>
            <TextInput
              value={userId}
              onChangeText={handleUserIdChange}
              placeholder="ABCD1234"
              placeholderTextColor={colors.textSoft}
              style={[styles.input, styles.userIdInput]}
              autoCapitalize="characters"
              maxLength={9}
            />
            <Pressable
              onPress={() => {
                setShowUserIdModal(false);
                router.push('/friends');
              }}
              disabled={!isValidUserId}
              style={[styles.fullButton, !isValidUserId && styles.fullButtonDisabled]}>
              <Text style={[styles.fullButtonText, !isValidUserId && styles.fullButtonTextDisabled]}>add friend</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default AddPartnerScreen;

