import { Link, useGlobalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { StatCard } from '../../components/StatCard';

export const initialTasks = [
  { id: '1', title: 'Calculus Homework', subject: 'Calculus', dueDate: '2026-03-30', status: 'Pending' },
  { id: '2', title: 'Web Design Activity', subject: 'IT 7', dueDate: '2026-03-28', status: 'Completed' },
  { id: '3', title: 'Read Essay Chapter 4', subject: 'UGE 1', dueDate: '2026-04-01', status: 'Pending' },
  { id: '4', title: 'Dance Video', subject: 'PAHF 4', dueDate: '2026-03-29', status: 'Completed' },
  { id: '5', title: 'Mobile Dev Project', subject: 'CCE 106', dueDate: '2026-04-05', status: 'Pending' },
];

export default function DashboardScreen() {
  const { userName } = useGlobalSearchParams<{ userName?: string }>();
  const displayName = userName ? userName.trim() : 'Desiree Alindajao';

  const total = initialTasks.length;
  const completed = initialTasks.filter((t) => t.status === 'Completed').length;
  const pending = initialTasks.filter((t) => t.status === 'Pending').length;

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.welcomeSubtitle}>STUDYFLOW PLANNER</Text>
        <Text style={styles.welcomeTitle}>Welcome, {displayName}! 👋</Text>
        <Text style={styles.welcomeDescription}>You have {pending} pending tasks for this week.</Text>
      </View>

      <Text style={styles.sectionHeader}>Overview</Text>
      <View style={styles.statsRow}>
        <StatCard label="Total" value={total} />
        <StatCard label="Completed" value={completed} />
        <StatCard label="Pending" value={pending} />
      </View>

      <Text style={styles.sectionHeader}>Quick Actions</Text>
      <Link href="/(tabs)/tasks" style={styles.linkButton}>
        <Text style={styles.buttonText}>Browse All Tasks →</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  headerBanner: {
    backgroundColor: '#5B21B6',
    padding: 24,
    borderRadius: 20,
    marginBottom: 28,
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  welcomeSubtitle: {
    color: '#DDD6FE',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  welcomeDescription: {
    fontSize: 13,
    color: '#E9D5FF',
    marginTop: 6,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 28,
  },
  linkButton: {
    backgroundColor: '#6D28D9',
    paddingVertical: 16,
    borderRadius: 14,
    textAlign: 'center',
    overflow: 'hidden',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});