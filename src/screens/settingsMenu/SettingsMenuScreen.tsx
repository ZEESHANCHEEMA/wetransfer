import { useRouter } from 'expo-router';
import { Check, ChevronDown, ChevronRight, ChevronUp, Crown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { settingsMenuOptions } from '../../constants/settingsMenu';
import { colors } from '../../theme';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const SettingsMenuScreen = () => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <AppLayout title="settings" showBack onBack={() => router.push('/')}>
      <Pressable onPress={() => setShowMembershipModal(true)} style={styles.promoCard}>
        <Crown size={22} color={colors.white} strokeWidth={1.7} />
        <View style={styles.flexOne}>
          <Text style={styles.promoTitle}>manage membership</Text>
          <Text style={styles.promoSubtitle}>upgrade to pro for unlimited features</Text>
        </View>
        <ChevronRight size={16} color={colors.white} strokeWidth={1.8} />
      </Pressable>

      {settingsMenuOptions.map((option) => (
        <Pressable key={option.id} onPress={() => router.push(option.route as never)} style={styles.listCard}>
          <View style={styles.flexOne}>
            <Text style={styles.cardTitle}>{option.title}</Text>
            <Text style={styles.cardText}>{option.subtext}</Text>
          </View>
          <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
        </Pressable>
      ))}

      <Pressable onPress={() => setExpanded((value) => !value)} style={styles.listCard}>
        <View style={styles.flexOne}>
          <Text style={styles.cardTitle}>legal information</Text>
          <Text style={styles.cardText}>read our terms of use and privacy policy</Text>
        </View>
        {expanded ? <ChevronUp size={16} color={colors.textSoft} strokeWidth={1.8} /> : <ChevronDown size={16} color={colors.textSoft} strokeWidth={1.8} />}
      </Pressable>
      {expanded ? (
        <View style={styles.subList}>
          <Pressable onPress={() => router.push('/settings-menu/legal-terms')} style={styles.subListCard}>
            <Text style={styles.cardTitle}>terms of service</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/settings-menu/legal-privacy')} style={styles.subListCard}>
            <Text style={styles.cardTitle}>privacy policy</Text>
          </Pressable>
        </View>
      ) : null}

      <Modal visible={showMembershipModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.membershipModalCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>manage membership</Text>
              <Pressable onPress={() => setShowMembershipModal(false)}>
                <X size={18} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            </View>
            {(['free', 'pro'] as const).map((plan) => (
              <Pressable key={plan} onPress={() => setSelectedPlan(plan)} style={[styles.planCard, selectedPlan === plan && styles.planCardActive]}>
                <View style={[styles.radio, selectedPlan === plan && styles.radioActive]}>
                  {selectedPlan === plan ? <Check size={12} color={colors.white} strokeWidth={2} /> : null}
                </View>
                <View style={styles.flexOne}>
                  <Text style={styles.cardTitle}>{plan}</Text>
                  <Text style={styles.cardText}>{plan === 'free' ? 'basic features with limited functionality' : 'unlimited features and priority support'}</Text>
                  {plan === 'free' ? <Text style={styles.planPrice}>$0</Text> : null}
                </View>
              </Pressable>
            ))}
            {selectedPlan === 'pro' ? (
              <View style={styles.billingWrap}>
                <Text style={styles.billingLabel}>select billing period:</Text>
                <Pressable onPress={() => setBillingPeriod('monthly')} style={[styles.billingCard, billingPeriod === 'monthly' && styles.planCardActive]}>
                  <View style={[styles.radio, billingPeriod === 'monthly' && styles.radioActive]}>{billingPeriod === 'monthly' ? <View style={styles.radioDot} /> : null}</View>
                  <View style={styles.flexOne}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardTitle}>monthly</Text>
                      <Text style={styles.billingPrice}>$4.99/mo</Text>
                    </View>
                    <Text style={styles.cardText}>$59.88 per year</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => setBillingPeriod('yearly')} style={[styles.billingCard, billingPeriod === 'yearly' && styles.planCardActive]}>
                  <View style={[styles.radio, billingPeriod === 'yearly' && styles.radioActive]}>{billingPeriod === 'yearly' ? <View style={styles.radioDot} /> : null}</View>
                  <View style={styles.flexOne}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardTitle}>yearly</Text>
                      <Text style={styles.billingPrice}>$2.49/mo</Text>
                    </View>
                    <Text style={styles.cardText}>$29.88 per year</Text>
                  </View>
                </Pressable>
              </View>
            ) : null}
            <Pressable onPress={() => setShowMembershipModal(false)} style={styles.fullButton}>
              <Text style={styles.fullButtonText}>{selectedPlan === 'free' ? 'continue with free' : 'continue to purchase'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default SettingsMenuScreen;

