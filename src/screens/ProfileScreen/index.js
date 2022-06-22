import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Alert,TouchableHighlight } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from 'aws-amplify'; 

const index = ({ navigation }) => {
  console.disableYellowBox = true;
  
  const [name,setName] = useState()
  const [preferredName,setPreferredName] = useState()
  const [email,setEmail] = useState()
  const [sub,setSub] = useState()

  useEffect(() => {
    Auth.currentAuthenticatedUser()
    .then(data => 
      {
        setName(data.attributes.name),
        setEmail(data.attributes.email),
        setSub(data.attributes.sub),
        setPreferredName(data.attributes.preferred_username)
      } 
    ).catch(err => console.log(err));
  });
 
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
            </View>

            <View style={{ alignSelf: "center" }}>
                <View style={styles.profileImage}>
                    <Image source={require("../../assets/images/profile.png")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    {/* <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons> */}
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    {/* <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons> */}
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>@{preferredName} </Text>
            </View>

            

            <TouchableHighlight onPress={() => {navigation.navigate('EditProfile',{
                name:name,
                email:email,
                preferredName : preferredName,
                sub_id : sub
            })}} underlayColor="white">
            <View style={styles.infoContainer}>
                
                <Text style={[styles.text, { color: "purple", fontSize: 14 }]}>Edit </Text>
            </View>
        </TouchableHighlight>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
                    <Text style={[styles.text, styles.subText]}>Course</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>412</Text>
                    <Text style={[styles.text, styles.subText]}>Student</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
                    <Text style={[styles.text, styles.subText]}>Place</Text>
                </View>
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {/* <View style={styles.mediaImageContainer}>
                        <Image source={require("./assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("./assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("./assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View> */}
                </ScrollView>
                {/* <View style={styles.mediaCount}>
                    <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                </View> */}
            </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>


    // <SafeAreaView style={styles.container}>
    //   <View style={styles.userInfoSection}>
    //     <View style={{flexDirection: 'row', marginTop: 15}}>
    //       <Avatar.Image 
    //         source={{
    //           uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
    //         }}
    //         size={80}
    //       />
    //       <View style={{marginLeft: 20}}>
    //         <Title style={[styles.title, {
    //           marginTop:15,
    //           marginBottom: 5,
    //         }]}>{name}</Title>
    //         <Caption style={styles.caption}>@{preferredName}</Caption>
    //       </View>

          

    //       <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
    //         <View style={{marginLeft: 90}}>
    //           <Title style={[styles.title, {
    //             marginTop:15,
    //             marginBottom: 5,
    //             color : 'blue',
    //             fontSize : 16
    //           }]}>Edit</Title> 
    //         </View>
    //       </TouchableRipple>
          
    //     </View>
    //   </View>

    //   <View style={styles.userInfoSection}>
    //     <View style={styles.row}>
    //       <Icon name="map-marker-radius" color="#800080" size={20}/>
    //       <Text style={{color:"#777777", marginLeft: 20}}>Şehir Yazılacak</Text>
    //     </View>
    //     <View style={styles.row}>
    //       <Icon name="phone" color="#800080" size={20}/>
    //       <Text style={{color:"#777777", marginLeft: 20}}>Tel Yazılacak</Text>
    //     </View>
    //     <View style={styles.row}>
    //       <Icon name="email" color="#800080" size={20}/>
    //       <Text style={{color:"#777777", marginLeft: 20}}> {email} </Text>
    //     </View>
    //   </View> 
    //   <View style={styles.menuWrapper}>
    //     <TouchableRipple onPress={() => {}}>
    //       <View style={styles.menuItem}>
    //         <Icon name="heart-outline" color="#800080" size={25}/>
    //         <Text style={styles.menuItemText}>Your Favorites</Text>
    //       </View>
    //     </TouchableRipple>
    //     <TouchableRipple onPress={() => {}}>
    //       <View style={styles.menuItem}>
    //         <Icon name="credit-card" color="#800080" size={25}/>
    //         <Text style={styles.menuItemText}>Payment</Text>
    //       </View>
    //     </TouchableRipple>
          
        
        
    //   </View>
    // </SafeAreaView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "purple",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     },
//     userInfoSection: {
//       paddingHorizontal: 30,
//       marginBottom: 25,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//     },
//     caption: {
//       fontSize: 14,
//       lineHeight: 14,
//       fontWeight: '500',
//     },
//     row: {
//       flexDirection: 'row',
//       marginBottom: 10,
//     },
//     infoBoxWrapper: {
//       borderBottomColor: '#dddddd',
//       borderBottomWidth: 1,
//       borderTopColor: '#dddddd',
//       borderTopWidth: 1,
//       flexDirection: 'row',
//       height: 100,
//     },
//     infoBox: {
//       width: '50%',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     menuWrapper: {
//       marginTop: 10,
//     },
//     menuItem: {
//       flexDirection: 'row',
//       paddingVertical: 15,
//       paddingHorizontal: 30,
//     },
//     menuItemText: {
//       color: '#777777',
//       marginLeft: 20,
//       fontWeight: '600',
//       fontSize: 16,
//       lineHeight: 26,
//     },
//   });