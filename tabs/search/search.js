
import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  View,
  Dimensions,
  TouchableOpacity,
  Navigator,
  Text,
  ScrollView,
  Image,
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class commentdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      bums:null
    }
  }
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-search' : 'ios-search-outline'} />
    ),
    headerMode:'none'
  };
  componentDidMount(){
  }

  render() {
    return(
      <View>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <ScrollView>
        </ScrollView>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    commentPointsAndResponseButton:{
      borderWidth:StyleSheet.hairlineWidth,
      color:'#888',
      borderColor:'#ccc',
      paddingTop:5,
      paddingRight:10,
      paddingBottom:5,
      paddingLeft:10,
      marginRight:5
    }
  });
module.exports = commentdetail;
