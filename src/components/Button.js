import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const Button = ({handleSecure, title}) => (
  <TouchableOpacity style={styles.buttonStyle} onPress={handleSecure}>
    <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#00ADD3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Button;
