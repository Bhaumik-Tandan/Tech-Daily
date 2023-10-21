import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from "@env";
import Loader from '../component/Loader';
import Constants from 'expo-constants';

const apiUrl = API_URL + "/news";
const window = Dimensions.get('window');


export default function App() {
    const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // New loading flag


  const fetchNewsData = async () => {
    if (!hasMore  || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const response = await fetch(`${apiUrl}?page=${page}`);
      const data = await response.json();

      console.log("Fetched page", page, "with", data.length, "articles.");

      if (data.length === 0) {
        setHasMore(false); // No more articles to load
      } else {
        setArticles((prev) => prev.concat(data));
        setPage((prev) => prev + 1); // Increment the page number
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {

    fetchNewsData();
  }, []);

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <View style={styles.newsCard}>
          <Image source={{ uri: item.image }} style={styles.newsImage} />
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsSummary}>{item.summary}</Text>
        </View>
      )}
      keyExtractor={(item) => item._id}
      pagingEnabled
      horizontal={false} // Set to true for vertical scrolling
      showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
      style={styles.container}
      onEndReached={fetchNewsData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isLoadingMore ? <Loader /> : null}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  newsCard: {
    height: window.height-Constants.statusBarHeight, // Occupies the entire screen's height
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  newsImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  newsSummary: {
    fontSize: 16,
    marginVertical: 10,
  },
});
