import { View } from 'react-native';

// This screen is never actually shown - the tab press is intercepted
// in _layout.tsx to navigate to /receipt/upload instead
export default function ScanScreen() {
    return <View />;
}
