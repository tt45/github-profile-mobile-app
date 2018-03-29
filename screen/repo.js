import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,Linking,AsyncStorage} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import {user} from './profile'

class Repo extends Component {
        constructor(){
           super();
           this.state = {
            datas:[]
           }
          }
          componentDidMount(){

              axios.get(user.url+"/repos")
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
                        {this.state.datas.map((repo) => (
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
                        ))}
                </ScrollView>
                </View>
          );
        }

}

export default Repo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection:'row',
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 20,
  },
});
