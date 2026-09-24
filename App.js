import { Feather, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, loginUser } from './src/services/authService';
import { deleteToken, getToken, saveToken } from './src/storage/tokenStorage';

export default function App() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          const userProfile = await getCurrentUser(storedToken);
          setProfile(userProfile);
        }
      } catch (err) {
        await deleteToken();
        setError('Session expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function handleLogin() {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);
      await saveToken(data.accessToken);

      const userProfile = await getCurrentUser(data.accessToken);
      setProfile(userProfile);
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  const performLogout = async () => {
    await deleteToken();
    setProfile(null);
    setError('');
    setUsername('');
    setPassword('');
    setShowPassword(false);
  };

  function handleLogout() {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: performLogout,
        },
      ],
      { cancelable: true }
    );
  }

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0A3A52" />
          <Text style={styles.loadingText}>Loading session...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (profile) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.appTitle}>Secure Profile</Text>
          <View style={styles.cardContainer}>
            <View style={styles.avatarBadge}>
              {profile.image ? (
                <Image source={{ uri: profile.image }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={50} color="#0A3A52" />
              )}
            </View>

            <View style={styles.profileContent}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{profile.firstName} {profile.lastName}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Username:</Text>
                <Text style={styles.infoValue}>{profile.username}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>ID:</Text>
                <Text style={styles.infoValue}>{profile.id}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.logoutBannerButton} onPress={handleLogout}>
              <Text style={styles.loginBannerText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.appTitle}>Secure Profile</Text>
        <View style={styles.cardContainer}>
          <View style={styles.avatarBadge}>
            <Ionicons name="person" size={54} color="#5A889B" />
          </View>

          <View style={styles.formContent}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.pillInputContainer}>
              <View style={styles.iconCircle}>
                <Feather name="mail" size={16} color="#FFFFFF" />
              </View>
              <TextInput
                style={styles.pillInput}
                placeholder="Username"
                placeholderTextColor="#B0C4DE"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.pillInputContainer}>
              <View style={styles.iconCircle}>
                <Feather name="lock" size={16} color="#FFFFFF" />
              </View>
              <TextInput
                style={styles.pillInput}
                placeholder="Password"
                placeholderTextColor="#B0C4DE"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBannerButton} onPress={handleLogin}>
            <Text style={styles.loginBannerText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A3A52',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  avatarBadge: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#0A3A52',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -55,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  formContent: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  profileContent: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A3A52',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 6,
  },
  infoLabel: {
    fontWeight: '600',
    color: '#5A889B',
    fontSize: 14,
  },
  infoValue: {
    fontWeight: '500',
    color: '#0A3A52',
    fontSize: 14,
  },
  pillInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A889B',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 14,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0A3A52',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pillInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  eyeToggle: {
    padding: 6,
  },
  loginBannerButton: {
    width: '100%',
    backgroundColor: '#0A3A52',
    height: 55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBannerButton: {
    width: '100%',
    backgroundColor: '#C53030',
    height: 55,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBannerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#0A3A52',
  },
  errorText: {
    color: '#D9534F',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
});