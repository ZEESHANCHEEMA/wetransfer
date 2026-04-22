import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock3,
  Crown,
  Image as ImageIcon,
  Info,
  Mail,
  Moon,
  Plus,
  QrCode,
  Scan,
  Search,
  Settings,
  Share2,
  Users,
  X,
  XCircle,
  Zap,
} from 'lucide-react-native';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '../theme';
import { controlledApps, friends, incomingRequests, limitedApps, outgoingRequests, partners } from '../data/mockData';

type LayoutProps = {
  title?: string;
  children: ReactNode;
  scroll?: boolean;
  withDock?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
};

const faqItems = [
  {
    id: 1,
    category: 'getting started',
    question: 'how do I set up my first app limit?',
    answer:
      'go to the limits tab, tap "select apps", choose the apps you want to limit, set your desired time limits, and select an accountability partner who will approve extension requests.',
  },
  {
    id: 2,
    category: 'getting started',
    question: 'what is an accountability partner?',
    answer:
      'an accountability partner is a friend who helps you stick to your screen time goals. they can approve or deny your requests for additional time when you reach your daily limit.',
  },
  {
    id: 3,
    category: 'limits & time',
    question: 'can I set different limits for different days?',
    answer:
      'yes! when setting up an app limit, toggle off "same limit for all days" to customize time limits for each day of the week.',
  },
  {
    id: 4,
    category: 'limits & time',
    question: 'what happens when I run out of time?',
    answer:
      'when your daily limit is reached, the app will be blocked. you can request additional time from your accountability partner, who will receive a notification to approve or deny your request.',
  },
  {
    id: 5,
    category: 'requests & tokens',
    question: 'how do extension requests work?',
    answer:
      "when you need more time, tap the app and send a request to your accountability partner with a reason. they'll receive a notification and can approve or deny it through the chat.",
  },
  {
    id: 6,
    category: 'requests & tokens',
    question: 'what are emergency tokens?',
    answer:
      'emergency tokens allow you to instantly grant yourself additional time without waiting for approval. use them wisely as they are limited and meant for genuine emergencies only.',
  },
  {
    id: 7,
    category: 'downtime & quiet hours',
    question: 'can I allow certain apps during downtime?',
    answer:
      'yes! when setting up downtime, choose "allow" mode and select which apps should remain accessible during your quiet hours.',
  },
  {
    id: 8,
    category: 'downtime & quiet hours',
    question: 'how does downtime work?',
    answer:
      'downtime blocks apps during specific hours (like bedtime) regardless of your remaining daily limit. you can set different downtime schedules for each day.',
  },
  {
    id: 9,
    category: 'account & settings',
    question: 'how do I change my accountability partner?',
    answer:
      'go to settings > choose mode, where you can modify your accountability partners for each app or change your overall accountability settings.',
  },
  {
    id: 10,
    category: 'account & settings',
    question: 'can I temporarily pause all limits?',
    answer:
      'you can request approval from your accountability partner to modify or pause limits. this ensures you stay accountable to your goals while maintaining flexibility when needed.',
  },
];

const notificationOptions = [
  { id: 'extension', title: 'extension requests', description: 'requests, approvals, and denials for extra time' },
  { id: 'warning', title: '5 minute warning', description: 'when you have five minutes left on an app' },
  { id: 'message', title: 'messages', description: 'when you receive a new chat message' },
  { id: 'friend', title: 'friend requests', description: 'when someone wants to be your accountability partner' },
];

const settingsOptions = [
  { id: 'refer-friend', title: 'refer a friend', route: '/settings-menu/refer-friend', subtext: 'invite friends to join and keep each other accountable' },
  { id: 'account', title: 'account', route: '/settings-menu/account', subtext: 'manage your personal details' },
  { id: 'feedback', title: 'feedback and feature request', route: '/settings-menu/feedback', subtext: 'report issues or ideas so we can keep improving' },
  { id: 'notifications', title: 'notifications', route: '/settings-menu/notifications', subtext: 'control reminders, alerts and push messages' },
  { id: 'token-request', title: 'emergency token', route: '/settings-menu/token-request', subtext: 'see how many emergency tokens you have left' },
  { id: 'faq', title: 'faq', route: '/settings-menu/faq', subtext: 'browse helpful explanations, tips and troubleshooting' },
];

const choosePartnerContacts = [
  {
    id: 1,
    name: 'Sarah Ay',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Jan Lasetzke',
    phone: '+1 (555) 234-5678',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

const appPickerApps = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'spotify', name: 'Spotify' },
];

function AppLayout({ title, children, scroll = true, withDock = false, showBack = false, onBack, right }: LayoutProps) {
  const router = useRouter();
  const content = scroll ? <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView> : <View style={styles.body}>{children}</View>;

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />
      {(title || showBack || right) && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showBack ? (
              <Pressable onPress={onBack ?? (() => router.back())} style={styles.iconButton}>
                <ArrowLeft size={22} color={colors.textMuted} strokeWidth={1.8} />
              </Pressable>
            ) : null}
            {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
          </View>
          {right}
        </View>
      )}
      {content}
      {withDock ? <Dock /> : null}
    </SafeAreaView>
  );
}

function Dock() {
  const router = useRouter();
  const tabs = [
    { label: 'home', href: '/' },
    { label: 'limits', href: '/settings' },
    { label: 'chat', href: '/friends' },
    { label: 'usage', href: '/usage' },
  ];

  return (
    <View style={styles.dockWrap}>
      <View style={styles.dock}>
        {tabs.map((tab) => (
          <Pressable key={tab.href} onPress={() => router.push(tab.href as never)} style={styles.dockItem}>
            <Text style={styles.dockText}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

function Button({ text, onPress, variant = 'primary' }: { text: string; onPress?: () => void; variant?: 'primary' | 'secondary' }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === 'secondary' && styles.buttonSecondary]}>
      <Text style={[styles.buttonText, variant === 'secondary' && styles.buttonTextSecondary]}>{text}</Text>
    </Pressable>
  );
}

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <Text style={styles.heroTitle}>welcome back</Text>
        <Text style={styles.heroSubtitle}>log in to manage your screen time</Text>
        <View style={styles.form}>
          <TextInput value={email} onChangeText={setEmail} placeholder="email" placeholderTextColor={colors.textSoft} style={styles.input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
          <Button text="log in" onPress={() => router.replace('/')} />
        </View>
        <Text style={styles.inlineText}>
          don&apos;t have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/register')}>
            sign up
          </Text>
        </Text>
      </View>
    </AppLayout>
  );
}

export function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <Text style={styles.heroTitle}>create account</Text>
        <Text style={styles.heroSubtitle}>join us to build better habits</Text>
        <View style={styles.form}>
          <TextInput value={email} onChangeText={setEmail} placeholder="email address" placeholderTextColor={colors.textSoft} style={styles.input} />
          <Button text="continue" onPress={() => router.push('/verify-email')} />
        </View>
        <Text style={styles.inlineText}>
          already have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/login')}>
            log in
          </Text>
        </Text>
      </View>
    </AppLayout>
  );
}

export function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = useRef<Array<TextInput | null>>([]);

  const setDigit = (index: number, value: string) => {
    const next = [...code];
    next[index] = value.slice(0, 1);
    setCode(next);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  return (
    <AppLayout scroll={false}>
      <View style={styles.centeredPage}>
        <View style={styles.mailIcon}>
          <Mail size={36} color="#fff" strokeWidth={1.7} />
        </View>
        <Text style={styles.heroTitle}>check your email</Text>
        <Text style={styles.heroSubtitle}>we sent a verification code to your email</Text>
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              value={digit}
              onChangeText={(value) => setDigit(index, value)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.codeInput}
            />
          ))}
        </View>
        <Button text="continue" onPress={() => router.push('/onboarding')} />
      </View>
    </AppLayout>
  );
}

export function OnboardingScreen() {
  const router = useRouter();
  const features = [
    'accountability makes it easy',
    'you set your own limits',
    'need more time? ask your partner',
  ];

  return (
    <AppLayout title="how it works" showBack>
      {features.map((feature) => (
        <Card key={feature}>
          <Text style={styles.cardTitle}>{feature}</Text>
        </Card>
      ))}
      <Button text="continue" onPress={() => router.push('/choose-partner')} />
    </AppLayout>
  );
}

export function ChoosePartnerScreen() {
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
          {selectedPartner === contact.id ? <CheckCircle2 size={18} color="#fff" strokeWidth={1.8} /> : null}
        </Pressable>
      ))}

      <Card>
        <View style={styles.rowGap}>
          <Users size={22} color="#fff" strokeWidth={1.7} style={styles.tintIcon} />
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
}

export function ChooseModeScreen() {
  const router = useRouter();
  const modes = ['easy-peasy', 'easy', 'medium', 'hard', 'hardcore'];
  const [selectedMode, setSelectedMode] = useState(2);

  return (
    <AppLayout title="choose strictness" showBack>
      <Card>
        <View style={styles.rowGap}>
          <Info size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardText}>how strict do you want your accountability to be?</Text>
        </View>
      </Card>
      {modes.map((mode, index) => (
        <Pressable key={mode} onPress={() => setSelectedMode(index)} style={[styles.optionRow, selectedMode === index && styles.optionRowActive]}>
          <Text style={styles.optionRowText}>{mode}</Text>
        </Pressable>
      ))}
      <Button text="continue" onPress={() => router.push('/app-picker')} />
    </AppLayout>
  );
}

export function AppPickerScreen() {
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
}

export function QuietHoursScreen() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<'block' | 'allow'>('block');

  return (
    <AppLayout title="quiet hours" showBack>
      <Card>
        <View style={styles.rowBetween}>
          <View style={styles.rowGap}>
            <Moon size={20} color={colors.primary} strokeWidth={1.8} />
            <Text style={styles.cardTitle}>enable quiet hours</Text>
          </View>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>
      </Card>
      {enabled ? (
        <>
          <Card>
            <Text style={styles.cardTitle}>10:00 pm - 8:00 am</Text>
            <Text style={styles.cardText}>block apps during specific times</Text>
          </Card>
          <View style={styles.segmented}>
            <Pressable onPress={() => setMode('block')} style={[styles.segment, mode === 'block' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'block' && styles.segmentTextActive]}>block apps</Text>
            </Pressable>
            <Pressable onPress={() => setMode('allow')} style={[styles.segment, mode === 'allow' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'allow' && styles.segmentTextActive]}>allow apps</Text>
            </Pressable>
          </View>
        </>
      ) : null}
      <Button text="continue" onPress={() => router.push('/')} />
    </AppLayout>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <AppLayout title="home" withDock right={<Pressable onPress={() => router.push('/settings-menu')} style={styles.iconButton}><Settings size={20} color={colors.textMuted} strokeWidth={1.8} /></Pressable>}>
      <Text style={styles.heroTitleSmall}>welcome back, derya</Text>
      <Pressable onPress={() => router.push('/settings-menu')} style={styles.promoCard}>
        <Crown size={22} color="#fff" strokeWidth={1.7} />
        <View style={styles.flexOne}>
          <Text style={styles.promoTitle}>upgrade to pro</Text>
          <Text style={styles.promoSubtitle}>unlimited features & priority support</Text>
        </View>
        <ChevronRight size={16} color="rgba(255,255,255,0.7)" strokeWidth={1.8} />
      </Pressable>

      <Text style={styles.sectionLabel}>accountability</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {partners.map((partner) => (
          <Pressable key={partner.id} onPress={() => router.push({ pathname: '/friends/[friendId]', params: { friendId: String(partner.id) } })} style={styles.partnerItem}>
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
          <Text style={styles.cardText}>{request.app} • {request.time}</Text>
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
          <Text style={styles.cardText}>{request.app} • {request.time}</Text>
          <Text style={styles.cardText}>{request.reason}</Text>
          <View style={styles.actionRow}>
            <Button text="token" variant="secondary" />
            <Button text="collect" />
          </View>
        </Card>
      ))}
    </AppLayout>
  );
}

export function FriendsScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const filteredFriends = useMemo(() => friends.filter((friend) => friend.name.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <AppLayout
      title="chat"
      withDock
      right={
        <Pressable onPress={() => router.push('/add-partner')} style={styles.headerMiniButton}>
          <Plus size={14} color={colors.textMuted} strokeWidth={1.8} />
          <Text style={styles.headerMiniButtonText}>add partner</Text>
        </Pressable>
      }>
      {filteredFriends.map((friend) => (
        <Pressable key={friend.id} onPress={() => router.push({ pathname: '/friends/[friendId]', params: { friendId: String(friend.id) } })} style={styles.friendListRow}>
          <View style={styles.friendAvatarWrap}>
            <Image source={{ uri: friend.image }} style={styles.avatar} />
            {friend.activeRequests > 0 ? <View style={styles.friendBadge}><Text style={styles.badgeText}>{friend.activeRequests}</Text></View> : null}
          </View>
          <Text style={styles.friendListName}>{friend.name}</Text>
        </Pressable>
      ))}
    </AppLayout>
  );
}

export function FriendDetailScreen() {
  const router = useRouter();
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const friend = friends.find((entry) => String(entry.id) === friendId) ?? friends[0];
  const requests = [
    { id: 1, app: 'Instagram', reason: 'need to post a story', status: 'approved' },
    { id: 2, app: 'YouTube', reason: 'watching a tutorial', status: 'pending' },
  ];

  return (
    <AppLayout title={friend.name} showBack>
      {requests.map((request) => (
        <Card key={request.id}>
          <Text style={styles.cardTitle}>{request.app}</Text>
          <Text style={styles.cardText}>{request.reason}</Text>
          <View style={styles.actionRow}>
            <Button text="deny" variant="secondary" />
            <Button text={request.status === 'approved' ? 'approved' : 'approve'} />
          </View>
        </Card>
      ))}
    </AppLayout>
  );
}

export function AddPartnerScreen() {
  const router = useRouter();
  const [showUserIdModal, setShowUserIdModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [added, setAdded] = useState<number[]>([]);
  const isValidUserId = userId.length === 9 && userId.includes('-');

  const handleUserIdChange = (value: string) => {
    let next = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (next.length > 4) {
      next = `${next.slice(0, 4)}-${next.slice(4, 8)}`;
    }
    setUserId(next);
  };

  return (
    <AppLayout title="add partner" showBack>
      <Text style={styles.sectionLabel}>add by user id</Text>
      <View style={styles.largeRowCard}>
        <View style={styles.scanBubble}>
          <Scan size={22} color="#fff" strokeWidth={1.8} />
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
              <Text style={[styles.addPillText, added.includes(contact.id) && styles.addPillTextDisabled]}>
                {added.includes(contact.id) ? 'added' : 'add'}
              </Text>
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
}

export function SettingsMenuScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <AppLayout title="settings" showBack onBack={() => router.push('/')}>
      <Pressable onPress={() => setShowMembershipModal(true)} style={styles.promoCard}>
        <Crown size={22} color="#fff" strokeWidth={1.7} />
        <View style={styles.flexOne}>
          <Text style={styles.promoTitle}>manage membership</Text>
          <Text style={styles.promoSubtitle}>upgrade to pro for unlimited features</Text>
        </View>
        <ChevronRight size={16} color="#fff" strokeWidth={1.8} />
      </Pressable>

      {settingsOptions.map((option) => (
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
                  {selectedPlan === plan ? <Check size={12} color="#fff" strokeWidth={2} /> : null}
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
                  <View style={[styles.radio, billingPeriod === 'monthly' && styles.radioActive]}>
                    {billingPeriod === 'monthly' ? <View style={styles.radioDot} /> : null}
                  </View>
                  <View style={styles.flexOne}>
                    <View style={styles.rowBetween}>
                      <Text style={styles.cardTitle}>monthly</Text>
                      <Text style={styles.billingPrice}>$4.99/mo</Text>
                    </View>
                    <Text style={styles.cardText}>$59.88 per year</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => setBillingPeriod('yearly')} style={[styles.billingCard, billingPeriod === 'yearly' && styles.planCardActive]}>
                  <View style={[styles.radio, billingPeriod === 'yearly' && styles.radioActive]}>
                    {billingPeriod === 'yearly' ? <View style={styles.radioDot} /> : null}
                  </View>
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
}

export function SettingsAccountScreen() {
  const [firstName, setFirstName] = useState('Olivia');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('olivia.smith@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <AppLayout title="account" showBack>
      <Card>
        <Text style={styles.cardTitle}>personal details</Text>
        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />
        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />
        <TextInput value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
        <Button text="save changes" />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>security</Text>
        <TextInput value={currentPassword} onChangeText={setCurrentPassword} placeholder="current password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
        <TextInput value={newPassword} onChangeText={setNewPassword} placeholder="new password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
        <Button text="save password" />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>delete account</Text>
        <Button text="delete account" variant="secondary" />
      </Card>
    </AppLayout>
  );
}

export function SettingsNotificationsScreen() {
  const [values, setValues] = useState<Record<string, boolean>>({
    extension: true,
    warning: true,
    message: true,
    friend: true,
  });

  return (
    <AppLayout title="notifications" showBack>
      {notificationOptions.map((notification) => (
        <Card key={notification.id}>
          <View style={styles.rowBetween}>
            <View style={styles.flexOne}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardText}>{notification.description}</Text>
            </View>
            <Switch value={values[notification.id]} onValueChange={(value) => setValues((current) => ({ ...current, [notification.id]: value }))} />
          </View>
        </Card>
      ))}
    </AppLayout>
  );
}

export function SettingsTokenRequestScreen() {
  return (
    <AppLayout title="emergency token" showBack>
      <Card>
        <View style={styles.centerBlock}>
          <View style={styles.tokenCircle}>
            <Zap size={44} color="#fff" strokeWidth={1.7} />
          </View>
          <Text style={styles.bigNumber}>3</Text>
          <Text style={styles.cardText}>tokens remaining</Text>
        </View>
      </Card>
    </AppLayout>
  );
}

export function SettingsReferFriendScreen() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [invited, setInvited] = useState<number[]>([]);

  return (
    <AppLayout title="refer a friend" showBack>
      {choosePartnerContacts.map((contact) => (
        <Card key={contact.id}>
          <View style={styles.rowBetween}>
            <View style={styles.contactRow}>
              <Image source={{ uri: contact.image }} style={styles.avatar} />
              <View>
                <Text style={styles.cardTitle}>{contact.name}</Text>
                <Text style={styles.cardText}>{contact.phone}</Text>
              </View>
            </View>
            <Button text={invited.includes(contact.id) ? 'invited' : 'invite'} variant={invited.includes(contact.id) ? 'secondary' : 'primary'} onPress={() => setInvited((current) => [...current, contact.id])} />
          </View>
        </Card>
      ))}
      <Card>
        <View style={styles.rowGap}>
          <Share2 size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>share invite link</Text>
        </View>
        <Button text="share link" />
      </Card>
      <Card>
        <View style={styles.rowGap}>
          <QrCode size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>scan QR code</Text>
        </View>
        <Button text={showQRCode ? 'qr visible' : 'show my QR code'} variant="secondary" onPress={() => setShowQRCode((value) => !value)} />
        {showQRCode ? <View style={styles.qrPlaceholder}><Text style={styles.cardText}>QR preview</Text></View> : null}
      </Card>
    </AppLayout>
  );
}

export function SettingsFeedbackScreen() {
  const [category, setCategory] = useState<'feature' | 'bug'>('feature');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <AppLayout scroll={false}>
        <View style={styles.centeredPage}>
          <CheckCircle2 size={40} color={colors.success} strokeWidth={1.8} />
          <Text style={styles.heroTitle}>thank you</Text>
          <Text style={styles.heroSubtitle}>your feedback was submitted</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="feedback" showBack>
      <Card>
        <Text style={styles.cardTitle}>category</Text>
        <View style={styles.segmented}>
          <Pressable onPress={() => setCategory('feature')} style={[styles.segment, category === 'feature' && styles.segmentActive]}>
            <Text style={[styles.segmentText, category === 'feature' && styles.segmentTextActive]}>feature request</Text>
          </Pressable>
          <Pressable onPress={() => setCategory('bug')} style={[styles.segment, category === 'bug' && styles.segmentActive]}>
            <Text style={[styles.segmentText, category === 'bug' && styles.segmentTextActive]}>report a bug</Text>
          </Pressable>
        </View>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="describe your idea or issue"
          placeholderTextColor={colors.textSoft}
          style={[styles.input, styles.textArea]}
        />
      </Card>
      <Card>
        <View style={styles.rowGap}>
          <ImageIcon size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>add images</Text>
        </View>
        <Button text="choose images" variant="secondary" />
      </Card>
      <Button text={category === 'bug' ? 'report bug' : 'submit feedback'} onPress={() => setSubmitted(true)} />
    </AppLayout>
  );
}

export function SettingsFAQScreen() {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const filtered = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase()) ||
      faq.category.toLowerCase().includes(query.toLowerCase())
  );
  const categories = Array.from(new Set(faqItems.map((faq) => faq.category)));

  return (
    <AppLayout title="frequently asked questions" showBack>
      <View style={styles.searchWrap}>
        <Search size={18} color={colors.textSoft} strokeWidth={1.8} />
        <TextInput value={query} onChangeText={setQuery} placeholder="search for help..." placeholderTextColor={colors.textSoft} style={styles.searchInput} />
      </View>
      {categories.map((category) => {
        const categoryFaqs = filtered.filter((faq) => faq.category === category);
        if (categoryFaqs.length === 0) return null;
        return (
          <View key={category} style={styles.faqSection}>
            <Text style={styles.faqCategory}>{category}</Text>
            {categoryFaqs.map((faq) => (
              <View key={faq.id} style={styles.faqCard}>
                <Pressable onPress={() => setExpandedId((current) => (current === faq.id ? null : faq.id))} style={styles.rowBetween}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {expandedId === faq.id ? <ChevronUp size={16} color={colors.textSoft} strokeWidth={1.8} /> : <ChevronDown size={16} color={colors.textSoft} strokeWidth={1.8} />}
                </Pressable>
                {expandedId === faq.id ? <Text style={styles.faqAnswer}>{faq.answer}</Text> : null}
              </View>
            ))}
          </View>
        );
      })}
      {filtered.length === 0 ? (
        <View style={styles.faqEmpty}>
          <Text style={styles.cardText}>no questions found</Text>
          <Text style={styles.faqEmptySub}>try a different search term</Text>
        </View>
      ) : null}
    </AppLayout>
  );
}

export function SettingsLegalScreen() {
  return (
    <AppLayout title="legal information" showBack>
      <Card>
        <Text style={styles.cardText}>coming soon</Text>
      </Card>
    </AppLayout>
  );
}

function LegalContentScreen({ title, sections }: { title: string; sections: string[] }) {
  return (
    <AppLayout title={title} showBack>
      {sections.map((section) => (
        <Card key={section}>
          <Text style={styles.cardTitle}>{section}</Text>
          <Text style={styles.cardText}>placeholder legal copy for the mobile version.</Text>
        </Card>
      ))}
    </AppLayout>
  );
}

export function SettingsLegalTermsScreen() {
  return <LegalContentScreen title="terms of service" sections={['acceptance of terms', 'services and content', 'user responsibilities', 'contact information']} />;
}

export function SettingsLegalPrivacyScreen() {
  return <LegalContentScreen title="privacy policy" sections={['information we collect', 'how we use your information', 'data security', 'your rights']} />;
}

export function SettingsScreen() {
  const router = useRouter();
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  return (
    <AppLayout title="todays limit" withDock right={
      <View style={styles.topActions}>
        <Button text="select apps" variant="secondary" onPress={() => router.push('/app-picker')} />
        <Button text={bulkEditMode ? 'done' : 'multiple'} variant="secondary" onPress={() => setBulkEditMode((value) => !value)} />
      </View>
    }>
      {bulkEditMode ? (
        <Card>
          <Pressable onPress={() => setSelectedApps(selectedApps.length === controlledApps.length ? [] : controlledApps.map((app) => app.id))} style={styles.rowGap}>
            <View style={[styles.radio, selectedApps.length === controlledApps.length && styles.radioActive]}>
              {selectedApps.length === controlledApps.length ? <Check size={12} color="#fff" strokeWidth={2} /> : null}
            </View>
            <Text style={styles.cardTitle}>select all apps</Text>
          </Pressable>
        </Card>
      ) : null}
      {controlledApps.map((app) => (
        <Pressable
          key={app.id}
          onPress={() => {
            if (bulkEditMode) {
              setSelectedApps((current) => (current.includes(app.id) ? current.filter((id) => id !== app.id) : [...current, app.id]));
            } else {
              router.push({ pathname: '/settings/[appId]', params: { appId: app.id } });
            }
          }}
          style={styles.listCard}>
          <View style={styles.rowGap}>
            {bulkEditMode ? (
              <View style={[styles.radio, selectedApps.includes(app.id) && styles.radioActive]}>
                {selectedApps.includes(app.id) ? <Check size={12} color="#fff" strokeWidth={2} /> : null}
              </View>
            ) : null}
            <View>
              <Text style={styles.cardTitle}>{app.name}</Text>
              <Text style={styles.cardText}>{app.limit} daily</Text>
            </View>
          </View>
          <ChevronRight size={16} color={colors.textSoft} strokeWidth={1.8} />
        </Pressable>
      ))}
      {bulkEditMode && selectedApps.length > 0 ? <Button text="bulk edit selected apps" onPress={() => router.push('/settings/bulk')} /> : null}
    </AppLayout>
  );
}

export function AppDetailScreen() {
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
          return <Text key={id} style={styles.cardText}>{partner?.name ?? 'partner'}</Text>;
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
              <Pressable key={friend.id} onPress={() => setSelectedPartners((current) => Array.from(new Set([...current, friend.id])))} style={styles.listCard}>
                <Text style={styles.cardTitle}>{friend.name}</Text>
                {selectedPartners.includes(friend.id) ? <Check size={16} color={colors.primary} strokeWidth={2} /> : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
}

export function BulkEditAppDetailScreen() {
  return (
    <AppLayout title="bulk edit apps" showBack>
      <Card>
        <Text style={styles.cardTitle}>selected apps</Text>
        <Text style={styles.cardText}>instagram, tiktok, youtube</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>time limit</Text>
        <Text style={styles.cardText}>1h 30m for all selected apps</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>downtime</Text>
        <Text style={styles.cardText}>10:00 pm - 8:00 am for all selected apps</Text>
      </Card>
      <Button text="save bulk changes" />
    </AppLayout>
  );
}

export function UsageScreen() {
  return (
    <AppLayout title="progress" withDock>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardText}>without accountability</Text>
          <Text style={styles.cardText}>with accountability</Text>
        </View>
      </Card>
      {limitedApps.map((app) => (
        <Card key={app.id}>
          <Text style={styles.cardTitle}>{app.name}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.bigStat}>{formatMinutes(app.beforeAppMinutes)}</Text>
            <Text style={styles.bigStat}>{formatMinutes(app.todayMinutes)}</Text>
          </View>
        </Card>
      ))}
    </AppLayout>
  );
}

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  iconButton: { padding: 6, borderRadius: 999 },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120, gap: 14 },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  centeredPage: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, gap: 18 },
  heroTitle: { fontSize: 34, fontWeight: '700', color: colors.text, textAlign: 'center', textTransform: 'lowercase' },
  heroTitleSmall: { fontSize: 28, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  heroSubtitle: { fontSize: 16, color: colors.textMuted, textAlign: 'center', textTransform: 'lowercase' },
  form: { gap: 12 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: colors.text,
    marginTop: 10,
  },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 96,
    marginTop: 10,
  },
  buttonSecondary: { backgroundColor: colors.surfaceAlt },
  buttonText: { color: '#fff', fontWeight: '700', textTransform: 'lowercase' },
  buttonTextSecondary: { color: colors.text },
  inlineText: { color: colors.textMuted, textAlign: 'center', textTransform: 'lowercase' },
  linkText: { color: colors.primary, fontWeight: '700' },
  mailIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  codeRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  codeInput: { width: 46, height: 58, borderRadius: 14, borderWidth: 2, borderColor: colors.border, backgroundColor: '#fff', textAlign: 'center', fontSize: 22, color: colors.text },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 16, gap: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  cardText: { fontSize: 13, color: colors.textMuted, textTransform: 'lowercase', lineHeight: 18 },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: colors.textMuted, textTransform: 'lowercase', marginBottom: 2 },
  rowGap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  tintIcon: { backgroundColor: colors.primary, padding: 10, borderRadius: 12, overflow: 'hidden' },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.surfaceAlt, borderRadius: 20 },
  contactCardActive: { backgroundColor: colors.primary },
  contactName: { fontSize: 15, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  contactPhone: { fontSize: 12, color: colors.textMuted },
  contactNameActive: { color: '#fff' },
  contactPhoneActive: { color: 'rgba(255,255,255,0.8)' },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  flexOne: { flex: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(61,57,53,0.4)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: colors.surface, borderRadius: 28, padding: 18, gap: 10 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: colors.text, textTransform: 'lowercase' },
  optionRow: { padding: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 20 },
  optionRowActive: { borderColor: colors.primary, backgroundColor: '#f5ebe4' },
  optionRowText: { color: colors.text, fontWeight: '700', textTransform: 'lowercase' },
  selectAppsCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: colors.surface, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.borderMuted, borderRadius: 22 },
  listCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, marginTop: 2 },
  segmented: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: 999, padding: 4, gap: 4 },
  segment: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: 'center' },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { color: colors.textMuted, fontWeight: '700', textTransform: 'lowercase' },
  segmentTextActive: { color: '#fff' },
  promoCard: { backgroundColor: colors.primary, borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  promoTitle: { color: '#fff', fontWeight: '700', textTransform: 'lowercase' },
  promoSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 12, textTransform: 'lowercase' },
  horizontalList: { gap: 16, paddingRight: 16 },
  partnerItem: { alignItems: 'center', width: 74 },
  avatarLarge: { width: 64, height: 64, borderRadius: 32 },
  partnerText: { marginTop: 8, color: colors.textMuted, fontSize: 12, textTransform: 'lowercase' },
  addBubble: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.borderMuted, alignItems: 'center', justifyContent: 'center' },
  requestImage: { width: '100%', height: 120, borderRadius: 14, marginBottom: 8 },
  actionRow: { flexDirection: 'row', gap: 10 },
  friendRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderRadius: 22, padding: 14 },
  badge: { minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  badgeTextPlain: { fontSize: 12, fontWeight: '700', color: colors.textSoft, textTransform: 'lowercase' },
  accepted: { color: colors.success },
  subList: { paddingLeft: 14, gap: 8 },
  subListCard: { backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 14 },
  planCard: { flexDirection: 'row', gap: 12, borderWidth: 2, borderColor: colors.border, borderRadius: 20, padding: 14 },
  planCardActive: { borderColor: colors.primary, backgroundColor: '#f5ebe4' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: colors.borderMuted, alignItems: 'center', justifyContent: 'center' },
  radioActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  centerBlock: { alignItems: 'center', gap: 10, paddingVertical: 10 },
  tokenCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  bigNumber: { fontSize: 44, fontWeight: '700', color: colors.text },
  qrPlaceholder: { height: 180, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 12 },
  searchInput: { flex: 1, color: colors.text, padding: 0 },
  topActions: { flexDirection: 'row', gap: 8 },
  bigStat: { fontSize: 28, fontWeight: '700', color: colors.textMuted },
  dockWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingBottom: 20 },
  dock: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(245,243,240,0.97)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', paddingVertical: 12 },
  dockItem: { paddingVertical: 6, paddingHorizontal: 8 },
  dockText: { color: colors.textMuted, fontSize: 12, fontWeight: '700', textTransform: 'lowercase' },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerMiniButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ebe8e3', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18 },
  headerMiniButtonText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textTransform: 'lowercase' },
  friendListRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 18 },
  friendAvatarWrap: { position: 'relative' },
  friendBadge: { position: 'absolute', top: -2, right: -2, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  friendListName: { flex: 1, color: colors.text, fontSize: 16, textTransform: 'lowercase' },
  largeRowCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 16 },
  scanBubble: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  largeRowTitle: { color: colors.text, fontSize: 16, fontWeight: '400', textTransform: 'lowercase' },
  largeRowSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 4, textTransform: 'lowercase' },
  inlineChip: { backgroundColor: '#ebe8e3', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  inlineChipText: { color: colors.textMuted, fontSize: 13, textTransform: 'lowercase' },
  contactListCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 12, marginTop: 8 },
  addPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  addPillDisabled: { backgroundColor: '#ebe8e3' },
  addPillText: { color: '#fff', fontSize: 13, textTransform: 'lowercase' },
  addPillTextDisabled: { color: colors.textSoft },
  userIdInput: { fontFamily: 'monospace', letterSpacing: 2, textTransform: 'uppercase' as const },
  fullButton: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 18, alignItems: 'center', marginTop: 8 },
  fullButtonDisabled: { backgroundColor: '#ebe8e3' },
  fullButtonText: { color: '#fff', fontWeight: '700', textTransform: 'lowercase' },
  fullButtonTextDisabled: { color: colors.textSoft },
  membershipModalCard: { backgroundColor: colors.surface, borderRadius: 28, padding: 18, gap: 12, maxHeight: '90%' },
  planPrice: { color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 10 },
  billingWrap: { gap: 10, marginTop: 4 },
  billingLabel: { color: colors.textMuted, fontSize: 13, fontWeight: '600', textTransform: 'lowercase' },
  billingCard: { flexDirection: 'row', gap: 12, borderWidth: 2, borderColor: colors.border, borderRadius: 20, padding: 14 },
  billingPrice: { color: colors.text, fontSize: 18, fontWeight: '700' },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  faqSection: { marginTop: 10, gap: 8 },
  faqCategory: { color: colors.textSoft, fontSize: 12, fontWeight: '600', textTransform: 'lowercase', paddingHorizontal: 8 },
  faqCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 16, gap: 10 },
  faqQuestion: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '600', paddingRight: 12, textTransform: 'lowercase' },
  faqAnswer: { color: colors.textMuted, fontSize: 13, lineHeight: 18, textTransform: 'lowercase' },
  faqEmpty: { alignItems: 'center', paddingVertical: 40, gap: 6 },
  faqEmptySub: { color: colors.textSoft, fontSize: 12, textTransform: 'lowercase' },
});
