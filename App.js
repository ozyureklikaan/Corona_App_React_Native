import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Image, View, Picker, Text } from 'react-native';
import PickerComponent from './src/picker';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import TotalComponent from './src/total';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CoronavirusComponent from './src/coronavirus';
import axios from 'axios';
import { Dimensions } from "react-native";
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded, setTestDeviceIDAsync, } from 'expo-ads-admob';

const screenWidth = Dimensions.get("window").width;
const Tab = createMaterialBottomTabNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);

		this.bannerAdId = Platform.OS === 'ios' ? "" : "ca-app-pub-7126368244915627/3797422432";
    	this.interstitialAdId = Platform.OS === 'ios' ? "" : "";
	}

	state = {
		selectedCountry: {
			Country: "Global",
			ISO2: "",
			Slug: "global"
		},
		countries: [],
		dailyData: [
			{
				name: "New Confirmed",
				value: 0,
				color: "#ebaa76",
				legendFontColor: "#7F7F7F",
				legendFontSize: 15,
			},
			{
				name: "New Recovered",
				value: 0,
				color: "#9fe3ac",
				legendFontColor: "#7F7F7F",
				legendFontSize: 15
			},
			{
				name: "New Deaths",
				value: 0,
				color: "#dd595d",
				legendFontColor: "#ff6666",
				legendFontSize: 15
			}
		],
		totalData: [
			{
				name: "Total Confirmed",
				value: 0,
				color: "#ebaa76",
				legendFontColor: "#7F7F7F",
				legendFontSize: 15,
			},
			{
				name: "Total Recovered",
				value: 0,
				color: "#9fe3ac",
				legendFontColor: "#7F7F7F",
				legendFontSize: 15
			},
			{
				name: "Total Deaths",
				value: 0,
				color: "#dd595d",
				legendFontColor: "#ff6666",
				legendFontSize: 15
			}
		]
	}

	componentDidMount() {
		axios.get(`https://api.covid19api.com/countries`)
			.then(res => {
				var result = res.data;
				var global =  {
					"Country": "Global",
					"ISO2": "",
					"Slug": "global",
				}  
				result.sort(this.compare);
				result.unshift(global);
				this.setState({countries: result});
			})

		axios.get(`https://api.covid19api.com/summary`)
			.then(res => {
				let currentDailyData = this.state.dailyData;
				currentDailyData[0].value = res.data.Global.NewConfirmed;
				currentDailyData[1].value = res.data.Global.NewRecovered;
				currentDailyData[2].value = res.data.Global.NewDeaths;

				let currentTotalData = this.state.totalData;
				currentTotalData[0].value = res.data.Global.TotalConfirmed;
				currentTotalData[1].value = res.data.Global.TotalRecovered;
				currentTotalData[2].value = res.data.Global.TotalDeaths;

				this.setState({
					dailyData: currentDailyData,
					totalData: currentTotalData
				})
			})
	}

	updateSelectedCountry = (selectedCountry) => {
		var findCountry = this.state.countries.find(x => x.Country === selectedCountry);
		this.setState({ selectedCountry: findCountry })
		
		// Daily Data
		if (findCountry.Country != "Global") {
			var url = `https://api.covid19api.com/summary`;
			axios.get(url)
				.then(res => {
					var findCountryArray = res.data.Countries.find(x => x.Country === selectedCountry);
					let currentDailyData = this.state.dailyData;
					if (findCountryArray == undefined) {
						currentDailyData[0].value = 0;
						currentDailyData[1].value = 0;
						currentDailyData[2].value = 0;
					}
					else {
						currentDailyData[0].value = findCountryArray.NewConfirmed;
						currentDailyData[1].value = findCountryArray.NewRecovered;
						currentDailyData[2].value = findCountryArray.NewDeaths;
					}

					this.setState({
						dailyData: currentDailyData
					})
				})
				.catch(error => {
					console.log(error);
				});
		}
		else {
			axios.get(`https://api.covid19api.com/summary`)
			.then(res => {
				let currentDailyData = this.state.dailyData;
				currentDailyData[0].value = res.data.Global.NewConfirmed;
				currentDailyData[1].value = res.data.Global.NewRecovered;
				currentDailyData[2].value = res.data.Global.NewDeaths;

				this.setState({
					dailyData: currentDailyData
				});
			})
		}

		// Total Data
		if (findCountry.Country != "Global") {
			let now = new Date().toISOString().substring(0, 10);
			let yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			let yesterdayDate = yesterday.toISOString().substring(0, 10);
			var url = `https://api.covid19api.com/country/${findCountry.Slug}?from=${yesterdayDate}T00:00:00Z&to=${now}T00:00:00Z`;
			axios.get(url)
				.then(res => {
					let currentTotalData = this.state.totalData;
					if (res.data[0] == undefined) {
						currentTotalData[0].value = 0;
						currentTotalData[1].value = 0;
						currentTotalData[2].value = 0;
					}
					else {
						let data = res.data[0];
						currentTotalData[0].value = data.Confirmed;
						currentTotalData[1].value = data.Recovered;
						currentTotalData[2].value = data.Deaths;
					}
	
					this.setState({
						totalData: currentTotalData
					})
				})
				.catch(error => {
					console.log(error);
				})
		}
		else {
			axios.get(`https://api.covid19api.com/summary`)
			.then(res => {
				let currentTotalData = this.state.totalData;
				currentTotalData[0].value = res.data.Global.TotalConfirmed;
				currentTotalData[1].value = res.data.Global.TotalRecovered;
				currentTotalData[2].value = res.data.Global.TotalDeaths;
	
				this.setState({
					totalData: currentTotalData
				})
			})
		}
	}

	compare(first, second) {
		const valFirst = first.Country;
		const valSecond = second.Country;

		let comparison = 0;
		if (valFirst > valSecond) {
			comparison = 1;
		} else if (valFirst < valSecond) {
			comparison = -1;
		}
		return comparison;
	}

	render() {
		return (
			<View style={styles.container}>
				{/* ------------- AdMobBanner ------------- */}
				<AdMobBanner 
					style={{paddingTop: 5, paddingBottom: 5, alignItems: "center"}}
					bannerSize="banner"
					adUnitID={this.bannerAdId}
					servePersonalizedAds={false}  
				/>

				{/* ------------- Picker Header ------------- */}
				<View style={styles.pickerHeader}>
					<Picker selectedValue = {this.state.selectedCountry.Country} onValueChange = {this.updateSelectedCountry} style={styles.pickerContent}>
						{ this.state.countries?.map(country => {return(<Picker.Item key={country.Slug} label={country.Country} value={country.Country}/>)}) }
					</Picker>
					<Text style={styles.arrowIconContent}><Image style={styles.arrowIcon} source={require("./assets/arrow-icon.png")}/></Text>
				</View>
			
				{/* ------------- Navigation Container ------------- */}
				<NavigationContainer theme={DarkTheme}>
					<Tab.Navigator
						// barStyle={{backgroundColor: "#282b2d"}}  
						activeColor="#9fe3ac"
						inactiveColor="#ecf0f1"
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
							let iconName;
							if (route.name === 'Daily') {
								iconName = focused ? require('./assets/today.png') : require('./assets/today-passive.png');
							} else if (route.name === 'Total') {
								iconName = focused ? require('./assets/total.png') : require('./assets/total-passive.png');
							} else if (route.name === 'Coronavirus') {
								iconName = focused ? require('./assets/virus.png') : require('./assets/virus-passive.png');
							}
							return <Image source={iconName} style={styles.tabIcon}/>;
							},
						})}
					>
						<Tab.Screen name="Daily" children={() => <PickerComponent data={this.state.dailyData}></PickerComponent> } />
						<Tab.Screen name="Total" children={() => <TotalComponent data={this.state.totalData}></TotalComponent>} />
						<Tab.Screen name="Coronavirus" component={CoronavirusComponent}/>
					</Tab.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#282b2d"
	},

	tabIcon: {
		width: 25,
		height: 25,
		resizeMode: 'contain'
	},

	arrowIconContent: {
		paddingBottom: 5,
	},
  
	arrowIcon: {
		width: 15,
		height: 15,
		resizeMode: "contain"
	},
  
	pickerHeader: {
		alignItems: "center",
		marginTop: 20,
		backgroundColor:"#323840",
		margin:8,
		borderRadius: 10,
		flexWrap: 'wrap', 
		flexDirection:'row',
		alignItems: "center",
		paddingLeft: 10,
	},
  
	pickerContent: {
		width: screenWidth * 6 / 7,
		color: "#fff",
		backgroundColor:"white",
		elevation: 0, 
	},
})
