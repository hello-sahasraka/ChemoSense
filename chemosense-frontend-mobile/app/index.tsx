import { View, Text } from 'react-native'
import React from 'react'
import "../global.css"

// Components
import Dummy from '../components/Dummy'

const index = () => {
  return (
    <View className='items-center justify-center flex-1 bg-yellow-200'>
      <Text className='text-2xl font-bold text-blue-500'>Hello!</Text>
      <Dummy />
    </View>
  )
}

export default index