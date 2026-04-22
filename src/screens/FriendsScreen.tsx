import { Plus } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Dock } from '../components/Dock';
import { friends } from '../data/mockData';
import { colors } from '../theme';

export function FriendsScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => friends.filter((friend) => friend.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>chat</Text>
          <Pressable style={styles.addBtn}>
            <Plus size={16} color={colors.textMuted} strokeWidth={1.8} />
            <Text style={styles.addBtnText}>add partner</Text>
          </Pressable>
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="search partners"
          placeholderTextColor={colors.textSoft}
          style={styles.search}
        />

        {filtered.map((friend) => (
          <Pressable key={friend.id} style={styles.friendRow}>
            <View>
              <Image source={{ uri: friend.image }} style={styles.avatar} />
              {friend.activeRequests > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{friend.activeRequests}</Text>
                </View>
              )}
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendMeta}>{friend.sharedApps} shared apps</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Dock />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 16,
    marginBottom: 16,
  },
  title: { color: colors.text, fontSize: 20, fontWeight: '700', textTransform: 'lowercase' },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ebe8e3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
  },
  addBtnText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textTransform: 'lowercase' },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    marginBottom: 16,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 22,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  friendInfo: { flex: 1 },
  friendName: { color: colors.text, fontSize: 16, fontWeight: '700' },
  friendMeta: { color: colors.textMuted, fontSize: 13, marginTop: 4, textTransform: 'lowercase' },
});
