import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { calcHeight, calcWidth ,getFontSizeByWindowWidth} from "../helper/res";
import PAGES from "../utils/constants/pages";

function Menu({ navigation }) {
  const menuItems = [
    {
      title: 'Summarizer',
      icon: <MaterialIcons name="short-text" size={calcHeight(5)} color="black" />,
      onPress: () => {
        navigation.navigate(PAGES.SUMMARIZER);
      },
    },
    {
      title: 'Contact Us',
      icon: <MaterialIcons name="email" size={calcHeight(5)} color="black" />,
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
            <Text style={styles.menuItemText}>{item.title}</Text>
            {item.icon}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = {
  container: {
    padding: calcWidth(5),
  },
  menuItem: {
    backgroundColor: 'white',
    marginBottom: calcHeight(2),
    padding: calcWidth(2),
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItemText: {
    fontSize: getFontSizeByWindowWidth(20),
  },
};

export default Menu;
