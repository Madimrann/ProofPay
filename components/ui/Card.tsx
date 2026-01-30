import React from 'react';
import { View as DefaultView, Platform, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColor, View } from '../Themed';

interface CardProps extends React.ComponentProps<typeof DefaultView> {
    variant?: 'elevated' | 'outlined' | 'flat';
    glass?: boolean;
}

export function Card({ style, variant = 'elevated', glass, ...props }: CardProps) {
    const borderColor = useThemeColor({}, 'border');
    const cardColor = useThemeColor({}, 'card');
    const shadowColor = useThemeColor({ light: '#000', dark: '#000' }, 'text'); // Subtle shadow

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: cardColor,
                    ...Platform.select({
                        ios: {
                            shadowColor: shadowColor,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.08,
                            shadowRadius: 12,
                        },
                        android: {
                            elevation: 4,
                        },
                        web: {
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                        }
                    }),
                };
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: borderColor,
                };
            case 'flat':
                return {
                    backgroundColor: useThemeColor({}, 'background'), // Or slightly offset
                };
            default:
                return {};
        }
    };

    return (
        <View
            style={[
                styles.card,
                getVariantStyle(),
                glass && styles.glass, // Mock glass for now, would need BlurView for real
                style,
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    glass: {
        opacity: 0.9,
    },
});
