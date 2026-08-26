import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <View style={styles.pageBackground}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#F8C8DC', light: '#F8C8DC' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>
            ABOUT ME
          </ThemedText>
          <HelloWave />
        </ThemedView>

        
        <View style={styles.avatarWrapper}>
          <Image
            source={require('@/assets/images/profile.jpg')}
            style={styles.avatar}
          />
        </View>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="defaultSemiBold" style={styles.bodyText}>
            Name: Desiree S. Alindajao
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.bodyText}>
            Course/Section: BSIT - CCE 106
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.bodyText}>
            Hobbies: Playing Online Games and Singing
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.headingText}>
            SHORT APP IDEA
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            "I want to create a UTANG TRACKER APP for small sari-sari stores to replace manual record-keeping and make store owners' lives easier and more efficient.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#F8C8DC',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: '#daaebc',
    padding: 12,
    borderRadius: 12,
  },
  titleText: {
    color: '#bb9595',
    fontWeight: 'bold',
    fontSize: 28,
  },
  headingText: {
    color: '#7A3B54',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bodyText: {
    color: '#4A2C3A',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  reactLogo: {
    height: 250,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});