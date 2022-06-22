import React from 'react';
import {View, Text} from 'react-native'; 
import { useQuery } from "@apollo/client";
import {COURSES_QUERY} from '../../GRAPHQL/Query'


const index = () => {
  console.disableYellowBox = true;
  const { error, loading, data } = useQuery(COURSES_QUERY);
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
    console.log(data.coursesList);
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 24, alignSelf: 'center'}}>{data.coursesList[0].courseAuthor}</Text>
         
      </View>
    );
  }

  
};

export default index;