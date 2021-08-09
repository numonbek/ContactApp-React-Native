import React, { useEffect, useState } from 'react'

import { StyleSheet, View, FlatList, Modal } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import GestureRecognizer from 'react-native-swipe-gestures'
import { useLogin } from '../context'

import Header from '../components/Header'
import CardPhoto from '../components/CardPhoto'
import Preloader from '../components/Preloader'
import ModalPhoto from '../components/ModalPhoto'

import { config } from '../helpers'

const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page='
const pickerArray = [
  {
    title: 'Album One',
    value: 1
  },
  {
    title: 'Album Two',
    value: 2
  },
  {
    title: 'Album Three',
    value: 3
  },
  {
    title: 'Album Four',
    value: 4
  }
]

const Screen3 = () => {
  const { isLogin } = useLogin()
  const isFocused = useIsFocused()
  const navigation = useNavigation()

  const [first, setFirst] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

  const [pickerValue, pickerValueChange] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const [currentPhoto, setCurrentPhoto] = useState({})
  const [photoIndex, setPhotoIndex] = useState(null)
  const [openCardModal, setOpenCardModal] = useState(false)

  useEffect(() => {
    !isLogin && isFocused ? navigation.navigate('Screen 1') : null
  }, [isLogin, isFocused])

  const fetchHandler = () => {
    fetch(url + String(page))
      .then(response => response.json())
      .then(responseJson => {
        setData(first ? responseJson : data.concat(responseJson))
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
        setFirst(false)
      })
  }

  useEffect(() => {
    fetchHandler()
  }, [page, setPage])

  const handleLoadMore = () => {
    if (page < 5) {
      setPage(page + 1)
    }
  }

  const pickerHandler = item => {
    setPage(item * 5 - 4)
    setFirst(true)
    pickerValueChange(item)
    const filteredData = data.filter(x => x.albumId === pickerValue)
    setData(filteredData)
    setTimeout(() => setModalVisible(!modalVisible), 1000)
  }

  useEffect(() => {
    const photo = data.find(({ id }) => id === photoIndex)
    const photoData = {
      url: photo?.url,
      title: photo?.title
    }
    setCurrentPhoto(photoData)
  }, [photoIndex])

  const renderItem = ({ item }) => (
    <CardPhoto
      item={item}
      setIsModalContactVisible={() => setOpenCardModal(!openCardModal)}
      setPhotoIndex={() => setPhotoIndex(item.id)}
    />
  )

  const swipeLeft = () => {
    setPhotoIndex(photoIndex + 1)
  }
  const swipeRight = () => {
    setPhotoIndex(photoIndex - 1)
  }
  const swipeDown = () => {
    setOpenCardModal(false)
  }

  return (
    <View style={styles.root}>
      <Header title="Gallery" buttonTitle={pickerValue} setModalVisible={() => setModalVisible(true)} />
      {isLoading ? (
        <Preloader />
      ) : (
        <FlatList
          refreshing={isLoading}
          onRefresh={() => fetchHandler()}
          contentContainerStyle={styles.flatListStyle}
          data={data}
          extraData={pickerValue}
          renderItem={renderItem}
          keyExtractor={index => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
        />
      )}
      <Modal animationType="slide" transparent={false} visible={modalVisible} style={styles.modalStyle}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={pickerValue}
            style={styles.pickerStyle}
            onValueChange={itemValue => pickerHandler(itemValue)}
          >
            {pickerArray.map(item => (
              <Picker.Item label={item.title} value={item.value} key={item.value.toString} />
            ))}
          </Picker>
        </View>
      </Modal>
      <GestureRecognizer
        style={openCardModal ? styles.cardModalOpen : styles.cardModalClose}
        onSwipeLeft={swipeLeft}
        onSwipeRight={swipeRight}
        onSwipeDown={swipeDown}
        config={config}
      >
        <ModalPhoto currentPhoto={currentPhoto} />
      </GestureRecognizer>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black'
  },
  indicatorStyle: {
    flex: 1
  },
  pickerStyle: {
    height: 200,
    width: '100%',
    paddingHorizontal: 24
  },
  pickerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  flatListStyle: {
    paddingHorizontal: 25,
    paddingTop: 20
  },
  cardModalOpen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardModalClose: {
    width: 0,
    height: 0
  }
})

export default Screen3
