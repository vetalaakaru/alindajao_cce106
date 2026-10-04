import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SignInScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const testEmail = 'student@example.com';
      const testPassword = 'password123';

      if (
        email.trim().toLowerCase() !== testEmail ||
        password !== testPassword
      ) {
        throw new Error('Invalid email or password.');
      }

      const testUser = {
        id: 1,
        name: 'Student',
        email: testEmail,
        role: 'student',
      };

      const testToken = 'test-token-12345';

      await login(testToken, testUser);

      router.replace('/(app)');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>

        
      </View>

      <View style={styles.card}>
        <View style={styles.welcomeSection}>
          <Text style={styles.hello}>HELLO THERE !</Text>

          <Text style={styles.title}>Welcome back!</Text>

          <Text style={styles.subtitle}>
            Sign in to continue to your student portal.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email address</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>✉</Text>

            <TextInput
              style={styles.input}
              accessibilityLabel="Email"
              placeholder="Enter your email"
              placeholderTextColor="#8493a3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.label}>Password</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>●</Text>

            <TextInput
              style={styles.input}
              accessibilityLabel="Password"
              placeholder="Enter your password"
              placeholderTextColor="#8493a3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.feedback}>
            {loading && (
              <ActivityIndicator
                color="#245bb2"
                accessibilityLabel="Signing in"
              />
            )}

            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>

            {!loading && <Text style={styles.arrow}>→</Text>}
          </Pressable>
        </View>

      </View>

      <Text style={styles.footer}>
        Student Service Portal
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f5fa',
    overflow: 'hidden',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#dce8f8',
    top: -100,
    right: -90,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#e5edf7',
    bottom: -80,
    left: -100,
  },

  header: {
    alignItems: 'center',
    marginBottom: 22,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#17324d',
    letterSpacing: 0.5,
  },

  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 26,
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 8,
  },

  welcomeSection: {
    marginBottom: 26,
  },

  hello: {
    color: '#245bb2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  title: {
    color: '#17324d',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },

  subtitle: {
    color: '#6d7d8e',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  form: {
    width: '100%',
  },

  label: {
    color: '#536579',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 2,
  },

  inputContainer: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dce5ef',
    backgroundColor: '#f7f9fc',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  inputIcon: {
    color: '#245bb2',
    fontSize: 15,
    width: 25,
    textAlign: 'center',
  },

  input: {
    flex: 1,
    color: '#17324d',
    fontSize: 15,
    paddingVertical: 0,
    marginLeft: 5,
  },

  feedback: {
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  error: {
    width: '100%',
    color: '#b42318',
    fontSize: 13,
    textAlign: 'center',
  },

  button: {
    height: 56,
    backgroundColor: '#245bb2',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

  arrow: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: -2,
  },

  examText: {
    color: '#8493a3',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.8,
    marginTop: 24,
  },

  footer: {
    color: '#7c8b9a',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
