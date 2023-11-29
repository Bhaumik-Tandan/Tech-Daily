import React, { useState } from "react";
import { StyleSheet, Pressable, View, Text, Share, Modal } from "react-native";
import { calcHeight, calcWidth } from "../helper/res";
import { AntDesign } from '@expo/vector-icons';
import { Entypo  } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import PAGES from "../utils/constants/pages";

function NewsMenu({ sourceUrl }) {
    const navigation = useNavigation();
    return (
        <View style={styles.bottomMenu}>
            <Pressable style={styles.pressable} onPress={() => {
                Share.share({
                    message: `Check out this news: ${sourceUrl}`,
                });
            }}>
                <AntDesign name="sharealt" size={calcHeight(3)} color="#8cbed6" />
                <Text>Share</Text>
            </Pressable>

            <Pressable style={styles.pressable} onPress={()=>{
                navigation.navigate(PAGES.MENU);
            }}>
                <Entypo name="menu" size={calcHeight(3)} color="black" />
                <Text>Menu</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    bottomMenu: {
        paddingVertical: calcWidth(3),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    pressable: {
        flex: 1,
        alignItems: 'center',
    },
    contactModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    contactHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    contactEmail: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 24,
    },
    closeButton: {
        backgroundColor: '#8cbed6',
        padding: 12,
        borderRadius: 8,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default NewsMenu;
