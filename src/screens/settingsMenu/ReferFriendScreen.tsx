import { QrCode, Share2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

import { choosePartnerContacts } from '../../constants/contacts';
import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const ReferFriendScreen = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [invited, setInvited] = useState<number[]>([]);

  return (
    <AppLayout title="refer a friend" showBack>
      {choosePartnerContacts.map((contact) => (
        <Card key={contact.id}>
          <View style={styles.rowBetween}>
            <View style={styles.contactRow}>
              <Image source={{ uri: contact.image }} style={styles.avatar} />
              <View>
                <Text style={styles.cardTitle}>{contact.name}</Text>
                <Text style={styles.cardText}>{contact.phone}</Text>
              </View>
            </View>
            <Button
              text={invited.includes(contact.id) ? 'invited' : 'invite'}
              variant={invited.includes(contact.id) ? 'secondary' : 'primary'}
              onPress={() => setInvited((current) => [...current, contact.id])}
            />
          </View>
        </Card>
      ))}
      <Card>
        <View style={styles.rowGap}>
          <Share2 size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>share invite link</Text>
        </View>
        <Button text="share link" />
      </Card>
      <Card>
        <View style={styles.rowGap}>
          <QrCode size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>scan QR code</Text>
        </View>
        <Button text={showQRCode ? 'qr visible' : 'show my QR code'} variant="secondary" onPress={() => setShowQRCode((value) => !value)} />
        {showQRCode ? (
          <View style={styles.qrPlaceholder}>
            <Text style={styles.cardText}>QR preview</Text>
          </View>
        ) : null}
      </Card>
    </AppLayout>
  );
};

export default ReferFriendScreen;

