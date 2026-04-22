import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { friends } from '../../data/mockData';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const FriendDetailScreen = () => {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const friend = friends.find((entry) => String(entry.id) === friendId) ?? friends[0];

  const requests = [
    { id: 1, app: 'Instagram', reason: 'need to post a story', status: 'approved' as const },
    { id: 2, app: 'YouTube', reason: 'watching a tutorial', status: 'pending' as const },
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
};

export default FriendDetailScreen;

