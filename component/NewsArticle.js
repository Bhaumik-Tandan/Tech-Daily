import React from 'react';
import { TouchableOpacity, Text, Image, Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const NewsArticle = ({ article }) => {
  const {
    title,
    description,
    url,
    urlToImage,
  } = article;
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SingleNewsPage", { url })}
      style={styles.container}
    >
      {urlToImage ? (
        <Image
          source={{ uri: urlToImage }}
          style={styles.image}
          resizeMode="cover"
        /> 
      ):
      <Image
      source={{uri:"https://awlights.com/wp-content/uploads/sites/31/2017/05/placeholder-news.jpg"}}
      style={styles.image}
      resizeMode='cover'
      />
      }
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd', // Add a border for separation
    borderBottomWidth: 1, // Border width
    padding: 10, // Add padding for spacing
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
  },
});

export default NewsArticle;
