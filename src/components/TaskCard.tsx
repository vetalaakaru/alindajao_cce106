import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

interface TaskCardProps {
  task: Task;
  onPress: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={styles.subjectText}>{task.subject.toUpperCase()}</Text>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>Due {task.dueDate}</Text>
      </View>
      <View style={[styles.badge, isCompleted ? styles.badgeCompleted : styles.badgePending]}>
        <View style={[styles.dot, isCompleted ? styles.dotCompleted : styles.dotPending]} />
        <Text style={[styles.badgeText, isCompleted ? styles.badgeTextCompleted : styles.badgeTextPending]}>
          {task.status}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  subjectText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeTextCompleted: {
    color: '#15803D',
  },
  badgeTextPending: {
    color: '#6D28D9',
  },
});