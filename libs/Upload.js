
import {
  AsyncStorage,
  Platform
} from 'react-native';
import Sha1 from './Sha1';
import RNFetchBlob from 'react-native-fetch-blob';
class Upload {
  constructor(){
    this.api_key = '955818184181287';
    this.appendix_key = '7YWoy9IjOttmpg7pNm-ejOjIg-s';
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
  imageUploadToCloud(mediaData,callback){
    var self = this;
    var timestamp = Date.now();
    var signature = Sha1.hash("timestamp=" + timestamp + self.appendix_key);
    RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dsthiwwp4/image/upload',
    {
      'Content-Type': 'multipart/form-data',
    },
    [
      { name: 'file', data: mediaData.uri },
      {name: 'api_key', data: self.api_key},
      {name: 'timestamp', data: timestamp.toString()},
      {name: 'signature', data: signature}
    ]).then((response) => response.json())
      .then((responseJson) => {
        return callback(responseJson);
      })
      .catch((err) => {
      return callback({
          errors:
          [
            {
              status:'m009',
              source:{pointer:"libs/upload.imageUploadToCloud"},
              title:"Could not upload image",
              detail:error.message
            }
          ]
        });
    });
    // fetch('https://api.cloudinary.com/v1_1/dsthiwwp4/image/upload', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     file: mediaData.uri,
    //     api_key: '955818184181287',
    //     timestamp:timestamp,
    //     signature:signature
    //   })
    // }).then((response) => response.json())
    //   .then((responseJson) => {
    //     return callback(responseJson);
    //   })
    //   .catch((error) => {
    //     console.log("upload.imageUploadToCloud.error",error);
    //     return callback({
    //       errors:
    //       [
    //         {
    //           status:'m009',
    //           source:{pointer:"libs/upload.imageUploadToCloud"},
    //           title:"Could not upload image",
    //           detail:error.message
    //         }
    //       ]
    //     });

    //   });
  }

  async videoUploadToCloud(mediaData,callback){
    var self = this;
    var timestamp = Date.now();
    var signature = Sha1.hash("timestamp=" + timestamp + self.appendix_key);
    var uriArr = mediaData.uri.split("/");
    var lastIndex = uriArr.length - 1;

    if(Platform.OS === "ios"){
      mediaData.uri = mediaData.uri.replace("file://","");
    }
    RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/dsthiwwp4/video/upload',
    {
      'Content-Type': 'multipart/form-data',
    },
    [
      {name: 'file', filename: uriArr[lastIndex], data: RNFetchBlob.wrap(mediaData.uri)},
      {name: 'api_key', data: self.api_key},
      {name: 'timestamp', data: timestamp.toString()},
      {name: 'signature', data: signature}
    ]).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return callback(responseJson);
      }).catch((err) => {
      console.log(err);
      return callback(false,err);
    });
  }

  uploadProfilePictureUsingUrl(url,public_id,callback){
    var self = this;
    var timestamp = Date.now();
    var key = 'public_id='+public_id+'&timestamp=' + timestamp + '7YWoy9IjOttmpg7pNm-ejOjIg-s';
    var signature = Sha1.hash(key);
    //console.log("upload.imageUploadToCloud",mediaData);
    fetch('https://api.cloudinary.com/v1_1/dsthiwwp4/image/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: url,
        api_key: '955818184181287',
        timestamp:timestamp,
        signature:signature,
        public_id:public_id
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        return callback(responseJson);
      })
      .catch((error) => {
        console.log("upload.imageUploadToCloud.error",error);
        return callback({
          errors:
          [
            {
              status:'m009',
              source:{pointer:"libs/upload.imageUploadToCloud"},
              title:"Could not upload image",
              detail:error.message
            }
          ]
        });

      });
  }
}

module.exports = Upload;
