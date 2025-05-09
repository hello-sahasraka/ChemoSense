import { View, Text } from 'react-native'
import React from 'react'
import "../global.css";



// Components

import PatEditProfile from './Screens/PatEditProfile'
import Notification from './Screens/Notification';

const index = () => {
  return (
    /* <View className="flex-1">
       <PatEditProfile />
     </View>
     */
    <View className="flex-1">
      <PatEditProfile />
    </View>
  )
}

export default index;