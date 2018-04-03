import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,Linking,AsyncStorage} from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import axios from 'axios';
import {user} from './profile'
import PieChart from 'react-native-pie-chart';

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


          populatePieChart(str){
                var ret_array = [[4],[3,2,1],[319,3,2,1,1,1,1],[2],[3]];
                if (str == 'chess-game') return ret_array[0]
                else if (str == 'cs440_mp3') return ret_array[1]
                else if (str == 'd3pie') return ret_array[2]
                else if (str == 'github-profile-mobile-app') return ret_array[3]
                else return ret_array[4]
                axios.get(url)
                        .then((res) => {
                                //console.log(res)
                                for (i=0; i<res.data.length; i++) {
                                        ret_array.push(res.data[i].contributions)
                                };
                                console.log(ret_array);
                        }).catch((err) => {
                                console.log(err)
                        });
                return ret_array;
          }

        render() {
                const chart_wh = 250
                const series = [123, 321, 123, 789] //replace this
                var sliceColor = []
                for (i=0; i<10; i++) {
                        color = ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
                        sliceColor.push(color)
                }

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
                                <PieChart
                                    chart_wh={chart_wh}
                                    series={this.populatePieChart(repo.name)}
                                    sliceColor={sliceColor}

                                    coverRadius={0.45}
                                    coverFill={'#FFF'}

                                  />
                                  <Text>
                                   Number of Contributors per contributor
                                  </Text>

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
