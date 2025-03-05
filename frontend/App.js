import { StatusBar } from 'expo-status-bar'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Font from 'expo-font'
import { useEffect, useState } from 'react'
import Home from './screens/Home'
import Invoices from './screens/Invoices'
import Customers from './screens/Customers'
import Products from './screens/Products'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const Tab = createBottomTabNavigator()
const fullConfig = resolveConfig(tailwindConfig)
const tabColor = fullConfig.theme.colors.tabColor

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'GT-Walsheim-Pro': require('./assets/fonts/GTWalsheimProRegular.ttf'),
      })
      setFontsLoaded(true)
    }

    loadFonts()
  }, [])

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#4CAF50" style={{ flex: 1, justifyContent: 'center' }} />
  }

  const Text = require('react-native').Text
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.style = { fontFamily: 'GT-Walsheim-Pro' }

  return (
    <NavigationContainer>
      <View className="flex-1 bg-appBackground">
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarStyle: { backgroundColor: tabColor },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => <Icon5 name="home" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Invoices"
            component={Invoices}
            options={{
              tabBarIcon: ({ color, size }) => <Icon5 name="file-invoice" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Customers"
            component={Customers}
            options={{
              tabBarIcon: ({ color, size }) => <Icon5 name="users" size={size} color={color} />,
            }}
          />
          <Tab.Screen
            name="Products"
            component={Products}
            options={{
              tabBarIcon: ({ color, size }) => <Icon5 name="tags" size={size} color={color} />,
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  )
}
