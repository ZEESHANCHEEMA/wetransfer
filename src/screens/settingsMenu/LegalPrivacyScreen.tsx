import React from 'react';
import { Text } from 'react-native';

import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const LegalPrivacyScreen = () => {
  const sections = ['information we collect', 'how we use your information', 'data security', 'your rights'];
  return (
    <AppLayout title="privacy policy" showBack>
      {sections.map((section) => (
        <Card key={section}>
          <Text style={styles.cardTitle}>{section}</Text>
          <Text style={styles.cardText}>placeholder legal copy for the mobile version.</Text>
        </Card>
      ))}
    </AppLayout>
  );
};

export default LegalPrivacyScreen;

