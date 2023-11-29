import React from 'react';
import { Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { calcHeight, getFontSizeByWindowWidth } from '../helper/res';

const Summary = ({ route }) => {
  const { summary } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={[styles.summaryText]}>{summary}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    padding: calcHeight(5),
  },
  summaryText: {
    color: '#333', 
    fontSize:getFontSizeByWindowWidth(15)
  },
});

export default Summary;
