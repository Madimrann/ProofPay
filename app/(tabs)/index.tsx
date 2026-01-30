import { useRouter } from 'expo-router';
import { MoreHorizontal, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

// Mock Data - matching reference design
const CASES = [
  { id: '1', amount: '$150.00', recipient: 'Sarah Tan', updated: '3 mins ago', status: 'Acknowledged', confidence: 'High Confidence' },
  { id: '2', amount: '$75.00', recipient: 'Klang Print Shop', updated: '1 hour ago', status: 'Pending Confirmation', confidence: 'Confidence' },
  { id: '3', amount: '$200.00', recipient: 'Henry Kim', updated: '8 hours ago', status: 'Under Review', confidence: 'Low Confidence' },
  { id: '4', amount: '$50.00', recipient: 'Ali Ashraf', updated: '', status: 'Resolved', confidence: '' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const primaryColor = useThemeColor({}, 'primary');
  const mutedColor = useThemeColor({}, 'muted');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Acknowledged': return Colors.light.acknowledged;
      case 'Pending Confirmation': return Colors.light.pending;
      case 'Under Review': return Colors.light.underReview;
      case 'Resolved': return Colors.light.resolved;
      default: return mutedColor;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Acknowledged': return '#E3F2FD';
      case 'Pending Confirmation': return '#FFF3E0';
      case 'Under Review': return '#F5F5F5';
      case 'Resolved': return '#E8F5E9';
      default: return '#F5F5F5';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>ProofPay</Text>
            <Text style={styles.tagline}>Clear payment proof. Fewer arguments.</Text>
          </View>
        </View>

        {/* New Case Button */}
        <Button
          title="New Case"
          icon={<Plus size={18} color="#fff" />}
          onPress={() => router.push('/receipt/upload')}
          style={styles.newCaseButton}
        />

        {/* Recent Cases */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Cases</Text>
          <TouchableOpacity>
            <MoreHorizontal size={20} color={mutedColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.caseList}>
          {CASES.map((caseItem) => (
            <TouchableOpacity
              key={caseItem.id}
              onPress={() => router.push(`/transaction/${caseItem.id}`)}
              style={styles.caseCard}
            >
              <View style={styles.caseHeader}>
                <Text style={styles.caseAmount}>{caseItem.amount}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(caseItem.status) }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(caseItem.status) }]}>
                    {caseItem.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.caseRecipient}>{caseItem.recipient}</Text>
              {caseItem.updated && (
                <Text style={styles.caseUpdated}>
                  Updated {caseItem.updated} · {caseItem.confidence}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  newCaseButton: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  caseList: {
    gap: 12,
  },
  caseCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  caseRecipient: {
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 4,
  },
  caseUpdated: {
    fontSize: 12,
    color: Colors.light.muted,
  },
});
