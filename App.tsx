import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import words from './words.json';

const App = () => {
  const [index, setIndex] = useState(0);
  const [repeatFlag, setRepeatFlag] = useState(true);
  const [wordList, setWordList] = useState([...words]);
  const [gosterFlag, setGosterFlag] = useState(true);

  const handleKnown = () => {
    const updatedWords = [...wordList];
    updatedWords[index].known = true;

    setIndex(index + 1);

    const lastIndex = [...wordList].reverse().findIndex(word => !word.known);
    const lastFalseIndex = lastIndex !== -1 ? wordList.length - 1 - lastIndex : -1;

    if (index >= lastFalseIndex) {
      setIndex(0);
      const updatedUnknownWords = wordList.filter(word => !word.known);
      setWordList(updatedUnknownWords);
      if (wordList.filter(word => !word.known).length <= 0) {
        setRepeatFlag(false);
      }
    }
  };

  const handleUnknown = () => {
    setIndex(index + 1);
    setRepeatFlag(true);

    const lastIndex = [...wordList].reverse().findIndex(word => !word.known);
    const lastFalseIndex = lastIndex !== -1 ? wordList.length - 1 - lastIndex : -1;

    if (index >= lastFalseIndex) {
      setIndex(0);
      const updatedUnknownWords = wordList.filter(word => !word.known);
      setWordList(updatedUnknownWords);
    }
  };

  const handleGoster = () => {
    setGosterFlag(!gosterFlag);
  };
  
  const handleReset = () => {
    const updatedWordsData = words.map(word => ({
      ...word,
      known: false
    }));
    setWordList(updatedWordsData);
    setIndex(0);
    setRepeatFlag(true);
  };


  if (!repeatFlag) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sık Kullanılan Kelimeler</Text>
        <Text style={styles.message}>Tebrikler! Tüm kelimeleri öğrendiniz.</Text>
        <Button title="Tekrar Et" onPress={handleReset} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sık Kullanılan Kelimeler</Text>
        {gosterFlag ? (
          <View>
            <Text style={styles.word}>{index + 1}. Kelime: {wordList[index].word}</Text>
            <Text style={styles.translation}>Türkçe: {wordList[index].translation}</Text>
            <Button title="Biliyorum" onPress={handleKnown} />
            <Button title="Bilmiyorum" onPress={handleUnknown} />
            <Button title="Gösterme" onPress={handleGoster} />
          </View>
        ) : (
          <View>
            <Text style={styles.word}>{index + 1}. Kelime: {wordList[index].word}</Text>
            <Button title="Biliyorum" onPress={handleKnown} />
            <Button title="Bilmiyorum" onPress={handleUnknown} />
            <Button title="Göster" onPress={handleGoster} />
          </View>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#535353',
  },
  message: {
    fontSize: 18,
    color: '#666',
  },
  word: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666',
  },
  translation: {
    marginBottom: 20,
    color: '#666',
  },
});

export default App;