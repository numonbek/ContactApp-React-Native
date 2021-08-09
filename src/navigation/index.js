import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { LoginProvider } from '../context'

import { EasybaseProvider } from 'easybase-react'
import ebconfig from '../../ebconfig'

import Screen1 from '../screens/Screen1'
import Screen2 from '../screens/Screen2'
import Screen3 from '../screens/Screen3'

import Tabbar from '../components/Tabbar'

const RootStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const TabScreens = () => (
  <EasybaseProvider ebconfig={ebconfig}>
    <LoginProvider>
      <Tabs.Navigator
        headerMode="none"
        initialRouteName="Screen 1"
        tabBar={({ navigation, state, descriptors }) => <Tabbar {...{ navigation, state, descriptors }} />}
      >
        <Tabs.Screen name="Screen 1" component={Screen1} />
        <Tabs.Screen name="Screen 2" component={Screen2} />
        <Tabs.Screen name="Screen 3" component={Screen3} />
      </Tabs.Navigator>
    </LoginProvider>
  </EasybaseProvider>
)

const Navigation = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="TabScreens" headerMode="none">
      <RootStack.Screen name="TabScreens" component={TabScreens} />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default Navigation
