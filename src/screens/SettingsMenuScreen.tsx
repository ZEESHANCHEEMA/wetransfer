import { ArrowLeft, ChevronDown, ChevronRight, Check, Crown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsMenu'>;

const options = [
  { id: 'refer', title: 'refer a friend', subtext: 'invite friends to join and keep each other accountable' },
  { id: 'account', title: 'account', subtext: 'manage your personal details' },
  { id: 'feedback', title: 'feedback and feature request', subtext: 'report issues or ideas so we can keep improving' },
  { id: 'notifications', title: 'notifications', subtext: 'control reminders, alerts and push messages' },
  { id: 'token', title: 'emergency token', subtext: 'see how many emergency tokens you have left' },
  { id: 'faq', title: 'faq', subtext: 'browse helpful explanations, tips and troubleshooting' },
  { id: 'legal', title: 'legal information', subtext: 'read our terms of use, privacy policy and data practices', hasSubsections: true },
];

export function SettingsMenuScreen({ navigation }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showMembership, setShowMembership] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={22} color={colors.textMuted} strokeWidth={1.8} />
          </Pressable>
          <Text style={styles.title}>settings</Text>
        </View>

        <Pressable style={styles.membershipCard} onPress={() => setShowMembership(true)}>
          <Crown size={24} color="#fff" strokeWidth={1.8} />
          <View style={styles.grow}>
            <Text style={styles.membershipTitle}>manage membership</Text>
            <Text style={styles.membershipSubtitle}>upgrade to pro for unlimited features</Text>
          </View>
          <ChevronRight size={18} color="#fff" strokeWidth={1.8} />
        </Pressable>

        {options.map((option) => (
          <View key={option.id} style={styles.optionWrap}>
            <Pressable
              style={styles.option}
              onPress={() => setExpanded((current) => (current === option.id ? null : option.id))}>
              <View style={styles.grow}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtext}>{option.subtext}</Text>
              </View>
              {option.hasSubsections ? (
                <ChevronDown
                  size={18}
                  color={colors.textSoft}
                  style={expanded === option.id ? styles.rotated : undefined}
                  strokeWidth={1.8}
                />
              ) : (
                <ChevronRight size={18} color={colors.textSoft} strokeWidth={1.8} />
              )}
            </Pressable>

            {option.hasSubsections && expanded === option.id && (
              <View style={styles.subsections}>
                <Pressable style={styles.subsection}>
                  <Text style={styles.subsectionText}>terms of service</Text>
                  <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
                </Pressable>
                <Pressable style={styles.subsection}>
                  <Text style={styles.subsectionText}>privacy policy</Text>
                  <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal visible={showMembership} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>manage membership</Text>
              <Pressable onPress={() => setShowMembership(false)}>
                <X size={20} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>

            {(['free', 'pro'] as const).map((plan) => (
              <Pressable
                key={plan}
                onPress={() => setSelectedPlan(plan)}
                style={[styles.planCard, selectedPlan === plan && styles.planCardActive]}>
                <View style={[styles.radio, selectedPlan === plan && styles.radioActive]}>
                  {selectedPlan === plan && <Check size={12} color="#fff" strokeWidth={2.2} />}
                </View>
                <View style={styles.grow}>
                  <Text style={styles.planTitle}>{plan}</Text>
                  <Text style={styles.planSubtext}>
                    {plan === 'free' ? 'basic features with limited functionality' : 'unlimited features and priority support'}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 16, marginBottom: 20 },
  backBtn: { padding: 4 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'lowercase' },
  membershipCard: { backgroundColor: colors.primary, borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  grow: { flex: 1 },
  membershipTitle: { color: '#fff', fontSize: 16, fontWeight: '700', textTransform: 'lowercase' },
  membershipSubtitle: { color: 'rgba(255,255,255,0.88)', fontSize: 13, marginTop: 4, textTransform: 'lowercase' },
  optionWrap: { marginBottom: 8 },
  option: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionTitle: { color: colors.text, fontSize: 15, fontWeight: '700', textTransform: 'lowercase' },
  optionSubtext: { color: colors.textMuted, fontSize: 13, marginTop: 6, textTransform: 'lowercase' },
  rotated: { transform: [{ rotate: '180deg' }] },
  subsections: { marginTop: 8, marginLeft: 16, gap: 8 },
  subsection: { backgroundColor: '#f0ede8', borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center' },
  subsectionText: { flex: 1, color: colors.text, fontWeight: '600', textTransform: 'lowercase' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(61,57,53,0.4)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: colors.surface, borderRadius: 28, padding: 20, borderWidth: 1, borderColor: colors.border },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'lowercase' },
  planCard: { flexDirection: 'row', gap: 12, borderWidth: 2, borderColor: colors.border, borderRadius: 20, padding: 16, marginBottom: 12 },
  planCardActive: { borderColor: colors.primary, backgroundColor: '#f5ebe4' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.borderMuted, marginTop: 2, alignItems: 'center', justifyContent: 'center' },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  planTitle: { color: colors.text, fontSize: 17, fontWeight: '700', textTransform: 'lowercase' },
  planSubtext: { color: colors.textMuted, fontSize: 13, marginTop: 6, textTransform: 'lowercase' },
});
