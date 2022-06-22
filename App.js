import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Navigation from './src/navigation';
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
   

Amplify.configure(config);
const client = new ApolloClient({
  link: new HttpLink({
  uri: "http://localhost:3333/graphql",
   }),
  cache: new InMemoryCache(),
 });
 
    

const App = () => {
  // Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
      <ApolloProvider client={client}> 
          <Navigation /> 
      </ApolloProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;