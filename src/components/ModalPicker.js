import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import { Picker } from '@react-native-picker/picker'
import ButtonRounded from './ButtonRounded'

const ModalPicker = ({ handPickerOpen, usersData, selectCity, setSelectCity }) => (
  <>
    <SafeAreaView style={styles.modalHeader}>
      <ButtonRounded type="close" handlePress={handPickerOpen} color="black" />
    </SafeAreaView>
    <View style={styles.modalTextBox}>
      <Picker selectedValue={selectCity} onValueChange={item => setSelectCity(item)}>
        {usersData.map(user => (
          <Picker.Item label={user?.location.city} value={user?.location.city} />
          // <Picker.Item label={user.address.city} value={user.address.city} />
        ))}
      </Picker>
    </View>
    <View />
  </>
)

const styles = StyleSheet.create({
  modalHeader: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    marginRight: 30
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '400',
    color: 'black'
  },
  modalDescription: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black'
  },
  modalTextBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  }
})

export default ModalPicker
