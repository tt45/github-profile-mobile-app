import React, { Component } from 'react';
import {Text,View,ScrollView, StyleSheet,AsyncStorage} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import axios from 'axios';

export const user = {"url":"https://api.github.com/users/tt45"};

class Profile extends Component {
        constructor(){
           super();
           this.state = {
            data:{}
           }
          }

          componentDidMount(){

              axios.get(user.url)
                .then((res) => {
                  AsyncStorage.setItem('data', JSON.stringify(res.data));
                  this.setState({data:res.data});
                });

                AsyncStorage.getItem('data').then((value) => this.setState({ 'data': value }));

            }

        render() {
                //console.log(this.state.data)
          const { navigate } = this.props.navigation;
          return (
                  <View style={styles.container}>
                <ScrollView >
                        <Tile
                         imageSrc={{ uri: this.state.data['avatar_url']}}
                         featured
                        />
                        <List>
                                <ListItem
                                 title="Name"
                                 rightTitle={this.state.data['login']}//{this.props.email}

                                 hideChevron
                                />
                                <ListItem
                                 title="Github Name"
                                 rightTitle={this.state.data['login']}
                                 hideChevron
                                />
                                <ListItem
                                 title="Bio"
                                 rightTitle={this.state.data['bio']}
                                 titleNumberOfLines={0}
                                 rightTitleNumberOfLines={0}
                                 hideChevron
                                />
                                <ListItem
                                 title="WebSite"
                                 rightTitle={this.state.data['html_url']}
                                 hideChevron
                                />
                                <ListItem
                                 title="Email"
                                 rightTitle={this.state.data['email']}
                                 rightTitleNumberOfLines={0}
                                 hideChevron
                                />
                                <ListItem
                                 title="Public Repos Page"
                                 //rightTitle={''+this.state.data['public_repos']}
                                 onPress={() =>
                                         navigate('Repo') //navigate('Follower', { name: 'Jane' })
                                 }
                                />
                                <ListItem
                                 title="Followers Page"
                                 //rightTitle={''+this.state.data['followers']}
                                 rightTitleNumberOfLines={0}
                                 onPress={() =>
                                         navigate('Follower')
                                 }
                                />
                                <ListItem
                                 title="Following Page"
                                 //rightTitle={''+this.state.data['following']}
                                 onPress={() =>
                                         navigate('Following')
                                 }
                                />
                                <ListItem
                                 title="Profile Create Date"
                                 rightTitle={this.state.data['created_at']}
                                 hideChevron

                                />
                          </List>
                  </ScrollView>
                  </View>
          );
        }

}



export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexWrap: "wrap",
    flexDirection:'row',
  },
});
