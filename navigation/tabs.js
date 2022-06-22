import React from 'react'
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from '../src/pages/HomeScreen/HomeScreen'
import FindScreen from '../src/pages/FindScreen/findscreen'
import PostScreen from '../src/pages/PostScreen/postscreen'
import ChatScreen from '../src/pages/ChatScreen/chatscreen'
import SettingsScreen from '../src/pages/SettingsScreen/settingsscreen'



const Tab = createBottomTabNavigator()
const Tabs = () => {
    return(
        <Tab.Navigator
           tabBarOptions = {{
               showLabel : false,
               style: {
                   position : 'absolute',
                   bottom:  25,
                   left: 20,
                   right:20,
                   elevation:0,
                   backgroundColor : '#ffffff',
                   borderRadius: 15,
                   height: 90,
                   ...styles.shadow
               }
           }}
        >
            <Tab.Screen name = "Home" component = {HomeScreen} screenOptions={{
                tabBarIcon : ({focused}) => {
                    <View style={{alignItems : 'center',justifyContent:'center',top:10}}>
                        <Image 
                            source = {require('../src/assets/home.png')}
                            resizeMode = 'contain'
                            style={{
                                width:25,
                                height:25,
                                tintColor : focused ? '#e32f45' : '#748c94'
                            }}
                        />
                        <Text>Home</Text>
                    </View>
                }
            }} />
            <Tab.Screen name = "Find" component = {FindScreen} />
            <Tab.Screen name = "Post" component = {PostScreen} />
            <Tab.Screen name = "Chat" component = {ChatScreen} />
            <Tab.Screen name = "Settings" component = {SettingsScreen} />
        </Tab.Navigator>
    )
}
const styles = StyleSheet.create({
    shadow : {
        shadowColor: '#7F5DF0',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})

export default Tabs