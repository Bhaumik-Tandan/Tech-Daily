import Constants from 'expo-constants';
import { calcHeight, calcWidth,getFontSizeByWindowWidth } from '../helper/res';
import * as WebBrowser from 'expo-web-browser';
import BannerAd from '../component/BannerAd';
import getDomainName from '../helper/getDomain'; 
import { View, Text, Image, StyleSheet, TouchableOpacity,Pressable,Share } from 'react-native';
import { useState } from 'react';
import NewsMenu from './NewMenu';


function News({ item}) {
    const [showBanner, setShowBanner] = useState(true);
    
    return (
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
              <NewsMenu sourceUrl={item.sourceURL} />
            }
            </View>
        </View>
    )
}

export default News;

const styles = StyleSheet.create({
    newsCard: {
        height: calcHeight(100) - Constants.statusBarHeight,
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
      }
});