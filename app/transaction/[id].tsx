import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle, Circle, MessageSquare } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import Colors from '@/constants/Colors';

const TIMELINE_EVENTS = [
    { id: 1, title: 'Sarah Tan', subtitle: 'Apr 24, 2024, 10:12 AM', status: 'completed', isUser: true },
    { id: 2, title: 'Awaiting Sarah\'s confirmation', subtitle: 'Pending Confirmation', status: 'pending' },
    { id: 3, title: 'Under Review', subtitle: '', status: 'pending' },
    { id: 4, title: 'Proof uploaded', subtitle: '', status: 'completed' },
    { id: 5, title: '$150.00 paid', subtitle: '', status: 'info' },
    { id: 6, title: 'Case created', subtitle: '', status: 'info' },
    { id: 7, title: 'Ali Ashraf', subtitle: '4 hour and 4 mins ago', status: 'completed', isUser: true },
];

export default function TransactionDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const primaryColor = useThemeColor({}, 'primary');
    const successColor = useThemeColor({}, 'success');
    const mutedColor = useThemeColor({}, 'muted');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cases</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabActive}>
                    <Text style={styles.tabTextActive}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Resolved</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.caseCard}>
                    <View style={styles.caseHeader}>
                        <Text style={styles.caseAmount}>$150.00</Text>
                        <Text style={styles.caseSubtitle}>paid by You</Text>
                        <Text style={styles.caseDate}>Apr 24, 2024</Text>
                    </View>

                    {/* Timeline */}
                    <View style={styles.timeline}>
                        {TIMELINE_EVENTS.map((event, index) => {
                            const isLast = index === TIMELINE_EVENTS.length - 1;
                            const getIcon = () => {
                                if (event.isUser) {
                                    return (
                                        <View style={styles.avatarDot}>
                                            <Image source={{ uri: 'https://via.placeholder.com/32' }} style={styles.avatar} />
                                        </View>
                                    );
                                }
                                if (event.status === 'completed') {
                                    return (
                                        <View style={[styles.dot, { backgroundColor: primaryColor }]}>
                                            <CheckCircle size={12} color="#fff" />
                                        </View>
                                    );
                                }
                                if (event.status === 'pending') {
                                    return (
                                        <View style={[styles.dot, { backgroundColor: Colors.light.pending }]}>
                                            <Circle size={12} color="#fff" />
                                        </View>
                                    );
                                }
                                return (
                                    <View style={[styles.dot, { backgroundColor: mutedColor }]}>
                                        <Circle size={8} color="#fff" />
                                    </View>
                                );
                            };

                            return (
                                <View key={event.id} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        {getIcon()}
                                        {!isLast && <View style={styles.line} />}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={[styles.eventTitle, event.status === 'pending' && { color: Colors.light.pending }]}>
                                            {event.title}
                                        </Text>
                                        {event.subtitle && (
                                            <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity style={styles.addNote}>
                    <MessageSquare size={20} color={mutedColor} />
                    <Text style={styles.addNoteText}>Add a note...</Text>
                    <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
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
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: Colors.light.card,
        paddingHorizontal: 20,
        paddingBottom: 12,
        gap: 8,
    },
    tab: {
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    tabActive: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        backgroundColor: Colors.light.primary,
        borderRadius: 16,
    },
    tabText: {
        fontSize: 14,
        color: Colors.light.muted,
    },
    tabTextActive: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    caseCard: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    caseHeader: {
        marginBottom: 24,
    },
    caseAmount: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    caseSubtitle: {
        fontSize: 13,
        color: Colors.light.muted,
        marginBottom: 2,
    },
    caseDate: {
        fontSize: 13,
        color: Colors.light.muted,
    },
    timeline: {
        paddingLeft: 4,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: 12,
        width: 32,
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    avatarDot: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
    },
    avatar: {
        width: 32,
        height: 32,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.light.border,
        position: 'absolute',
        top: 24,
        bottom: -20,
    },
    timelineContent: {
        flex: 1,
        paddingTop: 2,
    },
    eventTitle: {
        fontWeight: '500',
        fontSize: 15,
        color: Colors.light.text,
        marginBottom: 2,
    },
    eventSubtitle: {
        fontSize: 13,
        color: Colors.light.muted,
    },
    addNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 16,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    addNoteText: {
        flex: 1,
        fontSize: 15,
        color: Colors.light.muted,
    },
    chevron: {
        fontSize: 18,
        color: Colors.light.muted,
    },
});
