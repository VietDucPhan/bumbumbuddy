import {
  AsyncStorage
} from 'react-native';

class Cache {
  constructor(){
    var self = this;
  }

  setUserSetting(data){
    var self = this;
    if(data){
      data.store_date = new Date();
      AsyncStorage.setItem("userSetting",JSON.stringify(data),function(err){
        //console.log('cache.set.err',err);
        if(!err){
          //console.log('cache.set',data);
          return true;
        } else{
          return false;
        }
      });
    } else {
      AsyncStorage.setItem("userSetting",JSON.stringify({
        radius:5
      }),function(err){
        //console.log('cache.set.err',err);
        if(!err){
          //console.log('cache.set',data);
          return true;
        } else{
          return false;
        }
      });
    }
  }

  getUserSetting(callback){
    AsyncStorage.getItem("userSetting",function(err,result){
      //console.log('getRating',err);
      var response = JSON.parse(result)
      if(result){
        return callback(response);
      } else{
        return callback({radius:5});
      }
    });
  }

  setRating(_id, data){
    var self = this;
    if(data && _id){
      data.store_date = new Date();
      AsyncStorage.setItem("rating-"+_id,JSON.stringify(data),function(err){
        //console.log('cache.set.err',err);
        if(!err){
          //console.log('cache.set',data);
          return true;
        } else{
          return false;
        }
      });
    } else {
      return false;
    }
  }

  getRating(_id,callback){
    if(_id && _id != null){
      AsyncStorage.getItem("rating-"+_id,function(err,result){
        //console.log('getRating',err);
        var response = JSON.parse(result)
        if(result){
          return callback(true,response);
        } else{
          return callback(false,null);
        }
      });
    }
  }

  setComments(_id, data){
    var self = this;
    if(data && _id){
      data.store_date = new Date();
      AsyncStorage.setItem("comment-"+_id,JSON.stringify(data),function(err){
        //console.log('cache.set.err',err);
        if(!err){
          console.log('cache.set',data);
          return true;
        } else{
          return false;
        }
      });
    } else {
      return false;
    }
  }

  getComments(_id,callback){
    if(_id && _id != null){
      AsyncStorage.getItem("comment-"+_id,function(err,result){
        var response = JSON.parse(result)
        if(result){
          return callback(true,response);
        } else{
          return callback(false,null);
        }
      });
    }
  }
}

module.exports = Cache;
