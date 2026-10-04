import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Profile = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

export default function ProfileScreen() {
  const { user, token, logout } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    setLoading(true);
    setError('');

    try {
      if (!token || !user) {
        setProfile(null);
        setError('You are not authenticated.');
        return;
      }

      setProfile(user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong while loading your profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [token, user]);

  const displayName = profile?.name || user?.name || 'Student';
  const displayEmail =
    profile?.email || user?.email || 'No email available';
  const displayRole = profile?.role || user?.role || 'Student';

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.headerTitle}>My Profile</Text>

        <Text style={styles.headerSubtitle}>
          Manage your student account
        </Text>
      </View>

      {loading && (
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#e85d9e" />

          <Text style={styles.loadingTitle}>
            Loading profile...
          </Text>

          <Text style={styles.loadingText}>
            Please wait while we get your information.
          </Text>
        </View>
      )}

      {error ? (
        <View style={styles.errorCard}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>!</Text>
          </View>

          <View style={styles.errorContent}>
            <Text style={styles.errorTitle}>
              Something went wrong
            </Text>

            <Text
              style={styles.error}
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          </View>
        </View>
      ) : null}

      {!loading && !error && !profile && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>○</Text>

          <Text style={styles.emptyTitle}>
            No profile loaded
          </Text>

          <Text style={styles.emptyText}>
            We couldn't find your profile information.
          </Text>
        </View>
      )}

      {!loading && !error && profile && (
        <>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>

            <Text style={styles.profileName}>
              {displayName}
            </Text>

            <Text style={styles.profileEmail}>
              {displayEmail}
            </Text>

            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {displayRole.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                Account Information
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>👤</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Full Name
                </Text>

                <Text style={styles.infoValue}>
                  {displayName}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>✉</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Email Address
                </Text>

                <Text style={styles.infoValue}>
                  {displayEmail}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>★</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Account Role
                </Text>

                <Text style={styles.infoValue}>
                  {displayRole}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Text style={styles.infoIconText}>#</Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                  Student ID
                </Text>

                <Text style={styles.infoValue}>
                  {profile.id || 'Not available'}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.sessionCard}>
        <View style={styles.sessionIcon}>
          <Text style={styles.sessionIconText}>
            ✓
          </Text>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.sessionTitle}>
            Session Status
          </Text>

          <Text style={styles.sessionText}>
            {token
              ? 'Your account is authenticated'
              : 'You are not authenticated'}
          </Text>
        </View>

        <View
          style={[
            styles.sessionDot,
            !token && styles.sessionDotInactive,
          ]}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.logoutPressed,
        ]}
        onPress={logout}
        disabled={!token}
      >
        <Text style={styles.logoutIcon}>↪</Text>

        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </Pressable>

      <Text style={styles.footer}>
        StudentHub • Student Service Portal
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 35,
    paddingBottom: 40,
    backgroundColor: '#fff4f8',
    overflow: 'hidden',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#ffd8e9',
    top: -150,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#fce1ed',
    bottom: -100,
    left: -120,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: '#e85d9e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#d94f8e',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.23,
    shadowRadius: 12,
    elevation: 7,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  headerTitle: {
    color: '#3b2631',
    fontSize: 28,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#8b7480',
    fontSize: 13,
    marginTop: 5,
  },

  loadingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#b84d7f',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },

  loadingTitle: {
    color: '#49313d',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 15,
  },

  loadingText: {
    color: '#9b7f8c',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff1f4',
    borderWidth: 1,
    borderColor: '#f5ccd9',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },

  errorIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#e85d9e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorIconText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },

  errorContent: {
    flex: 1,
    marginLeft: 12,
  },

  errorTitle: {
    color: '#49313d',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  error: {
    color: '#b84d6f',
    fontSize: 12,
    lineHeight: 17,
  },

  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 18,
  },

  emptyIcon: {
    color: '#e85d9e',
    fontSize: 38,
  },

  emptyTitle: {
    color: '#49313d',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },

  emptyText: {
    color: '#9b7f8c',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    padding: 26,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#b84d7f',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: 30,
    backgroundColor: '#e85d9e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
    shadowColor: '#d94f8e',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
  },

  profileName: {
    color: '#3b2631',
    fontSize: 21,
    fontWeight: '800',
  },

  profileEmail: {
    color: '#927b87',
    fontSize: 13,
    marginTop: 4,
  },

  roleBadge: {
    backgroundColor: '#fff0f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
  },

  roleBadgeText: {
    color: '#e85d9e',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#b84d7f',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.08,
    shadowRadius: 17,
    elevation: 5,
  },

  cardHeader: {
    marginBottom: 14,
  },

  cardTitle: {
    color: '#3b2631',
    fontSize: 17,
    fontWeight: '800',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#fff0f6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoIconText: {
    fontSize: 16,
    color: '#e85d9e',
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    color: '#a08792',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 3,
  },

  infoValue: {
    color: '#49313d',
    fontSize: 14,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#f5e8ee',
    marginVertical: 5,
  },

  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
    shadowColor: '#b84d7f',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  sessionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#e85d9e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sessionIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  sessionContent: {
    flex: 1,
    marginLeft: 12,
  },

  sessionTitle: {
    color: '#49313d',
    fontSize: 14,
    fontWeight: '800',
  },

  sessionText: {
    color: '#8b7480',
    fontSize: 12,
    marginTop: 3,
  },

  sessionDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#e85d9e',
    marginRight: 4,
  },

  sessionDotInactive: {
    backgroundColor: '#d8c5ce',
  },

  logoutButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0cbdc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logoutPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },

  logoutIcon: {
    color: '#d94f8e',
    fontSize: 20,
    marginRight: 8,
    fontWeight: '700',
  },

  logoutText: {
    color: '#d94f8e',
    fontSize: 14,
    fontWeight: '800',
  },

  footer: {
    color: '#b08c9d',
    fontSize: 11,
    textAlign: 'center',
  },
});