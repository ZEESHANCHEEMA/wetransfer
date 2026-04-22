import { useRouter } from 'expo-router';
import { CheckCircle2, Scan, Users, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, TextInput, View } from 'react-native';

import { choosePartnerContacts } from '../../constants/contacts';
import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const ChoosePartnerScreen = () => {
  const router = useRouter();
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [hasShared, setHasShared] = useState(false);
  const [showUserIdModal, setShowUserIdModal] = useState(false);
  const [userId, setUserId] = useState('');

  return (
    <AppLayout title="choose partner" showBack>
      <Text style={styles.sectionLabel}>from contacts</Text>
      {choosePartnerContacts.map((contact) => (
        <Pressable
          key={contact.id}
          onPress={() => setSelectedPartner(contact.id)}
          style={[styles.contactCard, selectedPartner === contact.id && styles.contactCardActive]}>
          <Image source={{ uri: contact.image }} style={styles.avatar} />
          <View style={styles.flexOne}>
            <Text style={[styles.contactName, selectedPartner === contact.id && styles.contactNameActive]}>{contact.name}</Text>
            <Text style={[styles.contactPhone, selectedPartner === contact.id && styles.contactPhoneActive]}>{contact.phone}</Text>
          </View>
          {selectedPartner === contact.id ? <CheckCircle2 size={18} color={colors.white} strokeWidth={1.8} /> : null}
        </Pressable>
      ))}

      <Card>
        <View style={styles.rowGap}>
          <Users size={22} color={colors.white} strokeWidth={1.7} style={styles.tintIcon} />
          <Text style={styles.cardTitle}>find more friends</Text>
        </View>
        <Text style={styles.cardText}>share your invite link with another accountability partner.</Text>
        <Button text={hasShared ? 'invitation sent' : 'share invite link'} onPress={() => setHasShared(true)} />
      </Card>

      <Card>
        <View style={styles.rowBetween}>
          <View style={styles.rowGap}>
            <Scan size={20} color={colors.primary} strokeWidth={1.7} />
            <Text style={styles.cardTitle}>add by user id</Text>
          </View>
          <Button text="enter" variant="secondary" onPress={() => setShowUserIdModal(true)} />
        </View>
      </Card>

      <Button text="continue" onPress={() => router.push('/choose-mode')} />

      <Modal visible={showUserIdModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>enter user id</Text>
              <Pressable onPress={() => setShowUserIdModal(false)}>
                <X size={18} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>
            <TextInput value={userId} onChangeText={setUserId} placeholder="ABCD1234" placeholderTextColor={colors.textSoft} style={styles.input} />
            <Button
              text="add friend"
              onPress={() => {
                setSelectedPartner(1);
                setShowUserIdModal(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default ChoosePartnerScreen;

