import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export const initialTasks = [
  { id: '1', title: 'Calculus Homework', subject: 'Calculus', dueDate: '2026-03-30', status: 'Pending' },
  { id: '2', title: 'Web Design Activity', subject: 'IT 7', dueDate: '2026-03-28', status: 'Completed' },
  { id: '3', title: 'Read Essay Chapter 4', subject: 'UGE 1', dueDate: '2026-04-01', status: 'Pending' },
  { id: '4', title: 'Dance Video', subject: 'PAHF 4', dueDate: '2026-03-29', status: 'Completed' },
  { id: '5', title: 'Mobile Dev Project', subject: 'CCE 106', dueDate: '2026-04-05', status: 'Pending' },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const toggleTaskStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'Pending') return task.status === 'Pending';
    if (activeFilter === 'Completed') return task.status === 'Completed';
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {(['All', 'Pending', 'Completed'] as const).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              style={[styles.filterChip, isActive && styles.activeFilterChip]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeFilter.toLowerCase()} tasks found.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isDone = item.status === 'Completed';
          return (
            <View style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>
                  {item.title}
                </Text>
                <Text style={styles.taskSubtext}>
                  {item.subject} • Due {item.dueDate}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.statusButton,
                  isDone ? styles.completedButton : styles.pendingButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => toggleTaskStatus(item.id)}
              >
                <Text style={[styles.statusText, isDone ? styles.completedText : styles.pendingText]}>
                  {isDone ? '✓ Completed' : 'Mark Done'}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  activeFilterChip: {
    backgroundColor: '#5B21B6',
    borderColor: '#5B21B6',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskSubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 4,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  pendingButton: {
    backgroundColor: '#F3E8FF',
  },
  completedButton: {
    backgroundColor: '#DCFCE7',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  pendingText: {
    color: '#6D28D9',
  },
  completedText: {
    color: '#16A34A',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
});