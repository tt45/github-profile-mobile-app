import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from './screen/profile';
import Repo from './screen/repo';
import Following from './screen/following';
import Follower from './screen/follower';
import Starred from './screen/starred_repo';

export const Stack = StackNavigator({
  Profile: {
          screen: Profile,
  },
  Repo: {
          screen: Repo,
          navigationOptions: {
                  title: 'Repositories',
          },
  },
  Following: {
          screen: Following,
          navigationOptions: {
                  title: 'Following page',
          },
  },
  Follower: {
          screen: Follower,
          navigationOptions: {
                  title: 'Follower page',
          },
  }
  /*Starred: {
          screen: Starred,
          navigationOptions: {
                  title: 'Starred repos',
          },
  },*/
});

export const Tabs = TabNavigator({
  Profile: {
          screen: Profile,
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
    screen: Stack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
