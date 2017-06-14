import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BumBuddyTabs = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  },


  render() {
    return (
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)} style={styles.tab}>
            <Icon
              name={this.props.activeTab === i ? tab.substring( 0, tab.indexOf("-outline")) : tab }
              size={30}
              ref={(icon) => { this.tabIcons[i] = icon; }}
            />
          </TouchableOpacity>;
        })}
      </View>
    )
  },
});


const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom:5,

  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderTopColor:'#ccc',
    borderTopWidth:StyleSheet.hairlineWidth,
  },
});

export default BumBuddyTabs;
