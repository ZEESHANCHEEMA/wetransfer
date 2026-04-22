import { Zap } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { colors } from '../../theme';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const TokenRequestScreen = () => {
  return (
    <AppLayout title="emergency token" showBack>
      <Card>
        <View style={styles.centerBlock}>
          <View style={styles.tokenCircle}>
            <Zap size={44} color={colors.white} strokeWidth={1.7} />
          </View>
          <Text style={styles.bigNumber}>3</Text>
          <Text style={styles.cardText}>tokens remaining</Text>
        </View>
      </Card>
    </AppLayout>
  );
};

export default TokenRequestScreen;

