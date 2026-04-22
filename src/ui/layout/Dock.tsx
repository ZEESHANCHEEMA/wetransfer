import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { styles } from '../styles';

export const Dock = () => {
  const router = useRouter();
  const tabs = [
    { label: 'home', href: '/' },
    { label: 'limits', href: '/settings' },
    { label: 'chat', href: '/friends' },
    { label: 'usage', href: '/usage' },
  ] as const;

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
};

