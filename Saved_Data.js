import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {

    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: []
    }

    this.arrayholder = [];
  }

  componentDidMount() {

    this.props.navigation.addListener('focus', () => {



      this.setState({
        data: []
      })


      AsyncStorage.getItem('ipaddress').then((ipaddress) => {


        const options = {


          url: 'http://' + ipaddress + ':5005/body_get',

          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },



        }

        //   console.log(options)
        axios(options)
          .then(response => {



            this.setState({
              isLoading: false,
              data: response.data,
            })


          })

      })
    }

    )



  }




  itemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          borderColor: 'grey',
        }}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={70}
            color={'#cc2b5e'}
          />
        </View>
      );
    }

    return (



      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View  >
          <Header style={{ backgroundColor: '#cc2b5e' }}>
            <Body>
              <Text style={{ fontSize: 20, color: 'white', padding: 10, fontWeight: 'bold' }}>Saved Patient Data</Text>
            </Body>
          </Header>

        </View>

        <View style={styles.MainContainer}>

          <View>
            <FlatList
              data={this.state.data}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.itemSeparator}
              renderItem={({ item }) => {
                return (

                  <View>


                    <ScrollView


                    >

                      <LinearGradient colors={['#cc2b5e', '#753a88']} style={styles.linearGradient}>


                        <Text style={styles.row}
                        >{item.body}</Text>
                      </LinearGradient>

                    </ScrollView>


                  </View>

                )



              }



              }
              style={{ marginTop: 5, }} />

          </View>




        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    alignContent: 'center'

  },

  row: {
    fontSize: 20,
    padding: 15,
    color: 'white',
    textAlign: 'center',
    // backgroundColor: 'red',
    fontFamily: 'Gill Sans Medium',
    borderRadius: 10,
    fontWeight: '900',
    // fontStyle:'italic'


  },

  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    borderRadius: 8,
    backgroundColor: "#FFFF",
    fontFamily: 'Gill Sans Medium',
    fontSize: 18


  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20
  },
});