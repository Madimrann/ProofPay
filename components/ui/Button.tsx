import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useThemeColor } from '../Themed';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: React.ReactNode;
}

export function Button({
    title,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    style,
    disabled,
    ...props
}: ButtonProps) {
    const primaryColor = useThemeColor({}, 'primary');
    const secondaryColor = useThemeColor({}, 'secondary');
    const errorColor = useThemeColor({}, 'error');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');

    const getBackgroundColor = () => {
        if (disabled) return useThemeColor({}, 'muted');
        switch (variant) {
            case 'primary': return primaryColor;
            case 'secondary': return secondaryColor;
            case 'danger': return errorColor;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return primaryColor;
        }
    };

    const getTextColor = () => {
        if (disabled) return '#FFFFFF'; // Muted usually dark enough
        switch (variant) {
            case 'primary': return '#FFFFFF';
            case 'secondary': return '#FFFFFF';
            case 'danger': return '#FFFFFF';
            case 'outline': return primaryColor;
            case 'ghost': return primaryColor;
            default: return '#FFFFFF';
        }
    };

    const backgroundColor = getBackgroundColor();
    const color = getTextColor();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor },
                variant === 'outline' && { borderWidth: 1, borderColor: primaryColor },
                size === 'sm' && styles.sm,
                size === 'md' && styles.md,
                size === 'lg' && styles.lg,
                disabled && styles.disabled,
                style,
            ]}
            activeOpacity={0.7}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={color} />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={[styles.text, { color }, size === 'sm' && styles.textSm, size === 'lg' && styles.textLg]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        gap: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
            web: {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }
        }),
    },
    sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    md: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    lg: {
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    disabled: {
        opacity: 0.6,
        ...Platform.select({
            ios: { shadowOpacity: 0 },
            android: { elevation: 0 },
            web: { boxShadow: 'none' }
        }),
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
    },
    textSm: {
        fontSize: 14,
    },
    textLg: {
        fontSize: 18,
    },
});
