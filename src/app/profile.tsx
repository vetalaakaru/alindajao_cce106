import { router } from "expo-router";
import { useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../../context/AuthContext";


export default function ProfileScreen() {
  const { user, token, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/");
    }
  }, [loading, token]);

  async function handleLogout() {
    await logout();

    router.replace("/");
  }

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Portal</Text>
        <Text style={styles.headerSubtitle}>
          Protected Profile
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.name.charAt(0)}
          </Text>
        </View>

        <Text style={styles.name}>{user.name}</Text>

        <Text style={styles.status}>
          ● Authenticated
        </Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Student ID</Text>
          <Text style={styles.value}>{user.studentId}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Session</Text>
          <Text style={styles.value}>Active</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Authorization</Text>
          <Text style={styles.value}>Bearer Token</Text>
        </View>
      </View>

      <View style={styles.protectedBox}>
        <Text style={styles.protectedTitle}>
          🔒 Protected Data
        </Text>

        <Text style={styles.protectedText}>
          This screen is only accessible when a valid
          authentication token exists.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 45,
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  headerSubtitle: {
    color: "#6B7280",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },

  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#111827",
  },

  status: {
    color: "#16A34A",
    marginTop: 6,
    fontWeight: "600",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  label: {
    color: "#6B7280",
  },

  value: {
    color: "#111827",
    fontWeight: "600",
  },

  protectedBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },

  protectedTitle: {
    color: "#047857",
    fontWeight: "bold",
    marginBottom: 5,
  },    

  protectedText: {
    color: "#065F46",
    lineHeight: 20,
  },

  logoutButton: {
    height: 52,
    backgroundColor: "#DC2626",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
