import { FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL } from "@env";
import Loader from '../component/Loader';

import News from '../component/News';

const apiUrl = API_URL + "/news";


export default function NewsList() {
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
        <News item={item} />
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
  }
});

