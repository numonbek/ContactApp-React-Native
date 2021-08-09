import React, { useState, useEffect, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppState } from '@react-native-community/hooks'

import { useEasybase } from 'easybase-react'

const LoginContext = createContext()

export const useLogin = () => useContext(LoginContext)

const getLogin = async () => {
  try {
    await AsyncStorage.getItem('login')
  } catch (e) {
    console.log(e)
  }
}

export const LoginProvider = ({ children }) => {
  const { isUserSignedIn, signOut } = useEasybase()
  const [login, setLogin] = useState(getLogin())
  const [isAsyncLoading, setIsAsyncLoading] = useState(false)
  const currentAppState = useAppState()

  const setUserLogin = async () => {
    try {
      setLogin(true)
      await AsyncStorage.setItem('login', '1')
    } catch (e) {
      console.log(e)
    }
  }

  //   const getUserLogin = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('login');
  //       if (value) {
  //         setLogin(true);
  //       } else {
  //         setLogin(false);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  const getUserLogin = () => {
    AsyncStorage.getItem('login')
      .then(setIsAsyncLoading(true))
      .then(value => (value ? setLogin(true) : setLogin(false)))
      .catch(error => {
        console.log('error:::', error)
      })
      .finally(() => {
        setIsAsyncLoading(false)
      })
  }

  const removeUserLogin = async () => {
    try {
      signOut()
      await AsyncStorage.removeItem('login')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    removeUserLogin()
    getUserLogin()
  }, [currentAppState])

  return (
    <LoginContext.Provider value={{ isLogin: login, setUserLogin, removeUserLogin, isAsyncLoading }}>
      {children}
    </LoginContext.Provider>
  )
}
