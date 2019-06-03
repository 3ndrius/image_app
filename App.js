import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import {  publicKey } from './config';

const { height, width} = Dimensions.get('window');

export default class App extends React.Component {

  state ={
    isLoading:true,
    images: [],
    scale: new Animated.Value(1),
    isImageFocused: false
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
         console.log("Work");
       });
  }
  this.state.scale = {
    transform: [{scale: this.state.scale}]
  }
  showControls = (item) => {
    this.setState((state) => {
      isImageFocused: !state.isImageFocused
    }),()=> {
      if(this.state.isImageFocused) {
        Animated.spring(this.state.scale, {
          toValue: 0.8
        }).start()
      }
      else{
        Animated.spring(this.state.scale, {
          toValue:1
        }).start()
      }
    }
  }
  renderItem = ({item}) => {
    return <View style={{ height, width }}><Image style={{flex:1,height:null, width:null}} source={{uri:item.urls.regular}}/></View>
   
  }
  componentDidMount = () =>{
    this.loadImages();
  }
  render() {
  
    return (
      this.state.isLoading ? 
      <View style={{flex:1, backgroundColor:'black', alignItems:'center', justifyContent:'center' }}>
        <ActivityIndicator size='large' color="gray" />
      </View>:
      <TouchableWithoutFeedback onPress={() => {showControls(item)}}>
      <Animated.View style={[{flex: 1, backgroundColor: 'white' }, this.scale]}>
      <FlatList
        horizontal
        pagingEnabled
        data={this.state.images}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}/>
        </Animated.View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
  },
});
