import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <View style={styles.card}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Smart City Guide</Text>
                </View>

                <Text style={styles.title}>Welcome to City Info</Text>

                <Text style={styles.subtitle}>
                    Discover places, updates, and local information in one simple app.
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                    activeOpacity={0.85}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    glowTop: {
        position: 'absolute',
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: 'rgba(56, 189, 248, 0.18)',
        top: -80,
        right: -80,
    },
    glowBottom: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(34, 197, 94, 0.14)',
        bottom: -90,
        left: -70,
    },
    card: {
        width: '100%',
        maxWidth: 420,
        backgroundColor: 'rgba(15, 23, 42, 0.88)',
        borderRadius: 28,
        paddingVertical: 36,
        paddingHorizontal: 26,
        borderWidth: 1,
        borderColor: 'rgba(148, 163, 184, 0.18)',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(56, 189, 248, 0.15)',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        marginBottom: 18,
    },
    badgeText: {
        color: '#7DD3FC',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    title: {
        color: '#F8FAFC',
        fontSize: 34,
        lineHeight: 40,
        fontWeight: '800',
        marginBottom: 14,
    },
    subtitle: {
        color: '#CBD5E1',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 28,
    },
    button: {
        backgroundColor: '#38BDF8',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});