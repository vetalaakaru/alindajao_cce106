import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

type Profile = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

// Defined inline so no external file import is required
const Theme = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
  },
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Theme[colorScheme];
  const isDark = colorScheme === 'dark';

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

  // Dynamic theme variables
  const dynamicStyles = {
    container: { backgroundColor: colors.background },
    textPrimary: { color: colors.text },
    textSecondary: { color: colors.icon },
    cardBackground: {
      backgroundColor: isDark ? '#1E2022' : '#ffffff',
      borderColor: isDark ? '#2A2D2F' : 'transparent',
      borderWidth: isDark ? 1 : 0,
    },
    badgeBackground: {
      backgroundColor: isDark ? '#1C2E36' : '#E6F4F8',
    },
    divider: {
      backgroundColor: isDark ? '#2D3135' : '#F0F0F0',
    },
    errorCard: {
      backgroundColor: isDark ? '#2A1A1D' : '#FFF1F4',
      borderColor: isDark ? '#5C2229' : '#F5CCD9',
    },
    logoutButton: {
      backgroundColor: isDark ? '#1E2022' : '#ffffff',
      borderColor: isDark ? '#3A3D40' : '#E0E0E0',
    },
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, dynamicStyles.container]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.backgroundCircleOne,
          { backgroundColor: isDark ? '#1E293B' : '#E6F4F8' },
        ]}
      />
      <View
        style={[
          styles.backgroundCircleTwo,
          { backgroundColor: isDark ? '#111827' : '#F0F9FF' },
        ]}
      />

      <View style={styles.header}>
        <View style={[styles.logo, { backgroundColor: colors.tint }]}>
          <Text style={styles.logoText}>
            {displayName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={[styles.headerTitle, dynamicStyles.textPrimary]}>
          My Profile
        </Text>

        <Text style={[styles.headerSubtitle, dynamicStyles.textSecondary]}>
          Manage your student account
        </Text>
      </View>

      {loading && (
        <View style={[styles.loadingCard, dynamicStyles.cardBackground]}>
          <ActivityIndicator size="large" color={colors.tint} />

          <Text style={[styles.loadingTitle, dynamicStyles.textPrimary]}>
            Loading profile...
          </Text>

          <Text style={[styles.loadingText, dynamicStyles.textSecondary]}>
            Please wait while we get your information.
          </Text>
        </View>
      )}

      {error ? (
        <View style={[styles.errorCard, dynamicStyles.errorCard]}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>!</Text>
          </View>

          <View style={styles.errorContent}>
            <Text style={[styles.errorTitle, dynamicStyles.textPrimary]}>
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
        <View style={[styles.emptyCard, dynamicStyles.cardBackground]}>
          <Text style={[styles.emptyIcon, { color: colors.tint }]}>○</Text>

          <Text style={[styles.emptyTitle, dynamicStyles.textPrimary]}>
            No profile loaded
          </Text>

          <Text style={[styles.emptyText, dynamicStyles.textSecondary]}>
            We couldn't find your profile information.
          </Text>
        </View>
      )}

      {!loading && !error && profile && (
        <>
          <View style={[styles.profileCard, dynamicStyles.cardBackground]}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <Text style={styles.avatarText}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>

            <Text style={[styles.profileName, dynamicStyles.textPrimary]}>
              {displayName}
            </Text>

            <Text style={[styles.profileEmail, dynamicStyles.textSecondary]}>
              {displayEmail}
            </Text>

            <View
              style={[
                styles.roleBadge,
                dynamicStyles.badgeBackground,
              ]}
            >
              <Text style={[styles.roleBadgeText, { color: colors.tint }]}>
                {displayRole.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, dynamicStyles.cardBackground]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, dynamicStyles.textPrimary]}>
                Account Information
              </Text>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, dynamicStyles.badgeBackground]}>
                <Text style={[styles.infoIconText, { color: colors.tint }]}>
                  👤
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, dynamicStyles.textSecondary]}>
                  Full Name
                </Text>

                <Text style={[styles.infoValue, dynamicStyles.textPrimary]}>
                  {displayName}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, dynamicStyles.badgeBackground]}>
                <Text style={[styles.infoIconText, { color: colors.tint }]}>
                  ✉
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, dynamicStyles.textSecondary]}>
                  Email Address
                </Text>

                <Text style={[styles.infoValue, dynamicStyles.textPrimary]}>
                  {displayEmail}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, dynamicStyles.badgeBackground]}>
                <Text style={[styles.infoIconText, { color: colors.tint }]}>
                  ★
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, dynamicStyles.textSecondary]}>
                  Account Role
                </Text>

                <Text style={[styles.infoValue, dynamicStyles.textPrimary]}>
                  {displayRole}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, dynamicStyles.badgeBackground]}>
                <Text style={[styles.infoIconText, { color: colors.tint }]}>
                  #
                </Text>
              </View>

              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, dynamicStyles.textSecondary]}>
                  Student ID
                </Text>

                <Text style={[styles.infoValue, dynamicStyles.textPrimary]}>
                  {profile.id || 'Not available'}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}

      <View style={[styles.sessionCard, dynamicStyles.cardBackground]}>
        <View style={[styles.sessionIcon, { backgroundColor: colors.tint }]}>
          <Text style={styles.sessionIconText}>✓</Text>
        </View>

        <View style={styles.sessionContent}>
          <Text style={[styles.sessionTitle, dynamicStyles.textPrimary]}>
            Session Status
          </Text>

          <Text style={[styles.sessionText, dynamicStyles.textSecondary]}>
            {token
              ? 'Your account is authenticated'
              : 'You are not authenticated'}
          </Text>
        </View>

        <View
          style={[
            styles.sessionDot,
            { backgroundColor: colors.tint },
            !token && styles.sessionDotInactive,
          ]}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.logoutButton,
          dynamicStyles.logoutButton,
          pressed && styles.logoutPressed,
        ]}
        onPress={logout}
        disabled={!token}
      >
        <Text style={[styles.logoutIcon, { color: colors.tint }]}>↪</Text>

        <Text style={[styles.logoutText, { color: colors.tint }]}>
          Log Out
        </Text>
      </Pressable>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 35,
    paddingBottom: 40,
    overflow: 'hidden',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: -150,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '800',
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
  },

  headerSubtitle: {
    fontSize: 13,
    marginTop: 5,
  },

  loadingCard: {
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  loadingTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 15,
  },

  loadingText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },

  errorIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#E53E3E',
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
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 3,
  },

  error: {
    color: '#E53E3E',
    fontSize: 12,
    lineHeight: 17,
  },

  emptyCard: {
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 18,
  },

  emptyIcon: {
    fontSize: 38,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 8,
  },

  emptyText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  profileCard: {
    borderRadius: 26,
    padding: 26,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  avatarText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
  },

  profileName: {
    fontSize: 21,
    fontWeight: '800',
  },

  profileEmail: {
    fontSize: 13,
    marginTop: 4,
  },

  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 12,
  },

  roleBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },

  infoCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  cardHeader: {
    marginBottom: 14,
  },

  cardTitle: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoIconText: {
    fontSize: 16,
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    marginVertical: 5,
  },

  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  sessionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
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
    fontSize: 14,
    fontWeight: '800',
  },

  sessionText: {
    fontSize: 12,
    marginTop: 3,
  },

  sessionDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 4,
  },

  sessionDotInactive: {
    backgroundColor: '#8E8E93',
  },

  logoutButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
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
    fontSize: 20,
    marginRight: 8,
    fontWeight: '700',
  },

  logoutText: {
    fontSize: 14,
    fontWeight: '800',
  },

  footer: {
    fontSize: 11,
    textAlign: 'center',
  },
});