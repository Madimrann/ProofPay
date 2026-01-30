import { Text } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();
    const [role, setRole] = useState<'seller' | 'buyer'>('seller');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <View style={styles.logoPlaceholder}>
                            <Text style={styles.logoText}>ProofPay</Text>
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Secure payments and dispute resolution for everyone.
                        </Text>
                    </View>

                    <View style={styles.roleSelector}>
                        <Button
                            title="Seller"
                            variant={role === 'seller' ? 'primary' : 'outline'}
                            onPress={() => setRole('seller')}
                            style={styles.roleButton}
                            size="sm"
                        />
                        <Button
                            title="Buyer"
                            variant={role === 'buyer' ? 'primary' : 'outline'}
                            onPress={() => setRole('buyer')}
                            style={styles.roleButton}
                            size="sm"
                        />
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Email Address"
                            placeholder="you@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            label="Password"
                            placeholder="••••••••"
                            secureTextEntry
                        />

                        <View style={styles.forgotPassword}>
                            <Text style={styles.linkText}>Forgot Password?</Text>
                        </View>

                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            loading={loading}
                            style={styles.signInButton}
                            size="lg"
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    logoText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.muted,
        textAlign: 'center',
        maxWidth: '80%',
        lineHeight: 24,
    },
    roleSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
        gap: 12,
    },
    roleButton: {
        minWidth: 100,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    signInButton: {
        marginBottom: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: Colors.light.muted,
        fontSize: 14,
    },
    linkText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
    },
});
