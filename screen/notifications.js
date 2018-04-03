import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,Linking,Keyboard,TextInput,RefreshControl,AsyncStorage,Alert} from 'react-native';
import { Tile, List, ListItem, Button, Header } from 'react-native-elements';
import SearchBar from 'react-native-searchbar'
import axios from 'axios';
import {user} from './profile'
import Swipeout from 'react-native-swipeout';

class Notifications extends Component {
        constructor(){
           super();
           this.state = {
            datas:[]
           }
           this.componentDidMount = this.componentDidMount.bind(this)
          }

          componentDidMount(){
                  axios({
                          url: 'https://api.github.com/notifications',
                          method:'get',
                          auth: {
                              username: 'tt45',
                              password: 'thompson123'
                      }
                  }).then((response)=> {
                          this.setState({datas:response.data});
                          console.log(response.data)

                  }).catch((error) => {
                          console.log(error)
                  });
            }

            markRead(data) {
                    axios({
                            url: data.url+'/notifications',
                            method:'put',
                            auth: {
                                username: '',
                                password: ''
                        }
                    }).then(function(response) {
                            //console.log(response, "hasai");
                     }).catch(function(error) {
                       console.log(error)
                    })

                  var array = this.state.datas;
                  var index = array.indexOf(data)
                  array.splice(index, 1);
                    this.setState({
                           datas: array
                         })
            }


        render() {
          return (
                <View style={styles.container}>
                <ScrollView>
                        {this.state.datas.map((notification) => (
                                <Swipeout right={[{
                                                      text: 'Read',
                                                      backgroundColor: 'blue',
                                                      onPress: () => { this.markRead(notification) }
                                                    }]}
                                        autoClose = {true}
                                         backgroundColor= 'transparent'
                                         key={notification.id}
                                         >
                                <ListItem
                                 key={notification.id}
                                 title={notification.subject['title']}
                                 hideChevron
                                 //rightTitle={follower.login}
                                />
                                </Swipeout>

                        ))}
                </ScrollView>
                </View>
        );
        }

}

export default Notifications;

const styles = StyleSheet.create({
  container: {
          flex: 1,
          backgroundColor: '#fff',
          //alignItems: 'center',
          justifyContent: 'center',

  },
});
