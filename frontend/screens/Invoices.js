import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert, SafeAreaView } from 'react-native'
import axios from 'axios'
import { SearchBar } from 'react-native-elements'
import InvoiceListItem from '../components/InvoiceListItem'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const getInvoices = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('http://localhost:8000/api/invoices')
      console.log(data)
      setInvoices(data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      Alert.alert('Error', 'Failed to fetch invoices. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  )

  const renderInvoice = ({ item }) => (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 w-full shadow">
      <InvoiceListItem tag='Invoice number :' value={item.invoiceNumber}/>
      <InvoiceListItem tag='Status :' className ={`${item.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`} value={item.status}/>
      <InvoiceListItem tag='Amount :' value={item.totalAmount}/>
    </View>
  )
  

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="items-center mb-4">
        <Text className="text-2xl font-bold">Invoices</Text>
      </View>

      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 mx-2">
          <SearchBar
            placeholder="Search invoices"
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
              height: 40
            }}
          />
        </View>
        <TouchableOpacity
          className="bg-green-500 py-2 px-4 rounded-lg mr-2"
          onPress={getInvoices}
        >
          <Text className="text-white font-semibold">Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#4CAF50" className="mb-4" />}

      <FlatList 
        data={filteredInvoices}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderInvoice}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
