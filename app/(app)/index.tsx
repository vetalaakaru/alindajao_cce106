```tsx
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  const { token, user } = useAuth();

  const userName = user?.name || user?.email || 'Student';

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>S</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.brand}>StudentHub</Text>
          <Text style={styles.eyebrow}>STUDENT SERVICE PORTAL</Text>
        </View>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>WELCOME BACK 👋</Text>

        <Text style={styles.title}>
          Hello, {userName}
        </Text>

        <Text style={styles.subtitle}>
          Everything you need for your student services, all in one place.
        </Text>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusIcon}>
          <Text style={styles.statusIconText}>✓</Text>
        </View>

        <View style={styles.statusContent}>
          <Text style={styles.statusTitle}>You're signed in</Text>

          <Text style={styles.statusText}>
            Your student account is active.
          </Text>
        </View>

        <View style={styles.statusDot} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>

        <Link href="/(app)/students" asChild>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>👥</Text>
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>View Students</Text>
              <Text style={styles.actionSubtitle}>
                Browse student information
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/(app)/profile" asChild>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>👤</Text>
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>My Profile</Text>
              <Text style={styles.actionSubtitle}>
                View your account details
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Student Information</Text>

          <View style={styles.blueBadge}>
            <Text style={styles.blueBadgeText}>STUDENT</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>👤</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>
              {user?.name || 'Not available'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>✉</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>
              {user?.email || 'Not available'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Text>★</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Account Role</Text>
            <Text style={styles.infoValue}>
              {user?.role || 'Student'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sessionCard}>
        <View style={styles.sessionIcon}>
          <Text style={styles.sessionIconText}>✓</Text>
        </View>

        <View style={styles.sessionContent}>
          <Text style={styles.sessionTitle}>Session Status</Text>

          <Text style={styles.sessionText}>
            {token ? 'Authenticated and secure' : 'Not Available'}
          </Text>
        </View>
      </View>

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
    backgroundColor: '#f2f5fa',
    overflow: 'hidden',
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#dce8f8',
    top: -150,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#e5edf7',
    bottom: -100,
    left: -120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#173f7a',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 6,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '800',
  },

  headerText: {
    marginLeft: 12,
  },

  brand: {
    color: '#17324d',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  eyebrow: {
    color: '#245bb2',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 2,
  },

  welcomeSection: {
    marginBottom: 20,
  },

  greeting: {
    color: '#245bb2',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 7,
  },

  title: {
    color: '#17324d',
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.7,
  },

  subtitle: {
    color: '#536579',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf4fc',
    borderWidth: 1,
    borderColor: '#d2e0f1',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },

  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusTitle: {
    color: '#17324d',
    fontSize: 14,
    fontWeight: '800',
  },

  statusText: {
    color: '#536579',
    fontSize: 12,
    marginTop: 3,
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#245bb2',
    marginRight: 4,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#49627d',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  cardTitle: {
    color: '#17324d',
    fontSize: 17,
    fontWeight: '800',
  },

  blueBadge: {
    backgroundColor: '#edf4fc',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  blueBadgeText: {
    color: '#245bb2',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.7,
  },

  actionButton: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafd',
    borderWidth: 1,
    borderColor: '#dce5ef',
    borderRadius: 17,
    padding: 12,
    marginBottom: 11,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#e5eef9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionIconText: {
    fontSize: 19,
  },

  actionContent: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    color: '#17324d',
    fontSize: 14,
    fontWeight: '800',
  },

  actionSubtitle: {
    color: '#6d7d8e',
    fontSize: 11,
    marginTop: 3,
  },

  arrow: {
    color: '#245bb2',
    fontSize: 28,
    fontWeight: '400',
    marginRight: 4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#edf4fc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    color: '#7c8b9a',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 3,
  },

  infoValue: {
    color: '#17324d',
    fontSize: 14,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#e7edf3',
    marginVertical: 5,
  },

  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 17,
    shadowColor: '#49627d',
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
    backgroundColor: '#245bb2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sessionIconText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },

  sessionContent: {
    marginLeft: 12,
  },

  sessionTitle: {
    color: '#17324d',
    fontSize: 14,
    fontWeight: '800',
  },

  sessionText: {
    color: '#536579',
    fontSize: 12,
    marginTop: 3,
  },

  footer: {
    color: '#8493a3',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 22,
  },
});
```
