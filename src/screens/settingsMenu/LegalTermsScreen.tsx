import React from 'react';
import { Text } from 'react-native';

import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const LegalTermsScreen = () => {
  const sections = ['acceptance of terms', 'services and content', 'user responsibilities', 'contact information'];
  return (
    <AppLayout title="terms of service" showBack>
      {sections.map((section) => (
        <Card key={section}>
          <Text style={styles.cardTitle}>{section}</Text>
          <Text style={styles.cardText}>placeholder legal copy for the mobile version.</Text>
        </Card>
      ))}
    </AppLayout>
  );
};

export default LegalTermsScreen;

