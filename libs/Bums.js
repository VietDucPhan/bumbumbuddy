
import { AsyncStorage } from 'react-native';

class Bums {
  constructor(){
  }

  getBums(callback){
    var self = this;
    fetch('https://bumbuddy.herokuapp.com/api/get-bums',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return callback(responseJson);
    }).catch((error) => {
        return callback(null);
    });
  }
}

module.exports = Bums;
