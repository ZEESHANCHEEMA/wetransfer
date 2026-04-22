import { usePathname, useRouter } from 'expo-router';
import { BarChart3, Home, Hourglass, Users } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { styles } from '../styles';

export const Dock = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs = useMemo(
    () =>
      [
        { id: 'home', label: 'home', href: '/', Icon: Home },
        { id: 'settings', label: 'limits', href: '/settings', Icon: Hourglass },
        { id: 'friends', label: 'chat', href: '/friends', Icon: Users },
        { id: 'usage', label: 'usage', href: '/usage', Icon: BarChart3 },
      ] as const,
    []
  );

  const activeId = useMemo(() => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/settings')) return 'settings';
    if (pathname.startsWith('/friends')) return 'friends';
    if (pathname.startsWith('/usage')) return 'usage';
    return 'home';
  }, [pathname]);

  const dockWidth = useSharedValue(0);
  const tabWidth = useDerivedValue(() => (dockWidth.value > 0 ? dockWidth.value / tabs.length : 0));
  const activeIndex = useMemo(() => Math.max(0, tabs.findIndex((tab) => tab.id === activeId)), [activeId, tabs]);

  const indicatorStyle = useAnimatedStyle(() => {
    const x = withSpring(activeIndex * tabWidth.value, { stiffness: 320, damping: 28, mass: 0.6 });
    return {
      transform: [{ translateX: x }],
      width: tabWidth.value,
    };
  }, [activeIndex]);

  return (
    <View style={[styles.dockWrap, { paddingBottom: Math.max(12, insets.bottom + 12) }]}>
      <View
        style={styles.dock}
        onLayout={(event) => {
          dockWidth.value = event.nativeEvent.layout.width;
        }}>
        <Animated.View pointerEvents="none" style={[styles.dockIndicator, indicatorStyle]} />
        {tabs.map((tab) => (
          <Pressable
            key={tab.href}
            onPress={() => router.push(tab.href as never)}
            style={[styles.dockItem, activeId === tab.id && styles.dockItemActive]}>
            <tab.Icon
              size={22}
              strokeWidth={1.6}
              color={activeId === tab.id ? styles.dockIconActive.color : styles.dockIcon.color}
            />
            <Text style={[styles.dockText, activeId === tab.id && styles.dockTextActive]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

