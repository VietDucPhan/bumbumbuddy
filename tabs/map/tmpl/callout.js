import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  StyleSheet,
  AppRegistry,
  View,
  Dimensions,
  TouchableOpacity,
  Navigator,
  Text,
  ScrollView,
  Image
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RatingView from '../../bums/tmpl/rating';


class Callout extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  componentWillMount() {
  }
  //{uri:self.props.bum.links[0].url}
  render() {
    var self = this;
    return(
      <MapView.Marker
        coordinate={self.props.bum.coordinate}
      >
        <MapView.Callout
          tooltip={false}
          onPress={function(){
            self.props.goToBumDetail();
          }}
        >
          <View style={styles.container}>
            <RatingView/>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    );

  }
}
const styles = StyleSheet.create({
  container:{
    width:250
  },
  imageContainer:{
    backgroundColor:'#888'
  },
  bumInfoContainer:{
    marginBottom:10,
  },
  bumInfoContainerNameText:{
    fontSize:12
  },
  bumInfoContainerAddressText:{
    fontSize:10
  },
  starRating:{
    flexDirection:'row',
    alignItems:'center'
  },
  star:{
    color:"#888",
  },
  overallRating:{
    flexDirection:'column'

  },
  overallRatingText:{
    marginRight:5,
    color:"#888",
  },
  bumRating:{
    flexDirection:'column'
  },
  bumRatingText:{
    color:"#888"
  },
  imageProfile:{
    width:250,
    height: 250
  }

});
module.exports = Callout;
