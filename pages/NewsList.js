import { View, Text, Image, FlatList, StyleSheet, Dimensions,TouchableOpacity,Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from "@env";
import Loader from '../component/Loader';
import Constants from 'expo-constants';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import * as WebBrowser from 'expo-web-browser';
import BannerAd from '../component/BannerAd';
import { AntDesign } from '@expo/vector-icons';
import getDomainName from '../helper/getDomain';

const apiUrl = API_URL + "/news";
const window = Dimensions.get('window');


export default function NewsList() {
    const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // New loading flag
  const [showBanner, setShowBanner] = useState(false);


  const fetchNewsData = async () => {
    if (!hasMore  || isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);

    try {
      const response = await fetch(`${apiUrl}?page=${page}`);
      const data = await response.json();

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
          <View style={{
            zIndex: 1,
            position: 'absolute',
            width: '100%',
          }}>
          {
            !showBanner && <BannerAd setShowBanner={setShowBanner} />
          }
          </View>
          <Pressable onPress={
            ()=>{
              setShowBanner((prev)=>!prev);
            }
          }>
          <Image source={{ uri: item.image }} style={styles.newsImage} />
          <View style={{margin: calcWidth(3)}}>
          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsSummary}>{item.summary}</Text>
          <Text style={styles.newsSource}>Source: {item.source || getDomainName(item.sourceURL) }</Text>
          </View>
          </Pressable>
            <TouchableOpacity style={styles.footer}
      onPress={() => {
        WebBrowser.openBrowserAsync(
          encodeURI(item.sourceURL),
      );
      }}>
        <Text style={{ color: 'white' }}>Tap to View Know More</Text>
            </TouchableOpacity>
            <View style={{
            zIndex: 1,
            position: 'absolute',
            width: '100%',
            bottom: 0,
          }}>
            {
              !showBanner && 
              <View style={styles.bottomMenu}>
              <Pressable>
                <AntDesign name="sharealt" size={calcHeight(3)} color="#f37736" />
                <Text>Share</Text>
                </Pressable>
                </View>
            }
            </View>
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
    height: window.height - Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  newsImage: {
    width: '100%',
    height: calcHeight(30),
  },
  newsTitle: {
    fontSize: getFontSizeByWindowWidth(13),
    fontWeight: 'bold',
    lineHeight: calcHeight(3),
  },
  newsSummary: {
    fontSize: getFontSizeByWindowWidth(12),
    marginVertical: 10,
    lineHeight: calcHeight(3),
  },
  newsSource: {
    fontSize: getFontSizeByWindowWidth(10), // Adjust the font size as needed
    color: 'gray', // You can change the color to suit your app's design
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: calcHeight(3),
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  bottomMenu: {
    paddingVertical: calcWidth(3),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

