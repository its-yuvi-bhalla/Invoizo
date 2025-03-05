import { View, Text } from 'react-native'
import React from 'react'

const InvoiceListItem = ({tag,value}) => {
    const renderValue = tag=='Status'? value = <Text className={`text-base font-semibold ${value === 'Pending' ? 'text-red-500' : 'text-green-500'} `}>{value}</Text>:<Text className="text-base font-semibold">{value}</Text>
  return (
    <View className="flex-row justify-between">
            <Text className="text-base">{tag}</Text>
            {renderValue}
          </View>
  )
}

export default InvoiceListItem