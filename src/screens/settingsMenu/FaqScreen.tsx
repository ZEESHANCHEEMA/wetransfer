import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { faqItems } from '../../constants/faq';
import { colors } from '../../theme';
import { AppLayout } from '../../ui/layout/AppLayout';
import { styles } from '../../ui/styles';

const FaqScreen = () => {
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = faqItems.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase()) ||
      faq.category.toLowerCase().includes(query.toLowerCase())
  );
  const categories = Array.from(new Set(faqItems.map((faq) => faq.category)));

  return (
    <AppLayout title="frequently asked questions" showBack>
      <View style={styles.searchWrap}>
        <Search size={18} color={colors.textSoft} strokeWidth={1.8} />
        <TextInput value={query} onChangeText={setQuery} placeholder="search for help..." placeholderTextColor={colors.textSoft} style={styles.searchInput} />
      </View>
      {categories.map((category) => {
        const categoryFaqs = filtered.filter((faq) => faq.category === category);
        if (categoryFaqs.length === 0) return null;
        return (
          <View key={category} style={styles.faqSection}>
            <Text style={styles.faqCategory}>{category}</Text>
            {categoryFaqs.map((faq) => (
              <View key={faq.id} style={styles.faqCard}>
                <Pressable onPress={() => setExpandedId((current) => (current === faq.id ? null : faq.id))} style={styles.rowBetween}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {expandedId === faq.id ? <ChevronUp size={16} color={colors.textSoft} strokeWidth={1.8} /> : <ChevronDown size={16} color={colors.textSoft} strokeWidth={1.8} />}
                </Pressable>
                {expandedId === faq.id ? <Text style={styles.faqAnswer}>{faq.answer}</Text> : null}
              </View>
            ))}
          </View>
        );
      })}
      {filtered.length === 0 ? (
        <View style={styles.faqEmpty}>
          <Text style={styles.cardText}>no questions found</Text>
          <Text style={styles.faqEmptySub}>try a different search term</Text>
        </View>
      ) : null}
    </AppLayout>
  );
};

export default FaqScreen;

