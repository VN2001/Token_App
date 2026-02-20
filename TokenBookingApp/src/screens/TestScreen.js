import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TestScreen = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type here"
        autoFocus={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, fontSize: 16 },
});

export default TestScreen;