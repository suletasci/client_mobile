import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, Button } from 'react-native';
import CustomInput from '../../components/CustomInput/index';
import CustomButton from '../../components/CustomButton/index';
import { useMutation } from "@apollo/client";
import uuid from 'react-native-uuid';
import { launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';
import { Storage } from 'aws-amplify';
import { useForm } from 'react-hook-form';

import { CREATE_COURSES } from '../../GRAPHQL/Mutation'
import { RNS3 } from 'react-native-aws3';


const initialTodoState = { name: '', description: '', image: '' }
const initialAppState = { showForm: false, imageURI: '' }

const index = () => {

  console.disableYellowBox = true;
  const { control, handleSubmit, watch } = useForm();

  const [createCourses, {
    data,
    loading,
    error }] = useMutation(CREATE_COURSES);


  const onRegisterPressed = async data => {
    console.log("pushImg")
    //pushImg()
    createCourses({
      variables: {
        newCoursesInput: {
          coursename: data.coursename,
          shortdescription: data.shortdescription,
          longdescription: data.longdescription,
          author: data.author,
          province: data.province,
          district: data.district,
          coursecapacity: data.coursecapacity,
          price: data.price,
          courselike: "",
          imageUrl: "",
          activeparticipant: ""
        }
      }
    });

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    } else if (error) {
      return (
        <View>
          <Text>Error</Text>
        </View>
      );
    } else {
      Alert.alert("Başarılı")
    }

  };

  const [pickerResponse, setPickerResponse] = useState(null);

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };


  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  console.log(uri)
  pushImg = async uri => {
    try {

    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }


  /************ */
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

    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: img,
      name: "image.png",
      type: "image/png"
    }

    const options = {
      keyPrefix: "uploads/",
      bucket: "clientmobile-storage-22ef2adf170406-dev",
      region: "eu-east-1",
      accessKey: "AKIAYIDIXI6DVKUKN6EU",
      secretKey: "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",
      successActionStatus: 201,
      method: "PUT" // default is POST
    }

    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
       *   }
       * }
       */
    });

    // return Storage.put(asset.uri, img, {
    //   level: 'public',
    //   contentType: asset.type,
    //   progressCallback(uploadProgress) {
    //     setProgressText(
    //       `Progress: ${Math.round(
    //         (uploadProgress.loaded / uploadProgress.total) * 100,
    //       )} %`,
    //     );
    //     console.log(
    //       `Progress: ${uploadProgress.loaded}/${uploadProgress.total}`,
    //     );
    //   },
    // })
    //   .then(res => {
    //     setProgressText('Upload Done: 100%');
    //     setAsset(null);
    //     setisLoading(false);
    //     Storage.get(res.key)
    //       .then(result => console.log(result))
    //       .catch(err => {
    //         setProgressText('Upload Error',err);
    //         console.log(err);
    //       });
    //   })
    //   .catch(err => {
    //     setisLoading(false);
    //     setProgressText('Upload Error',err);
    //     console.log(err);
    //   });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create a Course</Text>

        {/************** */}
        <View style={styles.container}>
          <TouchableOpacity onPress={selectFile}>
            <Text style={styles.button}>SELECT {asset ? 'ANOTHER' : ''} FILE</Text>
          </TouchableOpacity>
          {asset ? (
            asset.type.split('/')[0] === 'image' ? (
              <Image
                style={styles.selectedImage}
                source={{ uri: asset?.uri ?? '' }}
              />
            ) : (
              <Video
                style={styles.selectedImage}
                source={{ uri: asset?.uri ?? '' }}
              />
            )
          ) : null}
          {asset && (
            <>

              <TouchableOpacity onPress={uploadResource}>
                <Text style={styles.button}>UPLOAD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAsset(null)}>
                <Text style={styles.cancelButton}>Remove Selected Image</Text>
              </TouchableOpacity>
            </>
          )}
          <Text>{progressText}</Text>
        </View>

        {/* <Button title="Pick from Gallery" onPress={openGallery} />
      {
        uri && (
          <Image source={{uri}} style=
            {{height:400, width:400,margin:20}}>
          </Image>
        )
      } 

      <CustomButton
        text="Push Image"
        onPress={() => pushImg()}
      />     */}

        <CustomInput
          name="coursename"
          control={control}
          placeholder="Coursename"
          rules={{
            required: 'Coursename is required',
            minLength: {
              value: 3,
              message: 'Coursename should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Coursename should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="shortdescription"
          control={control}
          placeholder="shortdescription"
          rules={{
            required: 'shortdescription is required',
            minLength: {
              value: 3,
              message: 'shortdescription should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'shortdescription should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="longdescription"
          control={control}
          placeholder="LongDescription"
          rules={{
            required: 'LongDescription is required',
            minLength: {
              value: 3,
              message: 'LongDescription should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'LongDescription should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="author"
          control={control}
          placeholder="author"
          rules={{
            required: 'author is required',
            minLength: {
              value: 3,
              message: 'author should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'author should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="province"
          control={control}
          placeholder="Province"
          rules={{
            required: 'Province is required',
            minLength: {
              value: 3,
              message: 'Province should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Province should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="district"
          control={control}
          placeholder="District"
          rules={{
            required: 'District is required',
            minLength: {
              value: 3,
              message: 'District should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'District should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="coursecapacity"
          control={control}
          placeholder="Course Capacity"
          rules={{
            required: 'Course Capacity is required',
            minLength: {
              value: 3,
              message: 'Course Capacity should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Course Capacity should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="price"
          control={control}
          placeholder="Price"
          rules={{
            required: 'Price is required',
            minLength: {
              value: 3,
              message: 'Price should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Price should be max 24 characters long',
            },
          }}
        />


        <CustomButton
          text="Create a Course"
          onPress={handleSubmit(onRegisterPressed)}
        />

      </View>
    </ScrollView>
  );
};

export default index;


const styles = StyleSheet.create({
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
    width: 175,
    height: 200,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  // button: {
  //   alignItems: "center",
  //   backgroundColor: "#008000",
  //   padding: 10,
  //   marginBottom: 10
  // },
  // textInput: { height: 50 },
  // multilineInput: { height: 200, textAlignVertical: 'top', },
  // title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#008000' },
  // buttonText: { fontSize: 18, color: '#ffffff' },
  // todoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15, color: '#008000' },
  // todoDescription: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  // container: { flex: 1, justifyContent: 'center', padding: 20 },
  // todo: { marginBottom: 15, padding: 10, borderColor: '#008000', borderStyle: 'solid', borderWidth: 1 },
  // input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  // image: { width: 200, height: 200 },  image: { width: 200, height: 200 },
  // imageContainer: { alignItems: 'center', justifyContent: 'center', marginBottom: 10, flex: 1 }
})