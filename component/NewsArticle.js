import React from 'react';
import { TouchableOpacity, Text, Image, Dimensions, StyleSheet, View,Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../utils/constants/pages';
import { AntDesign } from '@expo/vector-icons';
import {calcWidth,calcHeight,getFontSizeByWindowWidth} from '../helper/res';

const NewsArticle = ({ article,index }) => {
  const {
    title,
    summary,
    sourceURL,
    image,
    _id
  } = article;
  const isEven=index%2===0;
  const navigation = useNavigation()
  const ImageContainer=()=>(image && (
    <Image
      source={{ uri: image }}
      style={styles.image}
      resizeMode="cover"
    /> 
  ));
  return (
    <View
    style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      position:'relative',
      borderColor: '#ddd', // Add a border for separation
      borderBottomWidth: 3, // Border width
      padding: 10, // Add padding for spacing
      backgroundColor: isEven?'#e7eff6':'#faf0e6', // White background color for the title,
    }}
    >
    <TouchableOpacity onPress={() => navigation.navigate(PAGES.SINGLE_NEWS_PAGE, { url: sourceURL })}>
      <ImageContainer/>
    <View
      style={styles.container}

    >

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{summary}</Text>  
      </View>
    </View>
  
      <View
      style={{
        marginLeft:"auto",
      }}
      >
    <TouchableOpacity  
    onPress={async () => {
      await Share.share({
        message:
          `Check out this news: https://api-tech-daily.cyclic.app/link?redirect=news?id=${_id}`,
      })
}}>
  <AntDesign name="sharealt" size={20} color="#f37736" />

    </TouchableOpacity>
    </View>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: calcWidth(100),
    height: calcHeight(30),
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: calcWidth(3),
    marginTop: calcHeight(1),
  },
  title: {
    fontSize: 18, // Adjust the font size to your preference
    fontWeight: 'bold',
  },
  description: {
    fontSize: getFontSizeByWindowWidth(18), // Adjust the font size to your preference
    color: '#666', // Adjust the color to your preference
    marginTop: 5, // Add margin for spacing
  }
});

export default NewsArticle;
