import React from 'react';
import { Text, View } from 'react-native';

import { limitedApps } from '../../data/mockData';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { formatMinutes, styles } from '../../ui/styles';

const UsageScreen = () => {
  return (
    <AppLayout title="progress" withDock>
      <Card>
        <View style={styles.rowBetween}>
          <Text style={styles.cardText}>without accountability</Text>
          <Text style={styles.cardText}>with accountability</Text>
        </View>
      </Card>
      {limitedApps.map((app) => (
        <Card key={app.id}>
          <Text style={styles.cardTitle}>{app.name}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.bigStat}>{formatMinutes(app.beforeAppMinutes)}</Text>
            <Text style={styles.bigStat}>{formatMinutes(app.todayMinutes)}</Text>
          </View>
        </Card>
      ))}
    </AppLayout>
  );
};

export default UsageScreen;

