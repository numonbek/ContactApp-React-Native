import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'

const CardPhoto = ({ item, setIsModalContactVisible, setPhotoIndex }) => {
  const onPressHandle = () => {
    setIsModalContactVisible()
    setPhotoIndex()
  }
  return (
    <TouchableOpacity style={styles.cardRoot} onPress={onPressHandle}>
      <Image style={styles.imageBox} source={{ uri: item.url }} />
      <View style={styles.textBox}>
        <Text style={styles.sectionText}>{item.title}</Text>
        <View style={styles.markerBox}>
          <Text style={(styles.sectionText, styles.highlight)}>ALBUM</Text>
          <View style={styles.albumMarker}>
            <Text style={(styles.sectionText, styles.highlightMarker)}>{item.albumId}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  sectionDescription: {},
  sectionText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'white',
    width: '60%'
  },
  highlight: {
    fontWeight: '500',
    color: '#00ADD3'
  },
  highlightMarker: {
    fontWeight: '500',
    color: 'white'
  },
  imageBox: {
    width: '100%',
    height: 100,
    borderRadius: 5
  },
  cardRoot: {
    width: '100%',
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12
  },
  textBox: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  albumMarker: {
    borderWidth: 1,
    backgroundColor: '#00ADD3',
    width: 25,
    height: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  markerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default CardPhoto
