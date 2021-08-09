import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native'

const buttonsArray = ['Sign In', 'Sign Up']

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Switch = ({ setLoginType }) => {
  const [active, setActive] = useState(buttonsArray[0])

  const handleActive = (index, item) => {
    setActive(index)
    setLoginType(item)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  return (
    <View style={styles.switch}>
      {buttonsArray.map((item, index) => (
        <TouchableOpacity onPress={() => handleActive(index, item)}>
          <Text style={index === active ? styles.switchTextFocus : styles.switchText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  switchTextFocus: {
    fontSize: 15,
    color: '#00ADD3'
  },
  switchText: {
    fontSize: 13,
    color: 'grey'
  },
  switch: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 140,
    paddingTop: 40,
    justifyContent: 'space-between'
  }
})

export default Switch
