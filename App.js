import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native';
import axios from 'axios';
import {  publicKey} from './config';

const { height, width} = Dimensions.get('window');

export default class App extends React.Component {

  state ={
    isLoading:true,
    images: []
  }
  loadImages = () => {
       axios
       .get(`https://api.unsplash.com/photos/random?count=30&client_id=${publicKey}`)
       .then((response) => {
           console.log(response.data);
           this.setState({ images: response.data, isLoading: false });
         }
       )
       .catch((error) => {
         console.log(error);
       })
       .finally( () => {
         console.log('request completed');
       });
  }
  renderItem(image) {
    return <View style={{ height, width }}> <Image style={{flex:1,height:null, width:null}} source={{uri: image.urls.regular}}  /></View>
  }
  componentDidMount = () =>{
    this.loadImages();
  }
  render() {
    console.log("Data", this.state.images);
    return (
      this.state.isLoading ? 
      <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center' }}>
        <ActivityIndicator size='large' color="gray" />
      </View> 
      :
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <FlatList
        horizontal
        pagingEnabled
        data={this.state.images}
        renderItem={({ item }) => this.renderItem(item)}
        keyExtractor={item => item.id}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
  },
});
