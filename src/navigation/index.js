import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';   
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator, NativeStackView} from "@react-navigation/native-stack"

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen'
import FindScreen from '../screens/FindScreen'
import CourseAdd from '../screens/CourseAddScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen'
import DetailsScreen from '../screens/DetailScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Auth, Hub} from 'aws-amplify';

const TabStack = createBottomTabNavigator();   
const Stack = createNativeStackNavigator();  
const Navigation = () => {
  const [user, setUser] = useState(undefined);
  console.log(user)

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
 
  const TabRoutes = () => {
    return (
      <TabStack.Navigator 
        screenOptions={({ route }) => ({
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            }
            else if (route.name === 'CourseAdd') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
            }else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
          })} 
      >
        <TabStack.Screen name="Home" component={HomeScreen} />
        <TabStack.Screen name="CourseAdd" component={CourseAdd} />
        <TabStack.Screen name="Profile" component={ProfileScreen} />
      </TabStack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={({route}) => ({
          headerShown : false
          
        })}
      >
        {
          user ? (
            <>
              <Stack.Screen name="TabRoutes" component={TabRoutes}/>

              <Stack.Screen name="EditProfile" component = {EditProfileScreen} /> 
              <Stack.Screen name="SettingsScreen" component = {SettingsScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignInScreen} />  
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
              />
              <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
            </>
          )

        }
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;


// <Stack.Navigator 
//           screenOptions={({ route }) => ({
//             headerShown:false,
//             tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused
//                 ? 'ios-home'
//                 : 'ios-home-outline';
//             }
//             else if (route.name === 'CourseAdd') {
//               iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
//             }else if (route.name === 'Profile') {
//               iconName = focused ? 'ios-person' : 'ios-person';
//             }else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-settings' : 'ios-settings';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size={size} color={color} />;
//             },
//             tabBarActiveTintColor: 'purple',
//             tabBarInactiveTintColor: 'gray',
//           })} 
//       > 
//         {user ? (
//           <>
//           <Stack.Screen name="Home" component={HomeScreen} />

//           <Stack.Screen name="CourseAdd" component = {CourseAdd} />

//           <Stack.Screen name="Profile" component = {ProfileScreen}/>

//           <Stack.Screen name="EditProfile" component = {EditProfileScreen}  />

//           <Stack.Screen name="SettingsScreen" component={SettingsScreen}  />
//           </>
//         ) : (
//           <>
//             {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
//             <Stack.Screen name="HideRoute" component={HideStackRoutes} />

//             {/* <Stack.Screen name="SignUp" component={SignUpScreen} />
//             <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
//             <Stack.Screen
//               name="ForgotPassword"
//               component={ForgotPasswordScreen}
//             />
//             <Stack.Screen name="NewPassword" component={NewPasswordScreen} /> */}
           
//           </>
//         )}

//       </Stack.Navigator>  