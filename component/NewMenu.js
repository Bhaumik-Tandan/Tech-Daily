import React, { useState } from "react";
import { StyleSheet, Pressable, View, Text, Share, Modal } from "react-native";
import { calcHeight, calcWidth } from "../helper/res";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

function NewsMenu({ sourceUrl }) {
    const [isContactModalVisible, setContactModalVisible] = useState(false);

    const openContactModal = () => {
        setContactModalVisible(true);
    };

    const closeContactModal = () => {
        setContactModalVisible(false);
    };

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

            <Pressable style={styles.pressable} onPress={openContactModal}>
                <MaterialIcons name="contact-mail" size={calcHeight(3)} color="black" />
                <Text>Contact Us</Text>
            </Pressable>

            <Modal
                visible={isContactModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeContactModal}
            >
                <View style={styles.contactModal}>
                    <Text style={styles.contactHeaderText}>Contact Us</Text>
                    <Text style={styles.contactEmail}>Email: pivot.it.bhaumik@gmail.com</Text>
                    <Pressable style={styles.closeButton} onPress={closeContactModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
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
