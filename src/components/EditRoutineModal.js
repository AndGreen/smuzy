import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import tw from "twrnc";

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export const EditRoutineModal = ({ isVisible, setModalVisible }) => {

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="pageSheet"
      style={tw`dark:bg-zinc-800`}
      onRequestClose={() => {
        alert('Modal has been closed.');
        setModalVisible(!isVisible);
      }}>
      <View style={tw`flex h-full pt-5 items-center dark:bg-zinc-800`}>
        <View style={tw`dark:bg-zinc-800 items-center`}>
          <Text style={tw`dark:text-white mb-5 font-bold text-lg`}>Modal</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!isVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
