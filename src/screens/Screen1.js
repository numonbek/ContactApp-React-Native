import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Platform, UIManager, LayoutAnimation } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import Card from '../components/Card'
import Header from '../components/Header'
import ModalContact from '../components/ModalContact'
import ModalPicker from '../components/ModalPicker'

import Preloader from '../components/Preloader'

import { config } from '../helpers'

// const url = 'https://jsonplaceholder.typicode.com/users'

const url = 'https://randomuser.me/api/?results=10&_page=1'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Screen1 = () => {
  const [usersData, setUsersData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const [selectCity, setSelectCity] = useState('')
  const [openCardModal, setOpenCardModal] = useState(false)
  const [openPickerModal, setOpenPickerModal] = useState(false)
  const [currentUserId, setCurrentUserId] = useState('')
  const [currentUser, setCurrentUser] = useState({})

  const currentUserFilter = (id, data) => data[id]

  // const currentUserFilter = (id, data) => data.filter(user => user.login.salt === id)[0]

  // const currentCityFilter = (city, data) => data.filter(user => user.address.city === city)
  const currentCityFilter = (city, data) => data.filter(user => user.location.city === city)

  const fetchHandler = http => {
    fetch(http)
      .then(response => response.json())
      .then(responseJson => {
        setUsersData(responseJson.results)
      })
      .catch(error => {
        console.log('error', error)
      })
      .finally(() => {
        setLoading(false)
        setRefresh(false)
      })
  }

  useEffect(() => {
    fetchHandler(url)
  }, [refresh])

  useEffect(() => {
    const user = currentUserFilter(currentUserId, usersData)
    setCurrentUser(user)
  }, [currentUserId])

  useEffect(() => {
    const users = currentCityFilter(selectCity, usersData)
    setUsersData(users)
  }, [])

  const handleCardOpen = () => {
    setOpenCardModal(!openCardModal)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  const handPickerOpen = () => {
    setOpenPickerModal(!openPickerModal)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  const renderItem = ({ item, index }) => (
    <Card item={item} handleCardOpen={handleCardOpen} setCurrentUserId={setCurrentUserId} index={index} />
  )

  const swipeLeft = () => {
    currentUserId === 9 ? null : setCurrentUserId(currentUserId + 1)
  }
  const swipeRight = () => {
    currentUserId === 0 ? null : setCurrentUserId(currentUserId - 1)
  }
  const swipeDown = () => {
    setOpenCardModal(false)
  }

  return (
    <>
      <View style={styles.root}>
        <Header title="Contacts" setModalVisible={() => handPickerOpen()} />
        {loading ? (
          <Preloader />
        ) : (
          <FlatList
            refreshing={refresh}
            onRefresh={() => setRefresh(!refresh)}
            data={usersData}
            renderItem={renderItem}
            keyExtractor={item => item.login.uuid}
            contentContainerStyle={styles.scrollStyles}
          />
        )}
      </View>
      <GestureRecognizer
        style={openCardModal ? styles.cardModalOpen : styles.cardModalClose}
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onSwipeDown={swipeDown}
        config={config}
      >
        <ModalContact handleCardOpen={handleCardOpen} currentUser={currentUser} />
      </GestureRecognizer>

      <View style={openPickerModal ? styles.cardModalOpen : styles.cardModalClose}>
        <ModalPicker
          handPickerOpen={handPickerOpen}
          usersData={usersData}
          selectCity={selectCity}
          setSelectCity={setSelectCity}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scrollStyles: {
    alignItems: 'center',
    paddingVertical: 20
  },
  indicatorStyle: {
    flex: 1
  },
  touchableModal: {
    flex: 1
  },
  cardModalOpen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardModalClose: {
    width: 0,
    height: 0
  }
})

export default Screen1
