import React, { useState, useEffect,useRef } from 'react';
import { View, FlatList, Button, ActivityIndicator, Text } from 'react-native';
import NewsArticle from '../component/NewsArticle';
import {API_URL} from "@env";



  const apiUrl = API_URL+"/news";
  const NewsList = ({route}) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    const flatListRef = useRef();
    const isFetching = useRef(false);

    useEffect(() => {
      fetchNewsData();
    }, [page]);
  
    const fetchNewsData = () => {
      if (isFetching.current || page > totalPages) {
        return;
      }
  
  
      isFetching.current = true;
      setLoading(true);
  
      fetch(`${apiUrl}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setArticles([...articles, ...data.articles]);
          setTotalPages(Math.ceil(data.totalResults / pageSize));
          setLoading(false);
          isFetching.current = false;
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          isFetching.current = false;
        });
    };
  
    const loadMoreData = () => {
      if (page < totalPages) {
        setPage(page + 1);
      }
    };
  
    return (
      <View>
        <FlatList
          ref={flatListRef}
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsArticle article={item} />}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
        {page < totalPages && (
          <Button title="Load More" onPress={loadMoreData} />
        )}
        {page === totalPages && (
          <Text>No more articles to load.</Text>
        )}
      </View>
    );
  };
  
  export default NewsList;
  
  
  
  
  
