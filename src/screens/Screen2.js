import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, TextInput, View, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { useKeyboard } from '@react-native-community/hooks'
import Button from '../components/Button'
import Switch from '../components/Switch'
import Header from '../components/Header'
import { useLogin } from '../context'
import Preloader from '../components/Preloader'

import { useEasybase } from 'easybase-react'

const secure = {
  login: '123',
  password: '123'
}

const Screen2 = () => {
  const [loginType, setLoginType] = useState()
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useEasybase()
  const navigation = useNavigation()
  const inputRef = useRef()
  const [isFirst, setIsFirst] = useState(true)
  const [isAnimatable, setIsAnimatable] = useState(false)
  const [valueLogin, setValueLogin] = useState('')
  const [valuePassword, setValuePassword] = useState('')

  const keyboard = useKeyboard()

  const { setUserLogin } = useLogin()

  const createAlert = () =>
    Alert.alert('Please enter correct data', 'Incorrect Login / Password', [
      { text: 'OK', onPress: () => console.warn('Press OK') }
    ])

  const clearInputs = () => {
    setValueLogin('')
    setValuePassword('')
  }

  const handleSecure = () => {
    if (valueLogin === secure.login && valuePassword === secure.password) {
      navigation.navigate('Screen 3')
      clearInputs()
      setUserLogin()
    } else {
      createAlert()
      setIsAnimatable(!isAnimatable)
    }
  }

  const handleSignIn = async () => {
    setLoading(true)
    const response = await signIn(valueLogin, valuePassword)
    if (response.success) {
      setUserLogin()
      clearInputs()
      setLoading(false)
      navigation.navigate('Screen 3')
    } else {
      setLoading(false)
      createAlert()
      setIsAnimatable(!isAnimatable)
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const response = await signUp(valueLogin, valuePassword, { created_at: new Date().toString })
    if (response.success) {
      handleSignIn()
    } else {
      setLoading(false)
      createAlert()
      setIsAnimatable(!isAnimatable)
    }
  }

  useEffect(() => {
    setIsFirst(!isFirst)
  }, [])

  useEffect(() => {
    !isFirst && inputRef.current.animate('swing', 800)
  }, [isAnimatable])

  return (
    <>
      <Header title="Log In" />
      {loading ? (
        <Preloader />
      ) : (
        <View style={[styles.root, { paddingBottom: keyboard.keyboardShown ? 200 : 0 }]}>
          <Animatable.View style={styles.inputBox} ref={inputRef}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Login"
              value={valueLogin}
              onChangeText={setValueLogin}
              blurOnSubmit
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Enter Password"
              value={valuePassword}
              onChangeText={setValuePassword}
              blurOnSubmit
            />
          </Animatable.View>
          <Switch setLoginType={setLoginType} />
          <Button handleSecure={loginType === 'Sign In' ? handleSignIn : handleSignUp} title="Submit" />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  inputStyle: {
    width: '100%',
    height: 55,
    margin: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingLeft: 30,
    borderRadius: 20,
    fontSize: 18
  }
})

export default Screen2
