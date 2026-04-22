import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { notificationOptions } from '../../constants/notifications';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const NotificationsScreen = () => {
  const [values, setValues] = useState<Record<string, boolean>>({
    extension: true,
    warning: true,
    message: true,
    friend: true,
  });

  return (
    <AppLayout title="notifications" showBack>
      {notificationOptions.map((notification) => (
        <Card key={notification.id}>
          <View style={styles.rowBetween}>
            <View style={styles.flexOne}>
              <Text style={styles.cardTitle}>{notification.title}</Text>
              <Text style={styles.cardText}>{notification.description}</Text>
            </View>
            <Switch value={values[notification.id]} onValueChange={(value) => setValues((current) => ({ ...current, [notification.id]: value }))} />
          </View>
        </Card>
      ))}
    </AppLayout>
  );
};

export default NotificationsScreen;

