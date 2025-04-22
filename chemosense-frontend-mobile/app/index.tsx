import { View, Text } from 'react-native'
import React from 'react'
import Dummy from '@/components/Dummy'
import "../global.css"

const index = () => {
  return (
    <View className='items-center justify-center flex-1 bg-yellow-200'>
      <Text className='text-2xl text-blue-500'>Hello World!</Text>
      <Dummy />
    </View>
  )
}

export default index