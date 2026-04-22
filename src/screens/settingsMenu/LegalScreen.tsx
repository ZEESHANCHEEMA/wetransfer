import React from 'react';
import { Text } from 'react-native';

import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const LegalScreen = () => {
  return (
    <AppLayout title="legal information" showBack>
      <Card>
        <Text style={styles.cardText}>coming soon</Text>
      </Card>
    </AppLayout>
  );
};

export default LegalScreen;

