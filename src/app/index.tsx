import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getQuote = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://dummyjson.com/quotes/random'
      );

      if (!response.ok) {
        throw new Error('Failed to get quote');
      }

      const data = await response.json();

      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      setError('Unable to get a quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>QUOTE OF THE DAY</Text>

      <View style={styles.quoteBox}>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00AEEF"
          />
        ) : error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : (
          <>
            <Text style={styles.quote}>
              "{quote}"
            </Text>

            <Text style={styles.author}>
              — {author}
            </Text>
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={getQuote}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            NEW QUOTE
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F88379',
    marginBottom: 20,
  },

  quoteBox: {
    width: '100%',
    minHeight: 350,
    backgroundColor: '#FFD1DC',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quote: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 34,
  },

  author: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },

  error: {
    color: '#FF6B6B',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#F88379',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginTop: 35,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});