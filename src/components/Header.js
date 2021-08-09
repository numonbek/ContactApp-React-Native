import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import ButtonRounded from './ButtonRounded'
import ButtonText from './ButtonText'

const Header = ({ title, setModalVisible, buttonTitle }) => (
  <SafeAreaView style={styles.headerStyle}>
    {title === 'Modal' ? (
      <View style={styles.leftBox} />
    ) : (
      <View style={styles.leftBox}>
        {title !== 'Contacts' && <ButtonRounded color={title === 'Gallery' ? 'white' : 'black'} />}
        <Text style={title === 'Gallery' ? styles.headerTextWhite : styles.headerTextBlack}>{title}</Text>
      </View>
    )}
    {title === 'Contacts' && <ButtonText title="Press" onPress={setModalVisible} />}
    {title === 'Modal' && <ButtonText title="Close" onPress={setModalVisible} />}
    {title === 'Gallery' && <ButtonText title={buttonTitle} onPress={setModalVisible} />}
  </SafeAreaView>
)

const styles = StyleSheet.create({
  headerStyle: {
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  headerTextBlack: {
    fontSize: 40,
    fontWeight: '200',
    color: 'black'
  },
  headerTextWhite: {
    fontSize: 40,
    fontWeight: '200',
    color: 'white'
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Header
