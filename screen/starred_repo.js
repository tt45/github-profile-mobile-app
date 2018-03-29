import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet, Linking,Keyboard, TextInput, RefreshControl,Alert} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import SearchBar from 'react-native-searchbar'
import axios from 'axios';
import {user} from './profile'
import Swipeout from 'react-native-swipeout';

class Starred extends Component {
        constructor(){
           super();
           this.state = {
            datas:[],
            refreshing: false,
           }
          }
          componentDidMount(){

              axios.get(user.url+"/starred")
                .then((res) => {
                  this.setState({datas:res.data});
                });
            }

            followRepo(text){
                    axios({
                            url: 'https://api.github.com/user/starred/'+text,
                            method:'put',
                            auth: {
                                username: 'tt45',
                                password: 'thompson123'
                        }
                    }).then(function(response) {
                            console.log(response, "hasai");


                     }).catch(function(error) {
                             Alert.alert(
                                  'Repo does not exist',
                                  '',
                                  [
                                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                                  ],
                                  { cancelable: false }
                                )
                       console.log(error)
                    })
                    axios.get("https://api.github.com/repos/"+text)
                      .then((res) => {
                              var joined = this.state.datas.concat(res.data);
                              this.setState({ datas: joined })
                      }).catch(function(error){

                      });

            }

            _onRefresh() {
                    /*this.setState({refreshing: true});
                    axios.get(user.url+"/starred")
                      .then((res) => {
                        this.setState({datas:res.data});
                        this.setState({refreshing: false});
                        console.log(res.data)
                });*/
                  }

                  deleteRepo(data) {
                          axios({
                                  url: 'https://api.github.com/user/starred/'+data.full_name,
                                  method:'delete',
                                  auth: {
                                      username: '', //username
                                      password: '' //password
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
                             onSubmitEditing={(event) => this.followRepo(event.nativeEvent.text)}
                             //value={this.state.text}
                             keyboardType="default"
                             underlineColorAndroid='transparent'
                             placeholder="Search Here"
                      />
                              {this.state.datas.map((repo) => (
                              <Swipeout right={[{
                                                    text: 'Delete',
                                                    backgroundColor: 'red',
                                                    onPress: () => { this.deleteRepo(repo) }
                                                  }]}
                                      autoClose = {true}
                                       backgroundColor= 'transparent'
                                       key={repo.name}
                                       >
                              <List key={repo.name}>

                                      <ListItem
                                       title="Repository Name"
                                       subtitle={repo.name}

                                       onPress={() =>
                                               Linking.openURL(repo.html_url).catch(err => console.error('An error occurred', err))
                                       }
                                      />
                                      <ListItem
                                       title="Github Username"
                                       rightTitle={repo.owner.login}
                                       hideChevron

                                      />
                                      <ListItem
                                       title="Description"
                                       rightTitle={repo.description}
                                       hideChevron
                                       rightTitleNumberOfLines={0}
                                      />

                              </List>
                              </Swipeout>
                              ))}
                      </ScrollView>
                      </View>
                );
        }

}

export default Starred;

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
