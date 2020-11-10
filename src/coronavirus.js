import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, Image, ScrollView } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import axios from 'axios';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

class CoronavirusComponent extends Component {
    constructor(props) {
        super(props);
    }

   render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.textContent}>
                    <Text style={styles.textTitle}><Image style={styles.icon} source={require('../assets/virus.png')}/>  What Is Coronavirus?</Text>
                    <Text style={styles.text}>
                        The New Coronavirus Disease (COVID-19) is a double virus on January 13, 2020, in two groups of respiratory symptoms (fever, cough, shortness of breath) first in Wuhan Province, China, in late December.{"\n"}
                    </Text>
                    <Text style={styles.text}>
                    The outbreak was initially found in the seafood and animal market in this region. Later, it spread from person to person and spread to other cities in Hubei province, including Wuhan, and other provinces of the People's Republic of China and other world countries.
                    </Text>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.textTitle}><Image style={styles.icon} source={require('../assets/symptoms.png')}/>  Symptoms</Text>
                    <Text style={styles.text}>
                        <Text style={{fontWeight:"bold"}}>The most common symptoms are:</Text>{"\n"}
                        •  Fire{"\n"}
                        •  Dry cough{"\n"}
                        •  Tiredness{"\n"}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{fontWeight:"bold"}}>Less common symptoms:</Text>{"\n"}
                        •  Pain and aches{"\n"}
                        •  Throat ache{"\n"}
                        •  Diarrhea{"\n"}
                        •  Conjunctivitis{"\n"}
                        •  Headache{"\n"}
                        •  Loss of taste or smell{"\n"}
                        •  Skin rash or discoloration of fingers or toes{"\n"}
                    </Text>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.textTitle}><Image style={styles.icon} source={require('../assets/mask.png')}/>  Protection</Text>
                    <Text style={styles.text}>
                        •  Hand cleaning should be paid attention. Hands should be washed with soap and water for at least 20 seconds, and alcohol-based hand antiseptic should be used in the absence of soap and water. There is no need to use antiseptic or antibacterial soap, normal soap is sufficient.{"\n"}{"\n"}
                        •  Avoid contact with mouth, nose and eyes without washing hands.{"\n"}{"\n"}
                        •  Sick people should avoid contact (if possible, be at least 1 m away).{"\n"}{"\n"}
                        •  Hands should be cleaned frequently, especially after direct contact with sick people or their environment.{"\n"}{"\n"}
                        •  If possible, health centers should not be visited due to the high presence of patients, and contact with other patients should be minimized in cases where it is necessary to go to a health institution.{"\n"}{"\n"}
                        •  During coughing or sneezing, the nose and mouth should be covered with disposable tissue paper, if there is no tissue, the inside of the elbow should be used, if possible, it should not be entered into crowded places, if it is necessary to enter, the mouth and nose should be closed, and a medical mask should be used.{"\n"}{"\n"}
                        •  Eating raw or undercooked animal products should be avoided. Well cooked foods should be preferred.{"\n"}{"\n"}
                        •  Areas with high risk for general infection should be avoided, such as farms, livestock markets and areas where animals can be slaughtered.{"\n"}{"\n"}
                        •  If any respiratory symptoms occur within 14 days after travel, a mask should be applied to the nearest healthcare facility, and the doctor should be informed about the travel history.{"\n"}{"\n"}
                    </Text>
                </View>
                <View style={styles.protectionContent}>
                    <View style={styles.protection}>
                        <Image style={styles.imgProtection} source={require('../assets/hand.png')}/>
                    </View>
                    <View style={styles.protection}>
                        <Image style={styles.imgProtection} source={require('../assets/social.png')}/>
                    </View>
                    <View style={styles.protection}>
                        <Image style={styles.imgProtection} source={require('../assets/mask.png')}/>
                    </View>
                </View>
            </ScrollView>
        )
   }
}
export default CoronavirusComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#282b2d",
    },

    textContent: {
        backgroundColor: "#323840",
        margin:8,
        padding: 10,
        borderRadius: 10,
        height: "auto",
        marginBottom: 20
    },

    text: {
        color: "#fff",
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 18,
        fontFamily: "sans-serif-thin",
    },

    textTitle: {
         color: '#9fe3ac',
         fontFamily: "sans-serif-medium",
         fontSize: 20
    },

    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    protectionContent:{
        flexWrap: 'wrap', 
        flexDirection:'row',
        margin: 8,
        backgroundColor: "#323840",
        borderRadius: 10,
        marginBottom: 20
    },
    
    protection: {
        height: 100,
        width: (screenWidth - 16) / 3,
        alignItems: "center",
        justifyContent: "center"
    },

    imgProtection: {
        resizeMode: "contain",
        width: 45,
        height: 45
    }
})