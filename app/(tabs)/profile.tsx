import { useRouter } from 'expo-router';
import { Bell, LogOut, Settings, Shield } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder} />
                <Text style={styles.name}>Alex Johnson</Text>
                <Text style={styles.email}>alex@example.com</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Verified Seller</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>98%</Text>
                    <Text style={styles.statLabel}>Trust Score</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>152</Text>
                    <Text style={styles.statLabel}>Transactions</Text>
                </Card>
            </View>

            <View style={styles.menu}>
                <Button
                    title="Account Settings"
                    variant="ghost"
                    icon={<Settings size={20} color={Colors.light.text} />}
                    style={styles.menuItem}
                />
                <Button
                    title="Notifications"
                    variant="ghost"
                    icon={<Bell size={20} color={Colors.light.text} />}
                    style={styles.menuItem}
                />
                <Button
                    title="Security & Privacy"
                    variant="ghost"
                    icon={<Shield size={20} color={Colors.light.text} />}
                    style={styles.menuItem}
                />
                <Button
                    title="Log Out"
                    variant="danger"
                    icon={<LogOut size={20} color="#fff" />}
                    style={styles.logoutButton}
                    onPress={() => router.replace('/(auth)/login')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.light.border,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: Colors.light.muted,
        marginBottom: 12,
    },
    badge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: Colors.light.success,
        fontWeight: '600',
        fontSize: 12,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.light.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.light.muted,
    },
    menu: {
        gap: 8,
    },
    menuItem: {
        justifyContent: 'flex-start',
        backgroundColor: Colors.light.card,
    },
    logoutButton: {
        marginTop: 24,
    },
});
