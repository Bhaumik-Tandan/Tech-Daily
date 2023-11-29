import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { calcHeight,calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import { API_URL } from "@env";

const apiUrl = API_URL + "/news/summarize";

const Summarizer = () => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const handleSummarize = () => {
    if(!url && !text) 
    {
        alert('Please enter URL or Text');
        return;
    }
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.summary);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter URL:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(url) => setUrl(url)}
        value={url}
        placeholder="Enter URL"
      />

      <Text style={styles.orText}>or</Text>

      <Text style={styles.label}>Enter Text:</Text>
      <TextInput
        style={{...styles.input,height: calcHeight(20)}}
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder="Enter Text"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSummarize}>
        <Text style={styles.buttonText}>Summarize</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcWidth(5),
  },
  label: {
    fontSize: getFontSizeByWindowWidth(15),
    marginBottom: calcHeight(1),
  },
  input: {
    height: calcHeight(5),
    borderColor: 'gray',
    borderWidth: calcHeight(0.1),
    marginBottom: calcHeight(2),
    paddingHorizontal: calcWidth(2),
  },
  orText: {
    fontSize: getFontSizeByWindowWidth(15),
    marginBottom: calcHeight(1),
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: calcWidth(2),
    borderRadius: calcWidth(1),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: getFontSizeByWindowWidth(15),
    fontWeight: 'bold',
  },
});

export default Summarizer;
