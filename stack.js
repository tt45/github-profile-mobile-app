import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './screen/profile';
import Repo from './screen/repo';
import Following from './screen/following';
import Follower from './screen/follower';
import Starred from './screen/starred_repo';
import Notifications from './screen/notifications'


export const ProfileStack = StackNavigator({

        Profile: {
                screen: Profile,
                navigationOptions: {
                        title: 'Profile',
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />,
                },
        },
        Notifications: {
          screen: Notifications,
          navigationOptions: ({ navigation }) => ({
                  title: 'Notifications',
          }),
        },



});

export const Tabs = TabNavigator({
  Profile: {
          screen: ProfileStack,
          navigationOptions: {
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />,
          },
  },
  Repo: {
          screen: Repo,
          navigationOptions: {
                  title: 'Repositories',
                  tabBarIcon: ({ tintColor }) => <Icon name="book-open" size={35} color={tintColor} />,


          },
  },
  Following: {
          screen: Following,
          navigationOptions: {
                  title: 'Following page',
                  tabBarIcon: ({ tintColor }) => <Icon name="human-handsup" size={35} color={tintColor} />,

          },
  },
  Follower: {
          screen: Follower,
          navigationOptions: {
                  title: 'Follower page',
                  tabBarIcon: ({ tintColor }) => <Icon name="human-handsdown" size={35} color={tintColor} />,

          },

  },
  Starred: {
          screen: Starred,
          navigationOptions: {
                  title: 'Starred repos',
                  tabBarIcon: ({ tintColor }) => <Icon name="star" size={35} color={tintColor} />,

          },
  }
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Stack: {
    screen: ProfileStack,
  },

}, {
  mode: 'modal',
  headerMode: 'none',
});
