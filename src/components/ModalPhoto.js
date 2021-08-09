import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const ModalPhoto = ({ currentPhoto }) => (
  <View style={styles.root}>
    <View style={styles.textBox}>
      <Image source={{ uri: currentPhoto?.url }} style={{ width: '100%', height: '50%' }} />
      <Text style={styles.photoText}>{currentPhoto?.title}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center'
  },
  photoText: {
    paddingTop: 15,
    fontSize: 21,
    fontWeight: '400',
    color: 'white',
    paddingHorizontal: 15
  },
  textBox: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ModalPhoto
