import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import mqtt from 'mqtt';
import hearticon from './hearticon.png';
import oxidation from './oxidation.png';
import temp from './Temp.png';
import resp from './resp.png';
import test from './style.css';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: 40,
		marginRight: 40,
	},
	paper: {
		padding: theme.spacing(5),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: 200
	},
	root1: {
		flex: 1,
		borderRadius: 30,
		backgroundImage: "linear-gradient(to right, #cc2b5e, #753a88)",
		padding: 10,
		justifyContent: 'center',
		textAlign: 'center',
	},
}));
export default function AutoGrid() {

	const [flag, setflag] = useState(0);
	const [heart_rate1, setheart_rate1] = useState("...");
	const [oxidation_rate1, setoxidation_rate1] = useState("...");
	const [temperature1, settemperature1] = useState("...");
	const [respiration1, setrespiration1] = useState("...");


	useEffect(() => {
		if (flag == 0) {
			setflag(1)

			var client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
			client.on("message", (topic, payload) => {
				var mqttvalue = payload.toString();
				var splits = mqttvalue.split(",");
				setheart_rate1(splits[2])
				setoxidation_rate1(splits[3])
				settemperature1(splits[4])
				setrespiration1(splits[5])

			});

							// client.end();


			

			client.on("connect", () => {
				client.subscribe(localStorage.getItem('topic'));				
				console.log("+++++++++++++Connected to MQTT Broker++++++++++++++++++++++++");
			});

			
		}

	})


		
	const classes = useStyles();
		return (
			<div className={classes.root}>
				<h1> Health Details</h1>
				<Grid container spacing={5} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
					<Grid item xs={12} sm={6}>
						<Card className={classes.root1}>
							<div class="d-flex align-items-center bd-highlight  justify-content-around"  >
								<div>
									<img src={hearticon} width="200" height="200" />
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> Heart Rate</h2>
								</div>
								<div>
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> {heart_rate1} bpm</h2>
								</div>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card className={classes.root1}>
							<div class="d-flex align-items-center bd-highlight  justify-content-around"  >
								<div>
									<img src={oxidation} width="200" height="200" />
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> Oxidation</h2>
								</div>
								<div>
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> {oxidation_rate1}  SpO2</h2>
								</div>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card className={classes.root1}>
							<div class="d-flex align-items-center bd-highlight  justify-content-around"  >
								<div>
									<img src={temp} width="200" height="200" />
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>Temperature</h2>
								</div>
								<div>
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}>{temperature1} °C</h2>
								</div>
							</div>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Card className={classes.root1}>
							<div class="d-flex align-items-center bd-highlight  justify-content-around"  >
								<div>
									<img src={resp} width="200" height="200" />
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> Respiration</h2>
								</div>
								<div>
									<h2 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontStyle: 'italic' }}> {respiration1}</h2>
								</div>
							</div>
						</Card>
					</Grid>
				</Grid>
			</div>
		);
	}
