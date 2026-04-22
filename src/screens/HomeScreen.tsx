import { ChevronRight, CheckCircle2, Clock3, Crown, Plus, Settings, XCircle, Zap } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Dock } from '../components/Dock';
import { incomingRequests, outgoingRequests, partners } from '../data/mockData';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const [message, setMessage] = React.useState('');

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>home</Text>
          <Pressable onPress={() => navigation.navigate('SettingsMenu')} style={styles.iconBtn}>
            <Settings size={20} color={colors.textMuted} strokeWidth={1.8} />
          </Pressable>
        </View>

        <Text style={styles.welcome}>welcome back, derya</Text>

        <Pressable style={styles.upgradeCard} onPress={() => navigation.navigate('SettingsMenu')}>
          <Crown size={24} color="#fff" strokeWidth={1.7} />
          <View style={styles.grow}>
            <Text style={styles.upgradeTitle}>upgrade to pro</Text>
            <Text style={styles.upgradeSubtitle}>unlimited features & priority support</Text>
          </View>
          <ChevronRight size={18} color="rgba(255,255,255,0.75)" />
        </Pressable>

        <View>
          <Text style={styles.sectionTitle}>accountability</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.partnerRow}>
            {partners.map((partner) => (
              <Pressable key={partner.id} style={styles.partnerItem} onPress={() => navigation.navigate('Friends')}>
                <Image source={{ uri: partner.image }} style={styles.avatarLg} />
                <Text style={styles.partnerName}>{partner.name}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.partnerItem} onPress={() => navigation.navigate('Friends')}>
              <View style={styles.addAvatar}>
                <Plus size={22} color={colors.textSoft} strokeWidth={1.8} />
              </View>
              <Text style={styles.partnerName}>add</Text>
            </Pressable>
          </ScrollView>
        </View>

        <View>
          <Text style={styles.sectionTitle}>incoming requests</Text>
          {incomingRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <Image source={{ uri: request.image }} style={styles.banner} />
              <View style={styles.cardBody}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{request.name}</Text>
                  <Clock3 size={16} color={colors.textSoft} strokeWidth={1.8} />
                </View>
                <Text style={styles.cardMeta}>{request.app} • {request.time}</Text>
                <Text style={styles.cardReason}>{request.reason}</Text>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="reply message"
                  placeholderTextColor={colors.textSoft}
                  style={styles.messageInput}
                />
                <View style={styles.actionRow}>
                  <Pressable style={styles.secondaryAction}>
                    <XCircle size={18} color={colors.danger} strokeWidth={1.8} />
                    <Text style={styles.secondaryActionText}>deny</Text>
                  </Pressable>
                  <Pressable style={styles.primaryAction}>
                    <CheckCircle2 size={18} color="#fff" strokeWidth={1.8} />
                    <Text style={styles.primaryActionText}>accept</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>outgoing requests</Text>
          {outgoingRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <Image source={{ uri: request.selfieImage }} style={styles.banner} />
              <View style={styles.cardBody}>
                <View style={styles.rowBetween}>
                  <Text style={styles.cardTitle}>{request.partner}</Text>
                  <Text style={[styles.status, request.status === 'accepted' && styles.statusAccepted]}>
                    {request.status}
                  </Text>
                </View>
                <Text style={styles.cardMeta}>{request.app} • {request.time}</Text>
                <Text style={styles.cardReason}>{request.reason}</Text>
                <View style={styles.actionRow}>
                  <Pressable style={styles.secondaryAction}>
                    <Zap size={18} color={colors.primary} strokeWidth={1.8} />
                    <Text style={styles.secondaryActionText}>token</Text>
                  </Pressable>
                  <Pressable style={styles.primaryAction}>
                    <CheckCircle2 size={18} color="#fff" strokeWidth={1.8} />
                    <Text style={styles.primaryActionText}>collect</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Dock />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 120, gap: 24 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
  },
  headerTitle: { color: colors.text, fontSize: 18, fontWeight: '700', textTransform: 'lowercase' },
  iconBtn: { padding: 8, borderRadius: 999 },
  welcome: { fontSize: 30, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  upgradeCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  grow: { flex: 1 },
  upgradeTitle: { color: '#fff', fontSize: 16, fontWeight: '700', textTransform: 'lowercase' },
  upgradeSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4, textTransform: 'lowercase' },
  sectionTitle: { color: colors.textMuted, fontSize: 15, fontWeight: '700', textTransform: 'lowercase', marginBottom: 12 },
  partnerRow: { gap: 16, paddingRight: 12 },
  partnerItem: { alignItems: 'center', width: 74 },
  avatarLg: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  addAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderMuted,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebe8e3',
    marginBottom: 8,
  },
  partnerName: { color: colors.textMuted, fontSize: 13, textTransform: 'lowercase' },
  requestCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 14,
  },
  banner: { width: '100%', height: 120 },
  cardBody: { padding: 14, gap: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', textTransform: 'lowercase' },
  cardMeta: { color: colors.textMuted, fontSize: 13, textTransform: 'lowercase' },
  cardReason: { color: colors.text, fontSize: 14, textTransform: 'lowercase' },
  messageInput: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
  },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  secondaryAction: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  secondaryActionText: { color: colors.text, fontWeight: '700', textTransform: 'lowercase' },
  primaryActionText: { color: '#fff', fontWeight: '700', textTransform: 'lowercase' },
  status: { color: colors.textSoft, fontSize: 12, fontWeight: '700', textTransform: 'lowercase' },
  statusAccepted: { color: colors.success },
});
