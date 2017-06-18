import Comments from './comments';
import Profile from '../profile/profile';
import { StackNavigator, TabNavigator } from 'react-navigation';
const stacks  = StackNavigator({
  Home: { screen: Comments
  },
  Commentdetail: { screen: Profile },

},
{
  mode:'modal',
}

);
module.exports = stacks;
