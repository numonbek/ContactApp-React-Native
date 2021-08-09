import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLogin } from '../context'

import arrowIco from '../assets/arrow_ico.png'
import closeIco from '../assets/cross_ico.png'

const ButtonRounded = ({ type, handlePress, color }) => {
  const { isLogin } = useLogin()
  const navigation = useNavigation()

  const handleNavigate = () => {
    if (handlePress) {
      handlePress()
    }
    if (isLogin) {
      navigation.navigate('Screen 1')
    }
    if (!isLogin && !handlePress) {
      navigation.goBack()
    }
  }

  return (
    <TouchableOpacity style={[styles.backButton, { backgroundColor: color }]} onPress={handleNavigate}>
      <Image
        style={[styles.arrowIco, { tintColor: color === 'black' ? 'white' : 'black' }]}
        source={type === 'close' ? closeIco : arrowIco}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowIco: {
    width: 15,
    height: 15
  }
})

export default ButtonRounded
