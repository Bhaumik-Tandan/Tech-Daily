import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { calcHeight,calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import { API_URL } from "@env";
import Loader from '../component/Loader';
import { ClipboardPasteButton } from "expo-clipboard";
import * as Clipboard from "expo-clipboard";
import PAGES from '../utils/constants/pages';
import getClipBoard from '../helper/getClipBoard';
import { FontAwesome } from '@expo/vector-icons';

const apiUrl = API_URL + "/news/summarize";
const COPY_BUTTON_BACKGROUND_COLOR = "#F8F8F8";
const PRIMARY_COLOR = "#000";
const COPY_BUTTON_BORDER_RADIUS = calcWidth(2);

const isUrl = (url) => {
  return url.match(
    /^(ftp|http|https):\/\/[^ "]+$/
  );
}

const Summarizer = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const renderCopyButton = () => {
    if (Platform.OS === "android") {
      return (
        <TouchableOpacity
          onPress={async () => {
            try {
              const text = await getClipBoard();

              if (text) {
                isUrl(text)?setUrl(text):setText(text);
              } else {
                alert("Clipboard is empty");
              }
            } catch (error) {
              console.error("Error accessing clipboard:", error);
            }
          }}
          style={styles.copyButton}
        >
          <FontAwesome name="paste" size={24} color="black" />
        </TouchableOpacity>
      );
    } else if (Clipboard.isPasteButtonAvailable) {
      return (
        <ClipboardPasteButton
          style={styles.copyButtonIOS}
          onPress={async ({ text }) => {
            isUrl(text)?setUrl(text):setText(text);
          }}
          displayMode="iconOnly"
        />
      );
    }

    return null;
  };

  const handleSummarize = () => {
    if(!url && !text) 
    {
        alert('Please enter URL or Text');
        return;
    }
    setIsLoading(true);
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
        navigation.navigate(PAGES.SUMMARY,{summary:data.summary});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });


  };

  return isLoading?<Loader/>:(
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
      <TouchableOpacity style={[styles.button,{marginTop:calcHeight(2),backgroundColor:"red"}]} onPress={()=>{
          setText('');
          setUrl('');
      }}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <View style={styles.clipBoardContainer}>{renderCopyButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcWidth(5),
    flex: 1
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
  copyButton: {
    backgroundColor: COPY_BUTTON_BACKGROUND_COLOR,
    borderRadius: COPY_BUTTON_BORDER_RADIUS,
    marginHorizontal: calcWidth(2),
    paddingVertical: calcHeight(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: calcWidth(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: calcWidth(1),
    elevation: calcWidth(1),
  },
  copyButtonIOS: {
    height: calcHeight(8),
    width: calcWidth(15),
    marginHorizontal: calcWidth(2),
    alignSelf: "center",
    backgroundColor: PRIMARY_COLOR,
    foregroundColor: "#000",
  },
  clipBoardContainer: {
    position: "absolute",
    bottom: calcHeight(5),
    right: calcWidth(3),
    zIndex:5
  },
});

export default Summarizer;
