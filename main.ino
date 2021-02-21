#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
 
#define REPORTING_PERIOD_MS     1000
 
PulseOximeter pox;
uint32_t tsLastReport = 0;
unsigned int resp_timer = 0;
int temp = A1, temp_value = 0, temp_rate = 0, resp = A0, resp_value = 0, resp_rate = 0, oxidation_value=0, oxidation_rate = 0, heart_rate = 0, heart_value = 0;
int data_timer = 0, send_data = 0, oxidation_timer =0,heart_timer =0;
char* health_status =  "Normal";
char* resp_status =  "Normal";
 
void onBeatDetected()
{
//    Serial.println("Beat!");
}
 
void setup()
{
    pinMode(resp, INPUT);
    pinMode(temp, INPUT);
    Serial.begin(9600);
    Serial.print("Initializing pulse oximeter..");
 
    // Initialize the PulseOximeter instance
    // Failures are generally due to an improper I2C wiring, missing power supply
    // or wrong target chip
    if (!pox.begin()) {
        Serial.println("FAILED");
        for(;;);
    } else {
        Serial.println("SUCCESS");
    }
     pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
 
    // Register a callback for the beat detection
    pox.setOnBeatDetectedCallback(onBeatDetected);
    
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 1562;// = (16*10^6) / (1*1024) - 1 (must be <65536)//100ms timer(15624 for 1 second)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS12) | (1 << CS10);
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);

  sei();//allow interrupts
}
 
void loop()
{
    // Make sure to call update as fast as possible
    pox.update();
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
//        Serial.println("Heart rate:");
//        Serial.print(pox.getHeartRate());

        heart_value = pox.getHeartRate();
//        Serial.println(heart_value);

//        Serial.print("bpm / SpO2:");
//        Serial.print(pox.getSpO2());

        oxidation_value = pox.getSpO2();
        
//        Serial.println(oxidation_value);
//        Serial.println("%");
 
        tsLastReport = millis();
    }

    if(heart_value >= 60)
    {
      heart_rate = 0;
    }
    else
    {
      heart_timer++;
      if(heart_timer >= 10)
      {
        heart_timer = 0;
      heart_rate = 1;
      }
    }
    
    if(oxidation_value < 90)
    {
      oxidation_timer++;
      if(oxidation_timer >= 10)
      {
        oxidation_timer = 0;
      oxidation_rate = 1;
      }
    }
    else
    {
      oxidation_rate = 0;
    }
delay(10);
}

ISR(TIMER1_COMPA_vect)
{
  resp_value = analogRead(resp);
//  Serial.println("resp_value");
//  Serial.println(resp_value);
  if(resp_value > 100)
  {
    resp_timer++;
    if(resp_timer >= 300)
    {
    resp_rate = 1;
    resp_timer = 0;  
    resp_status = "Abnormal";    
    }
  }
  else if(resp_value < 99)
  {
    resp_rate = 0;    
    resp_timer = 0;      
    resp_status = "Normal";    
  }
  
  temp_value = analogRead(temp);
  temp_value = (temp_value*0.4888);
//  Serial.println("temp_value");
//  Serial.println(temp_value);
  if(temp_value > 38)
  {
    temp_rate = 1;
  }
  else
  {
    temp_rate = 0;
  }

  data_timer++;
  if(data_timer >= 150)
  {
    data_timer = 0;
    if((oxidation_rate == 0) && (temp_rate == 0) && (heart_rate == 0) && (resp_rate == 0))
    {
      health_status = "Normal";
    }
    else
    {
      health_status = "Abnormal";
    }
    Serial.print('5');
    Serial.print('#');
    Serial.print('1');
    Serial.print(',');
    Serial.print(health_status);
    Serial.print(',');
    Serial.print(heart_value);
    Serial.print(',');
    Serial.print(oxidation_value);
    Serial.print(',');
    Serial.print(temp_value);
    Serial.print(',');
    Serial.print(resp_status);
    Serial.print('#');
  }
}

