import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Home from "./Home";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
  state = {
    username: "",
    password: "",
    ipaddress: "",
    flag: 0
  }

  login = () => {



    if (this.state.ipaddress != "") {


      if (this.state.username == "Test" && this.state.password == "test") {

        this.setState({ flag: 1 })
        AsyncStorage.setItem("ipaddress", this.state.ipaddress)
      }

      else {

        alert("Username and password is incorrects")
      }

    }

    else {
      alert("Ip Address is required")

    }

  }


  render() {

    if (this.state.flag == 0) {
      return (

        <View style={styles.container}>
          <LinearGradient colors={['#09b2e6', '#753a88']} style={styles.linearGradient}>

            <Text style={styles.logo}>Human Health Monitor</Text>
            <View style={styles.inputView} >
              <TextInput
                style={styles.inputText}
                placeholder="Username"
                placeholderTextColor="grey"
                onChangeText={text => this.setState({ username: text })} />
            </View>
            <View style={styles.inputView} >
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="grey"
                onChangeText={text => this.setState({ password: text })} />
            </View>

            <View style={styles.inputView} >
              <TextInput
                keyboardType="numeric"
                style={styles.inputText}
                placeholder="IP address"
                placeholderTextColor="grey"
                onChangeText={text => this.setState({ ipaddress: text })} />
            </View>

            <TouchableOpacity style={styles.loginBtn}
              onPress={this.login}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

          </LinearGradient>

        </View>

      );

    }

    else {

      return (

        <Home
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#11eded",
    marginBottom: 80
  },
  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black",
    fontSize: 18
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#11eded",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 20
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
