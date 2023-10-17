import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import NewsArticle from '../component/NewsArticle';
import { API_URL } from "@env";
import Loader from '../component/Loader';

const apiUrl = API_URL + "/news";

const NewsList = ({ route }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // New loading flag

  const flatListRef = useRef();

  const fetchNewsData = async () => {
    if (!hasMore || loading || isLoadingMore) {
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

  const loadMoreData = () => {
    if (!loading) {
      fetchNewsData(); // Load more data when reaching the end
    }
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={({ item,index }) => <NewsArticle article={item} index={index} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? <Loader /> : null}
      />
      {loading && !hasMore && (
        <Loader />
      )}
    </View>
  );
};

export default NewsList;
