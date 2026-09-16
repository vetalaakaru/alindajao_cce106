import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { initialTasks } from '../(tabs)/index';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const taskData = initialTasks.find((t) => t.id === id);
  const [status, setStatus] = useState<'Pending' | 'Completed'>(
    taskData ? (taskData.status as 'Pending' | 'Completed') : 'Pending'
  );

  if (!taskData) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.notFoundTitle}>Task Not Found</Text>
          <Text style={styles.notFoundSubtitle}>No task matching ID: #{id}</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Return Back</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const isCompleted = status === 'Completed';

  const toggleStatus = () => {
    setStatus((prev) => (prev === 'Pending' ? 'Completed' : 'Pending'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Status Strip */}
        <View style={[styles.topStrip, isCompleted ? styles.stripCompleted : styles.stripPending]} />

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.subjectBadge}>{taskData.subject.toUpperCase()}</Text>
            <View style={[styles.statusBadge, isCompleted ? styles.badgeCompleted : styles.badgePending]}>
              <View style={[styles.dot, isCompleted ? styles.dotCompleted : styles.dotPending]} />
              <Text style={[styles.statusText, isCompleted ? styles.textCompleted : styles.textPending]}>
                {status}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{taskData.title}</Text>

          {/* Details Grid */}
          <View style={styles.metaContainer}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>DUE DATE</Text>
              <Text style={styles.metaValue}>📅 {taskData.dueDate}</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>TASK ID</Text>
              <Text style={styles.metaValue}>#{taskData.id}</Text>
            </View>
          </View>

          {/* Action Button */}
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              isCompleted ? styles.actionButtonCompleted : styles.actionButtonPending,
              pressed && styles.pressed,
            ]}
            onPress={toggleStatus}
          >
            <Text style={styles.actionButtonText}>
              {isCompleted ? '✓ Mark as Pending' : '✓ Mark as Completed'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  topStrip: {
    height: 6,
    width: '100%',
  },
  stripPending: {
    backgroundColor: '#6D28D9',
  },
  stripCompleted: {
    backgroundColor: '#16A34A',
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  subjectBadge: {
    color: '#7C3AED',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  badgeCompleted: {
    backgroundColor: '#F0FDF4',
  },
  badgePending: {
    backgroundColor: '#F5F3FF',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotCompleted: {
    backgroundColor: '#16A34A',
  },
  dotPending: {
    backgroundColor: '#7C3AED',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  textCompleted: {
    color: '#15803D',
  },
  textPending: {
    color: '#6D28D9',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  metaContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  actionButtonPending: {
    backgroundColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonCompleted: {
    backgroundColor: '#475569',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#EF4444',
    marginBottom: 6,
  },
  notFoundSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#64748B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
});