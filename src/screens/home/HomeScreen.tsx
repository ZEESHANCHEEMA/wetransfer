import { useRouter } from 'expo-router';
import { ChevronRight, Crown, Plus, Settings } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { incomingRequests, outgoingRequests, partners } from '../../data/mockData';
import { alpha, colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const HomeScreen = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <AppLayout
      title="home"
      withDock
      right={
        <Pressable onPress={() => router.push('/settings-menu')} style={styles.iconButton}>
          <Settings size={20} color={colors.textMuted} strokeWidth={1.8} />
        </Pressable>
      }>
      <Text style={styles.heroTitleSmall}>welcome back, derya</Text>
      <Pressable onPress={() => router.push('/settings-menu')} style={styles.promoCard}>
        <Crown size={22} color={colors.white} strokeWidth={1.7} />
        <View style={styles.flexOne}>
          <Text style={styles.promoTitle}>upgrade to pro</Text>
          <Text style={styles.promoSubtitle}>unlimited features & priority support</Text>
        </View>
        <ChevronRight size={16} color={alpha.onPrimaryMuted} strokeWidth={1.8} />
      </Pressable>

      <Text style={styles.sectionLabel}>accountability</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {partners.map((partner) => (
          <Pressable
            key={partner.id}
            onPress={() => router.push({ pathname: '/friends/[friendId]', params: { friendId: String(partner.id) } })}
            style={styles.partnerItem}>
            <Image source={{ uri: partner.image }} style={styles.avatarLarge} />
            <Text style={styles.partnerText}>{partner.name}</Text>
          </Pressable>
        ))}
        <Pressable onPress={() => router.push('/add-partner')} style={styles.partnerItem}>
          <View style={styles.addBubble}>
            <Plus size={20} color={colors.textSoft} strokeWidth={1.8} />
          </View>
          <Text style={styles.partnerText}>add</Text>
        </Pressable>
      </ScrollView>

      <Text style={styles.sectionLabel}>incoming requests</Text>
      {incomingRequests.map((request) => (
        <Card key={request.id}>
          <Image source={{ uri: request.image }} style={styles.requestImage} />
          <Text style={styles.cardTitle}>{request.name}</Text>
          <Text style={styles.cardText}>
            {request.app} • {request.time}
          </Text>
          <Text style={styles.cardText}>{request.reason}</Text>
          <TextInput value={message} onChangeText={setMessage} placeholder="reply message" placeholderTextColor={colors.textSoft} style={styles.input} />
          <View style={styles.actionRow}>
            <Button text="deny" variant="secondary" />
            <Button text="accept" />
          </View>
        </Card>
      ))}

      <Text style={styles.sectionLabel}>outgoing requests</Text>
      {outgoingRequests.map((request) => (
        <Card key={request.id}>
          <Image source={{ uri: request.selfieImage }} style={styles.requestImage} />
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{request.partner}</Text>
            <Text style={[styles.badgeTextPlain, request.status === 'accepted' && styles.accepted]}>{request.status}</Text>
          </View>
          <Text style={styles.cardText}>
            {request.app} • {request.time}
          </Text>
          <Text style={styles.cardText}>{request.reason}</Text>
          <View style={styles.actionRow}>
            <Button text="token" variant="secondary" />
            <Button text="collect" />
          </View>
        </Card>
      ))}
    </AppLayout>
  );
};

export default HomeScreen;

