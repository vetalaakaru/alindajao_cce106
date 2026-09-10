import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MetricCard = ({ title, value }) => (
  <View style={styles.gridCard}>
    <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
    <Text style={styles.cardValue}>₱{value}</Text>
  </View>
);

const ActivityItem = ({ title, amount, isLast }) => (
  <View style={[styles.item, isLast && styles.itemLast]}>
    <View style={styles.itemLeft}>
      <View style={styles.dot} />
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    <Text style={styles.itemAmount}>-₱{amount}</Text>
  </View>
);

export default function App() {
  const metricData = [
    { id: '1', title: 'Transportation (₱80/day)', value: '560.00' },
    { id: '2', title: 'Food (₱50/day)', value: '350.00' },
    { id: '3', title: 'Entertainment', value: '50.00' },
    { id: '4', title: 'Total Estimated', value: '960.00' },
  ];

  const recentActivity = [
    { id: '1', title: 'Motor Fare', amount: '80.00' },
    { id: '2', title: 'Lunch & Snacks', amount: '50.00' },
    { id: '3', title: 'Entertainment / Comshop', amount: '50.00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.profile} activeOpacity={0.7}>
              <Text style={styles.profileText}>DA</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Welcome Back</Text>
              <Text style={styles.title}>Weekly Budget</Text>
            </View>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>Total Budget</Text>
              <Text style={styles.heroAmount}>₱1,000.00</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.heroSub}>Allocated: ₱960.00 / week</Text>
        </View>

        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <View style={styles.gridContainer}>
          {metricData.map((item) => (
            <MetricCard key={item.id} title={item.title} value={item.value} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Daily Expenses Log</Text>
        <View style={styles.list}>
          {recentActivity.map((item, index) => (
            <ActivityItem
              key={item.id}
              title={item.title}
              amount={item.amount}
              isLast={index === recentActivity.length - 1}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F8',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 12,
    color: '#9D174D',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#831843',
  },
  profile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EC4899',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroCard: {
    backgroundColor: '#831843',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroLabel: {
    color: '#FBCFE8',
    fontSize: 13,
  },
  heroAmount: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  heroSub: {
    color: '#FCE7F3',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#831843',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  gridCard: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 14,
    width: '48%',
    borderWidth: 1,
    borderColor: '#FBCFE8',
    justifyContent: 'space-between',
    minHeight: 90,
  },
  cardTitle: {
    fontSize: 13,
    color: '#9D174D',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
    marginTop: 8,
  },
  list: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  itemLast: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC4899',
  },
  itemTitle: {
    fontSize: 14,
    color: '#831843',
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#BE185D',
  },
});