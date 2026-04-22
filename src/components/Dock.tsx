import { useNavigation, useRoute } from '@react-navigation/native';
import { BarChart3, Home, Hourglass, Users } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/types';
import { alpha, colors } from '../theme';

const tabs = [
  { key: 'Home', label: 'home', icon: Home },
  { key: 'Settings', label: 'limits', icon: Hourglass },
  { key: 'Friends', label: 'chat', icon: Users },
  { key: 'Usage', label: 'usage', icon: BarChart3 },
] as const;

export function Dock() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <View style={styles.wrap}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const active = route.name === tab.key;
          const Icon = tab.icon;
          return (
            <Pressable
              key={tab.key}
              onPress={() => navigation.navigate(tab.key)}
              style={[styles.tab, active && styles.activeTab]}>
              <Icon color={active ? colors.primary : colors.textSoft} size={21} strokeWidth={1.8} />
              <Text style={[styles.label, active && styles.activeLabel]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: alpha.dockBorder,
    backgroundColor: alpha.dockBackgroundStrong,
    borderRadius: 24,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 64,
    paddingVertical: 6,
    borderRadius: 18,
  },
  activeTab: {
    backgroundColor: alpha.activePill,
  },
  label: {
    color: colors.textSoft,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
  activeLabel: {
    color: colors.primary,
  },
});
