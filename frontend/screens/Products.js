import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const getProducts = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('http://localhost:8000/api/products')
      console.log(data)
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      Alert.alert('Error', 'Failed to fetch products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase().trim()) ||
    product.productId.toLowerCase().includes(search.toLowerCase().trim())
  )

  const renderProduct = ({ item }) => (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 w-full shadow">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-semibold">{item.name}</Text>
        <Text className="text-base font-semibold text-gray-600">ID: {item.productId}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-base">Price:</Text>
        <Text className="text-base font-semibold">${item.price}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold">Products</Text>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 mx-2">
          <SearchBar
            placeholder="Search products"
            value={search}
            onChangeText={setSearch}
            lightTheme
            round
            containerStyle={{
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              padding: 0,
            }}
            inputContainerStyle={{
              backgroundColor: '#E5E7EB',
              borderRadius: 10,
              height: 40,
            }}
          />
        </View>
        <TouchableOpacity className="bg-green-500 py-2 px-4 rounded-lg mr-2" onPress={getProducts}>
          <Text className="text-white font-semibold">Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" className="mb-4"/>}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
