import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,Linking,Keyboard,TextInput,RefreshControl,AsyncStorage,Alert} from 'react-native';
import { Tile, List, ListItem, Button, Header } from 'react-native-elements';
import SearchBar from 'react-native-searchbar'
import axios from 'axios';
import {user} from './profile'
import Swipeout from 'react-native-swipeout';

class following extends Component {
        constructor(){
           super();
           this.state = {
            datas:[],
            refreshing: false,
           }
          }
          componentDidMount(){

              axios.get(user.url+"/following")
                .then((res) => {
                  AsyncStorage.setItem('data', JSON.stringify(res.data));
                  this.setState({datas:res.data});
                });

                AsyncStorage.getItem('data').then((value) => this.setState({ 'data': value }));

            }

            followUser(text){
                    axios({
                            url: 'https://api.github.com/user/following/'+text,
                            method:'put',
                            auth: {
                                username: '',
                                password: ''
                        }
                    }).then(function(response) {
                            console.log(response, "hasai");
                     }).catch(function(error) {
                             Alert.alert(
                                  'User does not exist',
                                  '',
                                  [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ],
                                  { cancelable: false }
                                )
                             console.log(error)
                    })

                    axios.get("https://api.github.com/users/"+text)
                      .then((res) => {
                              var joined = this.state.datas.concat(res.data);
                              this.setState({ datas: joined })
                      }).catch(function(error) {

                      })


            }
            _onRefresh() {
                    /*this.setState({refreshing: true});
                    axios.get(user.url+"/following")
                      .then((res) => {
                        this.setState({datas:res.data});
                        this.setState({refreshing: false});
                        console.log(res.data)
                });*/
                  }

            deleteUser(data) {
                    axios({
                            url: 'https://api.github.com/user/following/'+data.login,
                            method:'delete',
                            auth: {
                                username: '',
                                password: ''
                        }
                    }).then(function(response) {
                            console.log(response, "hasai");


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
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor="black"
                  colors={['transparent']}
                />
                <TextInput
                       style={styles.TextInputStyleClass}
                       onSubmitEditing={(event) => this.followUser(event.nativeEvent.text)}
                       //value={this.state.text}
                       keyboardType="default"
                       underlineColorAndroid='transparent'
                       placeholder="Search Here"
                />

                        {this.state.datas.map((following) => (
                                <Swipeout right={[{
                                                      text: 'Unfollow',
                                                      backgroundColor: 'red',
                                                      onPress: () => { this.deleteUser(following) }
                                                    }]}
                                        autoClose = {true}
                                         backgroundColor= 'transparent'
                                         key={following.login}
                                         >
                                <ListItem


                                 title={following.login}
                                 //rightTitle={following.login}
                                 roundAvatar
                                 avatar={{ uri: following.avatar_url }}
                                 onPress={() =>
                                         Linking.openURL(following.html_url).catch(err => console.error('An error occurred', err))
                                 }
                                />

                                </Swipeout>


                        ))}

                </ScrollView>
                </View>

          );
        }

}

export default following;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,

  },
  TextInputStyleClass:{
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
   }
});
