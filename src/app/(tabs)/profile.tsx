import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('Desiree Alindajao');
  const [program, setProgram] = useState('Information Technology');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    if (!fullName.trim()) {
      setError('Full name is required.');
      setSuccess(false);
      return;
    }
    setError('');
    setSuccess(true);

    router.push({
      pathname: '/(tabs)',
      params: { userName: fullName.trim() },
    });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('../../../assets/images/profile.png')}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.userName}>{fullName || 'Student'}</Text>
            <Text style={styles.userRole}>{program || 'Enrolled Student'}</Text>
          </View>

          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {success ? (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>✓ Profile saved successfully!</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'fullName' && styles.inputFocused,
              ]}
              value={fullName}
              onFocus={() => setFocusedInput('fullName')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={(val) => {
                setFullName(val);
                if (val.trim()) setError('');
              }}
              placeholder="Enter full name"
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.label}>PROGRAM / MAJOR</Text>
            <TextInput
              style={[
                styles.input,
                focusedInput === 'program' && styles.inputFocused,
              ]}
              value={program}
              onFocus={() => setFocusedInput('program')}
              onBlur={() => setFocusedInput(null)}
              onChangeText={setProgram}
              placeholder="Enter program"
              placeholderTextColor="#94A3B8"
            />

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.pressed,
                !fullName.trim() && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={!fullName.trim()}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#F3E8FF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  userRole: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
    color: '#64748B',
    letterSpacing: 0.8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 20,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    fontWeight: '600',
  },
  inputFocused: {
    borderColor: '#6D28D9',
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  successBanner: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  successText: {
    color: '#16A34A',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
});