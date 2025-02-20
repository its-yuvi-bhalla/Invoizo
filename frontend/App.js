import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Navbar from './components/navbar/NavBar'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home'
import Icon5 from 'react-native-vector-icons/FontAwesome5'
import Invoices from './screens/Invoices'
import Customers from './screens/Customers'
import Products from './screens/Products'
import './_layout.css' 
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const Tab = createBottomTabNavigator()
const fullConfig = resolveConfig(tailwindConfig)
const primaryColor = fullConfig.theme.colors.primary

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="auto" className="flex border"/>
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: primaryColor}}>
          <Tab.Screen name="Home" component={Home} options={{tabBarIcon : ({ color, size }) => { return <Icon5 name='home' size={size} color={color}/>}}}/>
          <Tab.Screen name="Invoices" component={Invoices} options={{tabBarIcon : ({ color, size }) => { return <Icon5 name='file-invoice' size={size} color={color}/>}}} />
          <Tab.Screen name="Customers" component={Customers} options={{tabBarIcon : ({ color, size }) => { return <Icon5 name='users' size={size} color={color}/>}}} />
          <Tab.Screen name="Products" component={Products} options={{tabBarIcon : ({ color, size }) => { return <Icon5 name='tags' size={size} color={color}/>}}}/>
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

