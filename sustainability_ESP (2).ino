#include <ESP8266WiFi.h> // Enables the ESP8266 to connect to the local network (via WiFi)
#include <PubSubClient.h> // Allows us to connect to, and publish to the MQTT broker

const int ledPin = 2; // This code uses the built-in led for visual feedback that the button has been pressed

// WiFi
// Make sure to update this for your own WiFi network!
const char* ssid = "SIEORA";
const char* wifi_password = "sieora@123";

// MQTT
// Make sure to update this for your own MQTT Broker!
const char* mqtt_server = "broker.hivemq.com";
//const char* mqtt_topic = "energy_meter/power_cut";
const char* mqtt_topic1 = "/tcs6767";
const char* mqtt_topic2 = "/tcs6768";
const char* mqtt_topic3 = "/tcs6769";
const char* mqtt_topic4 = "/tcs6770";
const char* mqtt_topic5 = "/tcs6771";
const char* mqtt_topic6 = "/tcs6772";
const char* mqtt_topic7 = "/tcs6773";
const char* mqtt_topic8 = "/tcs6774";
const char* mqtt_topic9 = "/tcs6775";
const char* mqtt_topic10 = "/tcs6776";
// The client id identifies the ESP8266 device. Think of it a bit like a hostname (Or just a name, like Greg).
const char* clientID = "air_pollution";

// Initialise the Pushbutton Bouncer object
//Bounce bouncer = Bounce();

String data, no_of_sensor, sensor;

char char_data[50];
char* sensor_1;
char* sensor_2;
char* sensor_3;
//char* glucose;
//char* weight;
int get_data = 0, i = 0, a = 0, b = 0, flag = 0, data_sent = 0, data_received = 0;
//char bill_payment;

// Initialise the WiFi and MQTT Client objects
WiFiClient wifiClient;
PubSubClient client(mqtt_server, 1883, wifiClient); // 1883 is the listener port for the Broker

void setup() {
  pinMode(ledPin, OUTPUT);
  //pinMode(5, OUTPUT);
  //pinMode(4, OUTPUT);
  // Switch the on-board LED off to start with
  //  digitalWrite(ledPin, HIGH);
  // Switch the on-board LED off to start with
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(1000);
  digitalWrite(ledPin, HIGH);

  // Setup pushbutton Bouncer object
  //  bouncer.attach(buttonPin);
  //  bouncer.interval(5);

  // Begin Serial on 115200
  // Remember to choose the correct Baudrate on the Serial monitor!
  // This is just for debugging purposes
  Serial.begin(9600);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  // Connect to the WiFi
  WiFi.begin(ssid, wifi_password);
  // Wait until the connection has been confirmed before continuing
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Debugging - Output the IP Address of the ESP8266
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  // Connect to MQTT Broker
  // client.connect returns a boolean value to let us know if the connection was successful.
  // If the connection is failing, make sure you are using the correct MQTT Username and Password (Setup Earlier in the Instructable)
  if (client.connect(clientID)) {
    Serial.println("Connected to MQTT Broker!");
  }
  else {
    Serial.println("Connection to MQTT Broker failed...");
  }
}

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;

  for (int i = 0; i <= maxIndex && found <= index; i++) {
    if (data.charAt(i) == separator || i == maxIndex) {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }

  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void loop()
{
  if (data_received == 0)
  {
  if (Serial.available() > 0)
  {
    a = 0;
    no_of_sensor = Serial.readStringUntil('\n');
    Serial.print(no_of_sensor);
    sensor = getValue(no_of_sensor, '#', 0);
    Serial.println(sensor);
    if ( sensor.equals("5"))
    {
      data = getValue(no_of_sensor, '#', 1);
          int lastIndex = data.length() - 1;
          data.remove(lastIndex);
          Serial.println(data);
      
      data_received = 1;
    
  }
  }
  }
  if (data_received == 1)
  {
    data_received = 0;
    data.toCharArray(char_data, 50);
    Serial.println(char_data);
    client.connect(clientID);
    delay(100); // This                           delay ensures that client.publish doesn't clash with the client.connect call
    client.publish(mqtt_topic1, char_data);
    Serial.println("published data");
    delay(1000);
  }
}


