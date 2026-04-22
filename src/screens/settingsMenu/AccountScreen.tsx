import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const AccountScreen = () => {
  const [firstName, setFirstName] = useState('Olivia');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('olivia.smith@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <AppLayout title="account" showBack>
      <Card>
        <Text style={styles.cardTitle}>personal details</Text>
        <TextInput value={firstName} onChangeText={setFirstName} style={styles.input} />
        <TextInput value={lastName} onChangeText={setLastName} style={styles.input} />
        <TextInput value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
        <Button text="save changes" />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>security</Text>
        <TextInput value={currentPassword} onChangeText={setCurrentPassword} placeholder="current password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
        <TextInput value={newPassword} onChangeText={setNewPassword} placeholder="new password" placeholderTextColor={colors.textSoft} secureTextEntry style={styles.input} />
        <Button text="save password" />
      </Card>
      <Card>
        <Text style={styles.cardTitle}>delete account</Text>
        <Button text="delete account" variant="secondary" />
      </Card>
    </AppLayout>
  );
};

export default AccountScreen;

