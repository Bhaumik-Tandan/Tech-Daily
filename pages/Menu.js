import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from "../helper/res";
import PAGES from "../utils/constants/pages";

function Menu({ navigation }) {
  const menuItems = [
    {
      title: 'Summarizer',
      icon: <MaterialIcons name="short-text" size={calcHeight(4)} color="black" />,
      onPress: () => {
        navigation.navigate(PAGES.SUMMARIZER);
      },
    },
    {
      title: 'Contact Us',
      icon: <MaterialIcons name="email" size={calcHeight(4)} color="black" />,
      onPress: () => {
        alert('pivot.it.bhaumik@gmail.com');
      },
    },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} onPress={item.onPress} style={styles.menuItem}>
          <View style={styles.menuItemContainer}>
            <View style={styles.iconContainer}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Feather name="arrow-right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: calcWidth(5),
  },
  menuItem: {
    backgroundColor: 'white',
    marginBottom: calcHeight(2),
    padding: calcWidth(2),
    borderRadius: 8,
    elevation: 2, // Add elevation for a slight shadow
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: calcWidth(2),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: calcWidth(2),
    fontSize: getFontSizeByWindowWidth(15),
  },
});

export default Menu;
