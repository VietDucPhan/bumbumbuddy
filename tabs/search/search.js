
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
  TextInput
 } from 'react-native';
 var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

class commentdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      seachText:"",
      bums:[]
    };
    this._searchInputChangeText.bind(this);
  }
  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-search' : 'ios-search-outline'} />
    )
  };

  _searchInputChangeText(text){
    var self = this;
    self.setState({
      seachText:text
    });
  }
  componentDidMount(){
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <Icon size={20} name={'ios-search-outline'} />
          <TextInput
            multiline = {false}
            style={styles.searchInput}
            onChangeText={(text) => this._searchInputChangeText(text)}
            placeholder={'Where are you?'}
            value={this.state.seachText}
          />
        </View>

          <ScrollView style={styles.bumsAround}>
            <View style={styles.addNewBumContainer}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('BumDetail',{bumID:1})}>
                <View style={styles.addNewBumContentContainer}>
                  <Icon style={styles.bumIcon} size={30} name={'ios-woman'} />
                  <Text>The Observatory</Text>
                </View>
              </TouchableOpacity>
            </View>

            {this.state.seachText != "" &&
              <View style={styles.addNewBumContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateBumForm',{bumID:0,bumNameText:this.state.seachText})}>
                  <View style={styles.addNewBumContentContainer}>
                    <Icon style={styles.addNewIcon} size={30} name={'ios-add-circle-outline'} />
                    <Text>Add "{this.state.seachText}" to bum collection</Text>
                  </View>
                </TouchableOpacity>
              </View>
              }
          </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingRight:5,
    paddingLeft:5
  },
  searchInputContainer:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    alignItems:'center'

  },
  searchInput: {
    height: 40,
    paddingLeft:5,
    paddingRight:5,
    width:width
  },
  addNewBumContainer:{
    flex:1,
    paddingTop:5,
    paddingBottom:5,
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#ccc',
    borderStyle:'solid'
  },
  addNewBumContentContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  bumsAround: {
    flex:1
  },
  bumIcon:{
    paddingTop:5,
    paddingRight:15,
    paddingBottom:5,
    paddingLeft:15,
    borderRightWidth:StyleSheet.hairlineWidth,
    borderRightColor:'#ccc',
    marginRight:10,
    borderStyle:'dotted'
  },
  addNewIcon:{
    paddingTop:5,
    paddingRight:15,
    paddingBottom:5,
    paddingLeft:15,
    borderStyle:'dotted',
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:'#ccc',
    marginRight:10
  }
});
module.exports = commentdetail;
