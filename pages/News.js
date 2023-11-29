// Import necessary modules
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { API_URL } from "@env";
import Loader from '../component/Loader';
import { calcHeight, calcWidth } from "../helper/res";
import * as WebBrowser from 'expo-web-browser';


const apiUrl = `${API_URL}/news`;


const News = ({ route }) => {
  const newsId = route?.params?.newsId;
  const [news, setNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${apiUrl}/${newsId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (!news || Object.keys(news).length === 0) {
    return <Text style={styles.noNewsText}>No news found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: news.image }} style={styles.image} />
      <TouchableOpacity
       onPress={() => {
        WebBrowser.openBrowserAsync(
          encodeURI(news.sourceURL),
      );}}
      >
      <Text style={styles.title}>{news.title}</Text>
      </TouchableOpacity>
      <Text style={styles.body}>{news.body}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: calcWidth(2), // 2% of screen width
  },
  image: {
    width: calcWidth(95),
    height: calcHeight(30), // 20% of screen height
    marginBottom: calcHeight(2), // 2% of screen height
  },
  title: {
    fontSize: calcWidth(4), // 4% of screen width
    fontWeight: 'bold',
    marginBottom: calcHeight(1), // 1% of screen height
  },
  body: {
    fontSize: calcWidth(3), // 3% of screen width
  },
  errorText: {
    color: 'red',
    fontSize: calcWidth(3), // 3% of screen width
    textAlign: 'center',
    padding: calcWidth(4), // 4% of screen width
  },
  noNewsText: {
    fontSize: calcWidth(3), // 3% of screen width
    textAlign: 'center',
    padding: calcWidth(4), // 4% of screen width
  },
});

export default News;
