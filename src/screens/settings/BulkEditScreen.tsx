import React from 'react';
import { Text } from 'react-native';

import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const BulkEditScreen = () => {
  return (
    <AppLayout title="bulk edit apps" showBack>
      <Card>
        <Text style={styles.cardTitle}>selected apps</Text>
        <Text style={styles.cardText}>instagram, tiktok, youtube</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>time limit</Text>
        <Text style={styles.cardText}>1h 30m for all selected apps</Text>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>downtime</Text>
        <Text style={styles.cardText}>10:00 pm - 8:00 am for all selected apps</Text>
      </Card>
      <Button text="save bulk changes" />
    </AppLayout>
  );
};

export default BulkEditScreen;

