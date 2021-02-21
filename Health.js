import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
const { width, height } = Dimensions.get("screen");
import MQTT from 'react-native-mqtt-new';


export default function PatientHealthStatus(props) {
  const [heart, setheart] = useState("...");
  const [oxidtion, setoxidtion] = useState("...");
  const [temperature, settemperature] = useState("...");
  const [respiration, setrespiration] = useState("...");
  const [flag, setflag] = useState(0)



  useEffect(() => {

    if (flag == 0) {

      setflag(1)

      MQTT.createClient({
        uri: 'mqtt://broker.hivemq.com:1883',
        clientId: 'your_client_id'
      }).then(function (client) {

        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          // console.log('+++++++++++++++mqtt.event.message ++++++++++++++++++++++++', msg);
          console.log(msg.data)
          var mqttvalue = msg.data;
          var splits = mqttvalue.split(",");

          setheart(splits[2])
          setoxidtion(splits[3])
          settemperature(splits[4])
          setrespiration(splits[5])


        });

        client.on('connect', function () {
          console.log('connected');
          client.subscribe('/tcs6767', 2);

        });

        client.connect();
      }).catch(function (err) {
        console.log(err);
      });

    }

  });


  return (



    <View style={{ flex: 1 }} >


      <View >
        <Header style={{ backgroundColor: '#1187ba' }}>
          <Body>
            <Text style={{ fontSize: 20, color: 'white', padding: 10, fontWeight: 'bold' }}>Health  Information</Text>
          </Body>
        </Header>
      </View>




      <View style={{ flex: 1, flexDirection: 'column', padding: 10, marginTop: 20 }}>

        {

          temperature > 38 && heart < 50 ? (
            <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>Disease Prediction : Heart Attack </Text>

          ) : oxidtion < 93 && respiration !== "Normal" ? (

            <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>Disease Prediction : Asthma </Text>

          ) : (

                <Text style={{ fontSize: 20, color: 'red', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>Disease Prediction : Normal </Text>

              )
        }




        <LinearGradient colors={['#cc2b5e', '#753a88']} style={styles.linearGradient}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Image
                style={{ width: 65, height: 80, left: 10 }}
                source={require('./temp.png')}
                resizeMode={'contain'}

              />

              <Text style={styles.buttonText}>
                Temperature
</Text>
            </View>

            {
              temperature > 38 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                    {temperature} °C
                </Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                    Heavy Fever
                </Text>
                </View>

              ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                      {temperature} °C
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                      Normal
                    </Text>
                  </View>)

            }
          </View>
        </LinearGradient>





        <LinearGradient colors={['#ff5f6d', '#ffc371']} style={styles.linearGradient}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Image
                style={{ width: width * 0.2, height: 50 }}
                source={require('./heart.png')}
                resizeMode={'contain'}
              />

              <Text style={styles.buttonText}>
                Heart Rate
  </Text>
            </View>

            {
              heart < 50 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                    {heart} Bpm  </Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                    Arrhythmias
                </Text>
                </View>

              ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                      {heart} Bpm  </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                      Normal
                    </Text>
                  </View>

                )

            }
          </View>
        </LinearGradient>
        <LinearGradient colors={['#06beb6', '#48b1bf']} style={styles.linearGradient}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Image
                style={{ width: width * 0.2, height: 50, left: 3 }}
                source={require('./resp.png')}
                resizeMode={'contain'}

              />

              <Text style={styles.buttonText}>
                Respiration
  </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                {respiration}
              </Text>
            </View>
          </View>
        </LinearGradient>




        <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.linearGradient}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
              <Image
                style={{ width: width * 0.2, height: 50 }}
                source={require('./oxidation.png')}
                resizeMode={'contain'}

              />

              <Text style={styles.buttonText}>
                Oxidation
  </Text>
            </View>

            {
              oxidtion < 93 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                    {oxidtion} %
              </Text>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                    Hypoxemia
                    </Text>
                </View>

              ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans' }}>
                      {oxidtion} %
                  </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', textAlign: 'center', fontFamily: 'Gill Sans', fontStyle: 'italic' }}>
                      Normal
                    </Text>
                  </View>
                )}
          </View>
        </LinearGradient>


      </View>
    </View>

  )
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: 'bold'
  },
  buttonText2: {
    fontSize: 35,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});