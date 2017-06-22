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


class Rating extends Component {
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
      <View style={styles.container}>
        <View style={styles.bumDetailInfoHeaderContainer}>
          <View>
            <Text style={styles.bumInfoContainerNameText}>The Observatory</Text>
            <Text style={styles.bumInfoContainerAddressText}>write address here</Text>
          </View>
          <TouchableOpacity onPress={()=>console.log(Dimensions.get('window').width)}>
            <Icon style={{padding:5}} size={20} name="ios-more"/>
          </TouchableOpacity>
        </View>
        <View style={styles.overallRating}>
          <Text style={styles.overallRatingText}>Overall:</Text>
          <View style={styles.starRating}>
            <Icon style={styles.star} size={20} name="ios-star"/>
            <Icon style={styles.star} size={20} name="ios-star"/>
            <Icon style={styles.star} size={20} name="ios-star"/>
            <Icon style={styles.star} size={20} name="ios-star-outline"/>
            <Icon style={styles.star} size={20} name="ios-star-outline"/>
            <Text style={styles.star}> - 50 rates</Text>
          </View>
        </View>
        <View style={styles.bumRating}>
          <Text style={styles.bumRatingText}>Bum Rating:</Text>
          <View>
            <Text style={styles.bumRatingText}>Weak as fuck - 40 rates</Text>
            <Text style={styles.bumRatingText}>Gentle blow kiss - 10 rates</Text>
            <Text style={styles.bumRatingText}>Blow your ass up - 2 rates</Text>
            <Text style={styles.bumRatingText}>Anti-demontration - 0 rates</Text>
          </View>
        </View>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:"#fff",
    padding:5
  },
  bumDetailInfoHeaderContainer:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingBottom:5,
    borderBottomWidth:StyleSheet.hairlineWidth,
    marginBottom:5
  },
  bumInfoContainerNameText:{
    fontSize:14
  },
  bumInfoContainerAddressText:{
    fontSize:12
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
module.exports = Rating;
