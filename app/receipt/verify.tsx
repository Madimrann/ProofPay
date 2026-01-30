import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function VerifyReceiptScreen() {
    const router = useRouter();
    const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
    const [analyzing, setAnalyzing] = useState(true);

    const successColor = useThemeColor({}, 'success');
    const primaryColor = useThemeColor({}, 'primary');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnalyzing(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (analyzing) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={primaryColor} />
                <Text style={styles.analyzingText}>Analyzing Receipt...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Receipt Analysis</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.amountSection}>
                    <Text style={styles.amount}>$150.00</Text>
                    <Text style={styles.amountDetail}>paid to Sarah Tan · Apr 24, 2024</Text>
                </View>

                <View style={styles.statusCard}>
                    <CheckCircle size={20} color={successColor} />
                    <Text style={styles.statusText}>Looks Valid</Text>
                </View>

                {imageUri && (
                    <View style={styles.receiptPreview}>
                        <Image source={{ uri: imageUri }} style={styles.receiptImage} resizeMode="contain" />
                    </View>
                )}

                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Details</Text>

                    <View style={styles.detailRow}>
                        <CheckCircle size={16} color={successColor} />
                        <Text style={styles.detailText}>Structure matches bank receipt</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <CheckCircle size={16} color={successColor} />
                        <Text style={styles.detailText}>Timestamp detected</Text>
                    </View>

                    <TouchableOpacity style={styles.confidenceRow}>
                        <Text style={styles.confidenceLabel}>Confidence:</Text>
                        <Text style={[styles.confidenceValue, { color: successColor }]}>High</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Confirm & Track Case"
                    onPress={() => {
                        router.dismissAll();
                        router.replace('/(tabs)');
                    }}
                    style={styles.confirmButton}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: Colors.light.card,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        padding: 20,
    },
    amountSection: {
        marginBottom: 16,
    },
    amount: {
        fontSize: 34,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    amountDetail: {
        fontSize: 13,
        color: Colors.light.muted,
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#E8F5E9',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    statusText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.success,
    },
    receiptPreview: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    receiptImage: {
        width: '100%',
        height: 200,
    },
    detailsSection: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    detailText: {
        fontSize: 15,
        color: Colors.light.text,
    },
    confidenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        marginTop: 4,
    },
    confidenceLabel: {
        fontSize: 15,
        color: Colors.light.text,
        flex: 1,
    },
    confidenceValue: {
        fontSize: 15,
        fontWeight: '600',
        marginRight: 4,
    },
    chevron: {
        fontSize: 18,
        color: Colors.light.muted,
    },
    confirmButton: {
        marginBottom: 20,
    },
    analyzingText: {
        fontSize: 17,
        fontWeight: '500',
        marginTop: 16,
        color: Colors.light.text,
    },
});
