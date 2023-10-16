import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import NewsArticle from '../component/NewsArticle';
import { API_URL } from "@env";

const apiUrl = API_URL + "/news";

const NewsList = ({ route }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const flatListRef = useRef();
  const isFetching = useRef(false);

  useEffect(() => {
    fetchNewsData();
  }, [page]);

  const fetchNewsData = () => {
    if (isFetching.current) {
      return;
    }

    isFetching.current = true;
    setLoading(true);

    fetch(`${apiUrl}?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          // No more articles to load
          setLoading(false);
          isFetching.current = false;
        } else {
          setArticles([...articles, ...data]);
          setLoading(false);
          isFetching.current = false;
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        isFetching.current = false;
      });
  };

  const loadMoreData = () => {
    setPage(page + 1);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <NewsArticle article={item} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      />
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default NewsList;
