import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen({ incrementBy = 1 }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + incrementBy);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.pageBackground}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: '#D8B4FE', light: '#D8B4FE' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>

        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>
            COUNTER APP 🌸
          </ThemedText>
        </ThemedView>

        {/* Display the current counter value safely */}
        <ThemedView style={styles.displayContainer}>
          <ThemedText style={styles.label}>Current Count:</ThemedText>
          <View style={styles.numberWrapper}>
            <ThemedText style={styles.displayText}>
              {count}
            </ThemedText>
          </View>
        </ThemedView>

        {/* Control Buttons */}
        <ThemedView style={styles.stepContainer}>
          <TouchableOpacity style={styles.controlButton} onPress={handleIncrement}>
            <ThemedText style={styles.buttonText}>+ {incrementBy}</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <ThemedText style={styles.resetButtonText}>Reset</ThemedText>
          </TouchableOpacity>
        </ThemedView>

      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageBackground: {
    flex: 1,
    backgroundColor: '#F3E8FF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D8B4FE',
  },
  titleText: {
    color: '#7E22CE',
    fontWeight: 'bold',
    fontSize: 22,
  },
  displayContainer: {
    backgroundColor: '#FAF5FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D8B4FE',
  },
  label: {
    color: '#581C87',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  numberWrapper: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: '#7E22CE',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  stepContainer: {
    gap: 10,
    marginBottom: 12,
    backgroundColor: '#E9D5FF',
    padding: 16,
    borderRadius: 16,
  },
  controlButton: {
    backgroundColor: '#A855F7',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#7E22CE',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 250,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});