import React, { useState } from 'react';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const genderOptions = ['Male', 'Female', 'Other'];
const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const validEmailDomains = ['@gmail.com', '@yahoo.com', '@outlook.com'];

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);

const isValidEmail = (value) => {
  const normalizedValue = value.trim().toLowerCase();

  return validEmailDomains.some((domain) => normalizedValue.endsWith(domain));
};

export default function UserDetailsForm({ navigation, route }) {
  const initialParams = route?.params || {};

  const [fullName, setFullName] = useState(initialParams.fullName || '');
  const [email, setEmail] = useState(initialParams.email || '');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(initialParams.phoneNumber || '');
  const [houseFlat, setHouseFlat] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [occupation, setOccupation] = useState('');
  const [educationQualification, setEducationQualification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    const requiredFields = [
      ['Full Name', fullName],
      ['Email', email],
      ['Date of Birth', dateOfBirth],
      ['Gender', gender],
      ['Phone Number', phoneNumber],
      ['House/Flat', houseFlat],
      ['Street', street],
      ['Town', town],
      ['District', district],
      ['State', state],
      ['Blood Group', bloodGroup],
      ['Occupation', occupation],
      ['Education Qualification', educationQualification],
    ];

    const missingField = requiredFields.find(([, value]) => !String(value).trim());

    if (missingField) {
      Alert.alert('Missing Information', `Please enter ${missingField[0].toLowerCase()}.`);
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Email must end with @gmail.com, @yahoo.com, or @outlook.com.');
      return;
    }

    if (!isValidPhone(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Phone number must start with 6, 7, 8, or 9 and contain exactly 10 digits.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        'http://172.20.10.5:8000/api/user-details/',
        {
          name: fullName,
          email: email,
          phone: phoneNumber,
          date_of_birth: dateOfBirth,
          gender: gender,
          house_flat: houseFlat,
          street: street,
          town: town,
          district: district,
          state: state,
          blood_group: bloodGroup,
          occupation: occupation,
          education_qualification: educationQualification,
        }
      );

      Alert.alert('Saved', response.data.message || 'Your details have been captured successfully.');
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', JSON.stringify(error.response.data));
      } else {
        Alert.alert('Error', 'Cannot connect to server');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDobChange = (event, selectedDate) => {
    if (Platform.OS !== 'ios') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDateOfBirth(formatDate(selectedDate));
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
            <Text style={styles.badgeText}>Profile Setup</Text>
          </View>

          <Text style={styles.title}>Tell us about you</Text>
          <Text style={styles.subtitle}>
            Complete the details below so your account can be personalized after login.
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setShowDatePicker(true)}
          >
            <TextInput
              placeholder="Tap to select date of birth"
              placeholderTextColor="#94A3B8"
              value={dateOfBirth}
              editable={false}
              pointerEvents="none"
              style={styles.input}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDobChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Gender</Text>
          <View style={styles.optionWrap}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionChip, gender === option && styles.optionChipActive]}
                onPress={() => setGender(option)}
                activeOpacity={0.85}
              >
                <Text style={[styles.optionText, gender === option && styles.optionTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Enter your phone number"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, '').slice(0, 10))}
            maxLength={10}
            style={styles.input}
          />

          <Text style={styles.label}>House / Flat</Text>
          <TextInput
            placeholder="Enter house name or flat number"
            placeholderTextColor="#94A3B8"
            value={houseFlat}
            onChangeText={setHouseFlat}
            style={styles.input}
          />

          <Text style={styles.label}>Street</Text>
          <TextInput
            placeholder="Enter street name"
            placeholderTextColor="#94A3B8"
            value={street}
            onChangeText={setStreet}
            style={styles.input}
          />

          <Text style={styles.label}>Town</Text>
          <TextInput
            placeholder="Enter town name"
            placeholderTextColor="#94A3B8"
            value={town}
            onChangeText={setTown}
            style={styles.input}
          />

          <Text style={styles.label}>District</Text>
          <TextInput
            placeholder="Enter your district"
            placeholderTextColor="#94A3B8"
            value={district}
            onChangeText={setDistrict}
            style={styles.input}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            placeholder="Enter your state"
            placeholderTextColor="#94A3B8"
            value={state}
            onChangeText={setState}
            style={styles.input}
          />

          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.bloodGrid}>
            {bloodGroupOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.bloodChip, bloodGroup === option && styles.bloodChipActive]}
                onPress={() => setBloodGroup(option)}
                activeOpacity={0.85}
              >
                <Text style={[styles.bloodText, bloodGroup === option && styles.bloodTextActive]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Occupation</Text>
          <TextInput
            placeholder="Enter your occupation"
            placeholderTextColor="#94A3B8"
            value={occupation}
            onChangeText={setOccupation}
            style={styles.input}
          />

          <Text style={styles.label}>Education Qualification</Text>
          <TextInput
            placeholder="Enter education qualification if any"
            placeholderTextColor="#94A3B8"
            value={educationQualification}
            onChangeText={setEducationQualification}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.primaryButton}
            disabled={isSubmitting}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>{isSubmitting ? 'Saving...' : 'Submit Details'}</Text>
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
    maxWidth: 500,
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
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
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
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
  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  optionChip: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
  },
  optionChipActive: {
    backgroundColor: 'rgba(56, 189, 248, 0.18)',
    borderColor: 'rgba(125, 211, 252, 0.6)',
  },
  optionText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '700',
  },
  optionTextActive: {
    color: '#7DD3FC',
  },
  bloodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  bloodChip: {
    minWidth: '22%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
  },
  bloodChipActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
    borderColor: 'rgba(74, 222, 128, 0.65)',
  },
  bloodText: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '800',
  },
  bloodTextActive: {
    color: '#86EFAC',
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
});