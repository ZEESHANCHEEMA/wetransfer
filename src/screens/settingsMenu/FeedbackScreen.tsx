import { CheckCircle2, Image as ImageIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '../../theme';
import { Button } from '../../ui/components/Button';
import { Card } from '../../ui/components/Card';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const FeedbackScreen = () => {
  const [category, setCategory] = useState<'feature' | 'bug'>('feature');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <AppLayout scroll={false}>
        <View style={styles.centeredPage}>
          <CheckCircle2 size={40} color={colors.success} strokeWidth={1.8} />
          <Text style={styles.heroTitle}>thank you</Text>
          <Text style={styles.heroSubtitle}>your feedback was submitted</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="feedback" showBack>
      <Card>
        <Text style={styles.cardTitle}>category</Text>
        <View style={styles.segmented}>
          <Pressable onPress={() => setCategory('feature')} style={[styles.segment, category === 'feature' && styles.segmentActive]}>
            <Text style={[styles.segmentText, category === 'feature' && styles.segmentTextActive]}>feature request</Text>
          </Pressable>
          <Pressable onPress={() => setCategory('bug')} style={[styles.segment, category === 'bug' && styles.segmentActive]}>
            <Text style={[styles.segmentText, category === 'bug' && styles.segmentTextActive]}>report a bug</Text>
          </Pressable>
        </View>
      </Card>
      <Card>
        <Text style={styles.cardTitle}>description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          placeholder="describe your idea or issue"
          placeholderTextColor={colors.textSoft}
          style={[styles.input, styles.textArea]}
        />
      </Card>
      <Card>
        <View style={styles.rowGap}>
          <ImageIcon size={18} color={colors.primary} strokeWidth={1.8} />
          <Text style={styles.cardTitle}>add images</Text>
        </View>
        <Button text="choose images" variant="secondary" />
      </Card>
      <Button text={category === 'bug' ? 'report bug' : 'submit feedback'} onPress={() => setSubmitted(true)} />
    </AppLayout>
  );
};

export default FeedbackScreen;

