import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

import { secretKey, publicKey} from './config';


export default class App extends React.Component {

  state ={
    isLoading:true,
    images: []
  }
  loadImages = () => {
      fetch(`https://api.unsplash.com/photos/?client_id=${publicKey}`).then(
       data => {
          console.log(data);
          this.setState({
            image: data,
            isLoading: false
          })
       }).catch(err => {
         console.log(err);
       }).finally(() => {
         console.log("Completed request");
       })
  }
  componentDidMount = () =>{
    this.loadImages();
  }
  render() {
    return (
      this.state.isLoading ? 
      <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center' }}>
        <ActivityIndicator size='large' color="gray" />
      </View> 
      :
      <View style={{flex:1, backgroundColor:'white', alignItems:'center', justifyContent:'center' }}>
        <FlatList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
  },
});
