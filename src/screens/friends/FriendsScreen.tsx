import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

import { friends } from '../../data/mockData';
import { colors } from '../../theme';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const FriendsScreen = () => {
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
      <View style={styles.searchWrap}>
        <TextInput value={query} onChangeText={setQuery} placeholder="search..." placeholderTextColor={colors.textSoft} style={styles.searchInput} />
      </View>
      {filteredFriends.map((friend) => (
        <Pressable
          key={friend.id}
          onPress={() => router.push({ pathname: '/friends/[friendId]', params: { friendId: String(friend.id) } })}
          style={styles.friendListRow}>
          <View style={styles.friendAvatarWrap}>
            <Image source={{ uri: friend.image }} style={styles.avatar} />
            {friend.activeRequests > 0 ? (
              <View style={styles.friendBadge}>
                <Text style={styles.badgeText}>{friend.activeRequests}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.friendListName}>{friend.name}</Text>
        </Pressable>
      ))}
    </AppLayout>
  );
};

export default FriendsScreen;

