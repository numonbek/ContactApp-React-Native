import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'

import userpic from '../assets/userpic.png'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Card = ({ item, handleCardOpen, setCurrentUserId, index }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlePress = () => {
    setIsOpen(!isOpen)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  const handleModalOpen = () => {
    setCurrentUserId(index)
    //setCurrentUserId(item.id)
    handleCardOpen()
  }

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.cardStyle, { height: isOpen ? 190 : 100 }]}>
      <View style={styles.mainBox}>
        <View style={styles.styleIco}>
          <TouchableOpacity onPress={handleModalOpen}>
            <Image style={styles.iconStyle} source={userpic} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBox}>
          {/* <Text style={styles.nameStyle}>{item.name}</Text> */}
          <Text style={styles.nameStyle}>{item?.name.first}</Text>
          <Text style={styles.phoneStyle}>{item?.phone}</Text>
        </View>
      </View>
      {isOpen && (
        <>
          <View style={styles.hiddenBox}>
            <View style={styles.addresBox}>
              <View style={styles.spacer} />
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>ADDRESS</Text>
                <Text style={styles.infoContent}>{item.location.city}</Text>
                {/* <Text style={styles.infoContent}>{item.address.city}</Text> */}
              </View>
            </View>
          </View>
          <View style={styles.hiddenBox}>
            <View style={styles.addresBox}>
              <View style={styles.spacer} />
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>EMAIL</Text>
                <Text style={styles.infoContent}>{item.email}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardStyle: {
    width: 363,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    marginBottom: 20
  },
  nameStyle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#00ADD3'
  },
  styleIco: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox: {
    flexDirection: 'row',
    paddingTop: 20
  },
  phoneStyle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#00ADD3'
  },
  titleBox: {
    flex: 6,
    justifyContent: 'center'
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00ADD3'
  },
  infoContent: {
    fontSize: 12,
    fontWeight: '400',
    color: '#0A0A0A'
  },
  addresBox: {
    paddingTop: 10,
    flexDirection: 'row'
  },
  iconStyle: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: '#00ADD3',
    borderRadius: 30
  },
  infoBox: {
    flex: 6
  },
  spacer: {
    flex: 3
  },
  scrollStyle: {
    flex: 1
  },
  scrollContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Card
