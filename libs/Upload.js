
import {
  AsyncStorage
} from 'react-native';
import Sha1 from './Sha1';
var jsonDefault = {

  "links" : [
    // {
    //   "format": null,
    //   "animated": false,
    //   "width": null,
    //   "height": null,
    //   "size": null,
    //   "url": null,
    //   "uploaded_by": {
    //         "name": null,
    //         "email": null,
    //         "profile_picture": null,
    //         "type": null
    //     },
    // }
  ],
  "comments":[
    // {
    //   "commentor": {
    //         "name": null,
    //         "email": null,
    //         "profile_picture": null,
    //         "type": null
    //     },
    //     "content":null
    //     "datetime":null
    // }
  ],
  "likes":[],
  "created_by": {
        "name": null,
        "email": null,
        "profile_picture": null,
        "type": null
    },
    "coordinate": {
        "longitude": -122.02686333,
        "latitude": 37.32834322
    }
};

class Upload {
  constructor(){
  }

  /**
  @return json { public_id: 'dbmwb1guio83i7bcionl',
  	  version: 1471803488,
  	  signature: '7e8036a4afc2981ed5e114e9b836d0ab07874185',
  	  width: 500,
  	  height: 332,
  	  format: 'jpg',
  	  resource_type: 'image',
  	  created_at: '2016-08-21T18:18:08Z',
  	  tags: [],
  	  bytes: 247660,
  	  type: 'upload',
  	  etag: '69def6e0dcb51d29a80b4859344a3922',
  	  url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471803488/dbmwb1guio83i7bcionl.jpg',
  	  secure_url: 'https://res.cloudinary.com/dsthiwwp4/image/upload/v1471803488/dbmwb1guio83i7bcionl.jpg' }
  **/
  imageUploadToCloud(mediaData,userData,content, callback){
    var self = this;
    var timestamp = Date.now();
    var key = "timestamp=" + timestamp + '7YWoy9IjOttmpg7pNm-ejOjIg-s';
    var signature = Sha1.hash(key);

    fetch('https://api.cloudinary.com/v1_1/dsthiwwp4/image/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: 'data:image/jpeg;base64,' + mediaData.uri_raw,
        api_key: '955818184181287',
        timestamp:timestamp,
        signature:signature
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        jsonDefault.links.push({
            "format": responseJson.format,
            "animated": false,
            "width": responseJson.width,
            "height": responseJson.height,
            "size": responseJson.bytes,
            "url": responseJson.secure_url,
            "uploaded_by": userData
          });
        jsonDefault.comments.push({
          "commentor": userData,
              "content":content
        });
        jsonDefault.created_by = userData;
        jsonDefault.coordinate = mediaData.coordinate;
        self._uploadToHeroku(jsonDefault,function(err){
          return callback(err);
        })
      })
      .catch((error) => {
        console.error(error);
        return callback(false);

      });
  }
  _uploadToHeroku(data, callback){
    fetch('https://bumbuddy.herokuapp.com/api/create-bum',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("_uploadToHeroku",_uploadToHeroku);
        return callback(true);
      }).catch((error) => {
        return callback(false);
        console.log("_save error",error);
      });
  }
}

module.exports = Upload;
