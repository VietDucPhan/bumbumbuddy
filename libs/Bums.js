
import { AsyncStorage } from 'react-native';

class Bums {
  constructor(){
    return true
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
  getBums_dev(callback){
    return callback([ { _id: '57a72110936fec1100018073',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 500,
	         height: 375,
	         size: 218936,
	         url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471837507/ZX5aRXJ_tmugro.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'Flower' } ],
	    likes: [],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: 106.69183122993778, latitude: 10.758347204336506 } },
	  { _id: '58023872bd67591100d21ceb',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 281,
	         height: 500,
	         size: 188565,
	         url: 'https://res.cloudinary.com/dsthiwwp4/image/upload/v1476540529/oixfcnx1sxlmbzbqsjvc.jpg',
	         uploaded_by:
	          { _id: '57fca5de4ce7a0110064ae6d',
	            name: 'Duc Viet Phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	            type: 'facebook',
	            iat: 1476538483 } } ],
	    comments:
	     [ { content: null,
	         _id: '58023872bd67591100d21cea',
	         commentor:
	          { _id: '57fca5de4ce7a0110064ae6d',
	            name: 'Duc Viet Phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	            type: 'facebook',
	            iat: 1476538483 } } ],
	    likes: [],
	    created_by: { name: null, email: null, profile_picture: null, type: null },
	    coordinate: { longitude: 106.69337591049951, latitude: 10.764810203376497 } },
	  { _id: '57b9f65dbb2aa411003e8404',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 333,
	         height: 500,
	         size: 218936,
	         url: 'https://res.cloudinary.com/dsthiwwp4/image/upload/v1471805011/ggmu8lyjmofpq5cjrtva.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'test' },
	       { commentor:
	          { name: 'Bert Arley',
	            email: 'abc@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'test number 2 but longer than bert expected to be the content so long that it had to down line' },
	       { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'test' },
	       { commentor:
	          { name: 'Bert Arley',
	            email: 'abc@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'test number 2 but longer than bert expected to be the content so long that it had to down line' } ],
	    likes: [],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: -122.01972916, latitude: 37.32697971 } },
	  { _id: '57fcb18732afc9110091e577',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 281,
	         height: 500,
	         size: 215660,
	         url: 'https://res.cloudinary.com/dsthiwwp4/image/upload/v1476178309/ovyruxmsrixrwipxfsw1.jpg',
	         uploaded_by:
	          { _id: '57fca5de4ce7a0110064ae6d',
	            name: 'Duc Viet Phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	            type: 'facebook' } } ],
	    comments:
	     [ { commentor:
	          { _id: '57fca5de4ce7a0110064ae6d',
	            name: 'Duc Viet Phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	            type: 'facebook' },
	         content: 'Something',
	         _id: '57fcb18732afc9110091e576' } ],
	    likes: [],
	    created_by:
	     { _id: '57fca5de4ce7a0110064ae6d',
	       name: 'Duc Viet Phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	       type: 'facebook' },
	    coordinate: { longitude: 106.69224068615684, latitude: 10.767948625030558 } },
	  { _id: '57a4aeb546bd11110064ec08',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 500,
	         height: 375,
	         size: 218936,
	         url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471837254/0AXBlyO_mzl6vi.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'BamSkaShop' } ],
	    likes: [],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: 106.69216436628983, latitude: 10.766637883719941 } },
	  { _id: '57a5fa279250941100df7e39',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 500,
	         height: 375,
	         size: 218936,
	         url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471837254/0AXBlyO_mzl6vi.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: 'BamSkaShop' } ],
	    likes: [],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: 106.69216436628983, latitude: 10.766637883719941 } },
	  { _id: '57a4bb846f33a6110086869b',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 500,
	         height: 375,
	         size: 218936,
	         url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471837083/jswWjYv_cneeia.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: '63 beer shop' } ],
	    likes:
	     [ { _id: '57fca5de4ce7a0110064ae6d',
	         name: 'Duc Viet Phan',
	         email: 'joomdaily@gmail.com',
	         profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	         type: 'facebook' } ],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: 106.70496996228299, latitude: 10.764927787313708 } } ])
  }
}


module.exports = Bums;
