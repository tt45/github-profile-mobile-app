import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet,Linking,AsyncStorage} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import {user} from './profile'

class Follower extends Component {
        constructor(){
           super();
           this.state = {
            datas:[]
           }
          }
          componentDidMount(){

              axios.get(user.url+"/followers")
                .then((res) => {
                  AsyncStorage.setItem('data', JSON.stringify(res.data));
                  this.setState({datas:res.data});
                });

              AsyncStorage.getItem('data').then((value) => this.setState({ 'data': value }));

            }
        render() {
          return (
                <View style={styles.container}>
                <ScrollView>
                        {this.state.datas.map((follower) => (

                                <ListItem
                                 key={follower.login}
                                 title={follower.login}
                                 //rightTitle={follower.login}
                                 roundAvatar
                                 avatar={{ uri: follower.avatar_url }}
                                 onPress={() =>
                                         Linking.openURL(follower.html_url).catch(err => console.error('An error occurred', err))
                                 }
                                />


                        ))}
                </ScrollView>
                </View>
          );
        }

}

export default Follower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 25,
  },
});
