import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = (operator) => {
    // Validate empty or invalid input
    if (num1 === '' || num2 === '') {
      setError('Please enter both numeric values.');
      setResult(null);
      return;
    }

    const val1 = parseFloat(num1);
    const val2 = parseFloat(num2);

    if (isNaN(val1) || isNaN(val2)) {
      setError('Invalid input. Please enter numbers only.');
      setResult(null);
      return;
    }

    setError('');
    let res = 0;

    switch (operator) {
      case '+':
        res = val1 + val2;
        break;
      case '-':
        res = val1 - val2;
        break;
      case '*':
        res = val1 * val2;
        break;
      case '/':
        // Prevent division by zero and display a clear message
        if (val2 === 0) {
          setError('Cannot divide by zero!');
          setResult(null);
          return;
        }
        res = val1 / val2;
        break;
      default:
        return;
    }

    setResult(res);
  };

  const clearAll = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setError('');
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
            SIMPLE CALCULATOR
          </ThemedText>
          <HelloWave />
        </ThemedView>

        {/* Input Fields */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.label}>First Number:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter first number"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={num1}
            onChangeText={setNum1}
          />

          <ThemedText style={styles.label}>Second Number:</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter second number"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            value={num2}
            onChangeText={setNum2}
          />
        </ThemedView>

        {/* Operation Buttons */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.label}>Select Operation:</ThemedText>
          <View style={styles.row}>
            <TouchableOpacity style={styles.operatorButton} onPress={() => calculate('+')}>
              <ThemedText style={styles.operatorButtonText}>+</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operatorButton} onPress={() => calculate('-')}>
              <ThemedText style={styles.operatorButtonText}>-</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operatorButton} onPress={() => calculate('*')}>
              <ThemedText style={styles.operatorButtonText}>×</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operatorButton} onPress={() => calculate('/')}>
              <ThemedText style={styles.operatorButtonText}>÷</ThemedText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Result & Error Display */}
        <ThemedView style={styles.stepContainer}>
          <ThemedText style={styles.label}>Result:</ThemedText>
          <View style={styles.displayContainer}>
            {error ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : (
              <ThemedText style={styles.displayText}>
                {result !== null ? result : '0'}
              </ThemedText>
            )}
          </View>
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
    gap: 8,
    backgroundColor: '#F3E8FF',
    marginBottom: 10,
  },
  titleText: {
    color: '#7E22CE',
    fontWeight: 'bold',
    fontSize: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
    backgroundColor: '#E9D5FF',
    padding: 16,
    borderRadius: 16,
  },
  label: {
    color: '#581C87',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#D8B4FE',
    padding: 12,
    borderRadius: 10,
    color: '#581C87',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  operatorButton: {
    flex: 1,
    backgroundColor: '#A855F7',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operatorButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#C084FC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  displayContainer: {
    backgroundColor: '#FAF5FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8B4FE',
  },
  displayText: {
    color: '#581C87',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#DC2626',
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