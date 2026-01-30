import React, { useState } from 'react';
import { View as DefaultView, StyleSheet, TextInput } from 'react-native';
import { Text, useThemeColor } from '../Themed';

interface InputProps extends React.ComponentProps<typeof TextInput> {
    label?: string;
    error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'tabIconDefault');
    const borderColor = useThemeColor({}, 'border');
    const primaryColor = useThemeColor({}, 'primary');
    const errorColor = useThemeColor({}, 'error');
    const backgroundColor = useThemeColor({}, 'card');

    return (
        <DefaultView style={styles.container}>
            {label && (
                <Text style={[styles.label, { color: error ? errorColor : textColor }]}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    {
                        color: textColor,
                        backgroundColor,
                        borderColor: error ? errorColor : (isFocused ? primaryColor : borderColor),
                    },
                    style,
                ]}
                placeholderTextColor={placeholderColor}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && (
                <Text style={[styles.error, { color: errorColor }]}>
                    {error}
                </Text>
            )}
        </DefaultView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 6,
        marginLeft: 4,
    },
    input: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1.5,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});
