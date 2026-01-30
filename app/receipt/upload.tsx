import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { ArrowLeft, Upload } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/Colors';

export default function UploadReceiptScreen() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [amount, setAmount] = useState('$150.00');
    const [date, setDate] = useState('Apr 24, 2024');
    const [paidTo, setPaidTo] = useState('Sarah Tan');
    const [description, setDescription] = useState('Logo design deposit');

    const primaryColor = useThemeColor({}, 'primary');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAnalyze = () => {
        if (!image) {
            pickImage();
            return;
        }
        router.push({ pathname: '/receipt/verify', params: { imageUri: image } });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace('/(tabs)');
                        }
                    }}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Case</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <Text style={styles.amount}>{amount}</Text>

                <View style={styles.formSection}>
                    <View style={styles.formRow}>
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity style={styles.formValue}>
                            <Text style={styles.valueText}>{date}</Text>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.label}>Paid to</Text>
                        <TouchableOpacity style={styles.formValue}>
                            <Text style={styles.valueText}>{paidTo}</Text>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.valueText}>{description}</Text>
                    </View>
                </View>

                <View style={styles.uploadSection}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={pickImage}
                    >
                        <Upload size={24} color={primaryColor} />
                    </TouchableOpacity>
                    <Text style={styles.uploadTitle}>Upload Screenshot/PDF/ Receipt</Text>
                    <Text style={styles.uploadSubtitle}>
                        Analyze structure & metadata.{'\n'}We do not judge intent.
                    </Text>
                </View>

                {image && (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: image }} style={styles.previewImage} />
                    </View>
                )}

                <Button
                    title="Analyze Receipt"
                    onPress={handleAnalyze}
                    style={styles.analyzeButton}
                />

                {image && (
                    <View style={styles.receiptPreview}>
                        <Image
                            source={{ uri: image }}
                            style={styles.receiptThumbnail}
                            resizeMode="contain"
                        />
                    </View>
                )}

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
    amount: {
        fontSize: 34,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 24,
    },
    formSection: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    label: {
        fontSize: 15,
        color: Colors.light.text,
    },
    formValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    valueText: {
        fontSize: 15,
        color: Colors.light.muted,
    },
    chevron: {
        fontSize: 18,
        color: Colors.light.muted,
    },
    uploadSection: {
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 24,
    },
    uploadButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.light.card,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    uploadTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 8,
    },
    uploadSubtitle: {
        fontSize: 13,
        color: Colors.light.muted,
        textAlign: 'center',
        lineHeight: 18,
    },
    previewContainer: {
        marginBottom: 24,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    previewImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    analyzeButton: {
        marginBottom: 24,
    },
    receiptPreview: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    receiptThumbnail: {
        width: '100%',
        height: 150,
    },
});
