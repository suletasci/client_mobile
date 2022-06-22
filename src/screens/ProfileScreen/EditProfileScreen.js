import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, SafeAreaView, TouchableHighlight, TextInput, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { useForm } from 'react-hook-form';
import { Formik } from 'formik';
import axios from 'axios'

import CustomInput from '../../components/CustomInput/index';
import CustomButton from '../../components/CustomButton/index';
function EditProfileScreen({ route, navigation }) {
  console.disableYellowBox = true;

  const { name, email, preferredName, sub_id } = route.params;

  const updateUser = async (event) => {
    console.log(event)
  }

  const [progressText, setProgressText] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [asset, setAsset] = useState(null);
  const selectFile = async () => {
    await launchImageLibrary({ mediaType: 'mixed' }, result => {
      if (!result.assets) {
        Alert.alert(result.errorMessage);
        return;
      }
      setAsset(result.assets[0]);
    });
  };

  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };

  const uploadResource = async () => {
    if (isLoading) return;
    setisLoading(true);
    const img = await fetchResourceFromURI(asset.uri);
    console.log(img)
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: img,
      name: "image.png",
      type: "image/png"
    }
 //https://grvtnp115c.execute-api.eu-central-1.amazonaws.com/default/getPreSignedUrl
    axios.post("https://zm0wsuk5hl.execute-api.us-east-1.amazonaws.com/my-stage/upload",file).then(() => console.log("başarılı"))
  };
  const { control, handleSubmit, watch } = useForm();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.backTitle}>
          <TouchableHighlight onPress={() => { navigation.navigate('Profile') }} underlayColor="white">
            <View style={styles.infoContainer}>
              <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
            </View>

          </TouchableHighlight>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={selectFile}>
            {
              asset
                ?
                <>
                  <Image
                    style={styles.selectedImage}
                    source={{ uri: asset?.uri ?? '' }}
                  />
                  <View style={styles.iconsList}>
                    <TouchableOpacity onPress={() => setAsset(null)}>
                      <Icon name="delete" size={28} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Icon name="restore" size={28} color={COLORS.primary} />
                  </View>
                </>
                :
                (
                  <Image
                    style={styles.nullImage}
                  />
                )
            }

          </TouchableOpacity>
          <Text>{progressText}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { color: "purple", fontWeight: "200", fontSize: 36 }]}>{name}</Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>@{preferredName} </Text>
          <Text style={[styles.text, { color: "purple", fontSize: 14 }]}>{email} </Text>
        </View> 
        <Formik
          initialValues={{ city: '',telephone : '', profession : '' }}
          onSubmit={values => updateUser(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('telephone')}
                onBlur={handleBlur('telephone')}
                value={values.telephone}
                style={styles.textInput}
                placeholder="telephone"
              />

              <TextInput
                onChangeText={handleChange('profession')}
                onBlur={handleBlur('profession')}
                value={values.profession}
                style={styles.textInput}
                placeholder="profession"
              />

              <TextInput
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                style={styles.textInput}
                placeholder="city"
              />
              <Button 
                onPress={uploadResource} 
                title="Save" 
                style = {styles.button}  
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    width: '80%',
    marginLeft: 40,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  button: {
    fontSize: 10,
    color: '#fff',
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  cancelButton: {
    backgroundColor: '#fff',
    color: 'blue',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50
  },
  nullImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: 'gray'
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  backTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  iconsList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});