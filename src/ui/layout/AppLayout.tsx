import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme';
import { Dock } from './Dock';
import { styles } from '../styles';

type AppLayoutProps = {
  title?: string;
  children: ReactNode;
  scroll?: boolean;
  withDock?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
};

export const AppLayout = ({ title, children, scroll = true, withDock = false, showBack = false, onBack, right }: AppLayoutProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const content = scroll ? <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView> : <View style={styles.body}>{children}</View>;

  return (
    <SafeAreaView style={styles.safe} edges={['left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      {(title || showBack || right) && (
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 8) }]}>
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
};

