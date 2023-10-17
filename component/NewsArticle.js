import React from 'react';
import { TouchableOpacity, Text, Image, Dimensions, StyleSheet, View,Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PAGES from '../utils/constants/pages';
import { AntDesign } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;

const NewsArticle = ({ article,index }) => {
  const {
    title,
    summary,
    sourceURL,
    image,
    _id
  } = article;
  const navigation = useNavigation()
  const ImageContainer=()=>(image ? (
    <Image
      source={{ uri: image }}
      style={styles.image}
      resizeMode="cover"
    /> 
  ):
  <Image
  source={{uri:"https://awlights.com/wp-content/uploads/sites/31/2017/05/placeholder-news.jpg"}}
  style={styles.image}
  resizeMode='cover'
  />);
  return (
    <View
    style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      position:'relative',
      borderColor: '#ddd', // Add a border for separation
      borderBottomWidth: 1, // Border width
      padding: 10, // Add padding for spacing
    }}
    >
      <ImageContainer/>
    <TouchableOpacity
      onPress={() => navigation.navigate(PAGES.SINGLE_NEWS_PAGE, { url: sourceURL })}
      style={styles.container}

    >

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{summary}</Text>  
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={async () => {
      await Share.share({
        message:
          `Check out this news: https://api-tech-daily.cyclic.app/link?redirect=news?id=${_id}`,
      })
}}>
  <AntDesign name="sharealt" size={30} color="rgba(0, 0, 0, 0.5)" />

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
    width: windowWidth / 3, // Adjust the width to your preference
    height: windowWidth / 4, // Adjust the height to your preference
    marginRight: 10, // Add margin for spacing
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18, // Adjust the font size to your preference
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14, // Adjust the font size to your preference
    color: '#666', // Adjust the color to your preference
    marginTop: 5, // Add margin for spacing
  }
});

export default NewsArticle;
