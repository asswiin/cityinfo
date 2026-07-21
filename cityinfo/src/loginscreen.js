import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // loginscreen.js
const handleLogin = async () => {
  try {
    const response = await axios.post(
      'http://10.182.35.197:8000/api/login/',
      {
        username: username,
        password: password
      }
    );

    if (response.data.is_admin) {
      Alert.alert('Success', 'Welcome Admin!');
      // Navigate to Admin Dashboard
      navigation.navigate('AdminDashboard'); 
    } else {
      Alert.alert('Success', 'Login Successful');
      // Navigate to regular User Home Screen
      // navigation.navigate('Home'); 
    }

  } catch (error) {
    const errorMsg = error.response ? error.response.data.message : 'Cannot connect to server';
    Alert.alert('Error', errorMsg);
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Smart City Guide</Text>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to continue exploring local updates and city information.
          </Text>

          <Text style={styles.label}>Phone or Email</Text>
          <TextInput
            placeholder="Enter your phone number or email"
            placeholderTextColor="#94A3B8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.primaryButton}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.secondaryButton}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>
              Create a new account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    position: 'relative',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
    top: -80,
    right: -90,
  },
  glowBottom: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    bottom: -90,
    left: -70,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 28,
    paddingVertical: 34,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    shadowColor: '#000',
    shadowOpacity: 0.24,
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
    marginBottom: 12,
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    borderRadius: 16,
    color: '#F8FAFC',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  secondaryButton: {
    marginTop: 14,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.35)',
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  secondaryButtonText: {
    color: '#7DD3FC',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
});