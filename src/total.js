import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

class TotalComponent extends Component {
    constructor(props) {
        super(props);
    }

   render() {
        const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false, // optional
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Total Statistics</Text>
                </View>

                {/* ------------- Pie Chart ------------- */}
                <PieChart
                    data={this.props.data}
                    width={screenWidth * 1.9}
                    height={250}
                    chartConfig={chartConfig}
                    accessor="value"
                    backgroundColor="transparent"
                    absolute
                    hasLegend={false}
                />

                {/* ------------- Chart Value ------------- */}
                <View style={styles.chartValue}>
                    <Text style={styles.title}>Total Recovered</Text>
                    <View style={styles.chartValueText}>
                        <Text style={styles.pointRecovered}><Image source={require("../assets/recovered.png")}/></Text>
                        <Text style={styles.textRecovered}>{this.props.data[1].value}</Text>
                    </View>
                    </View>
                    <View style={styles.chartValue}>
                    <Text style={styles.title}>Total Confirmed</Text>
                    <View style={styles.chartValueText}>
                        <Text style={styles.pointConfirmed}><Image source={require("../assets/confirmed.png")}/></Text>
                        <Text style={styles.textConfirmed}>{this.props.data[0].value}</Text>
                    </View>
                    </View>
                    <View style={styles.chartValue}>
                    <Text style={styles.title}>Total Deaths</Text>
                    <View style={styles.chartValueText}>
                        <Text style={styles.pointDeath}><Image source={require("../assets/death.png")}/></Text>
                        <Text style={styles.textDeath}>{this.props.data[2].value}</Text>
                    </View>
                </View>
            </ScrollView>
        )
   }
}
export default TotalComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "#282b2d",
    },

    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#ffffff50",
        paddingBottom: 20,
        alignItems: "center",
        width: screenWidth,
    },

    headerTitle: {
        fontSize: 20,
        color: "#fff",
        fontFamily: "sans-serif-thin"
    },

    arrowIconContent: {
        paddingBottom: 5,
    },

    chartValue: {
        backgroundColor: "#323840",
        margin:8,
        borderRadius: 10,
        height: 130,
        marginBottom: 20
    },

    chartValueText: {
        flexWrap: 'wrap', 
        flexDirection:'row',
        alignItems: "center",
    },

    title: {
        color: "#fff",
        paddingLeft: 10,
        paddingTop: 10,
        fontSize: 20,
        fontFamily: "sans-serif-thin",
    },

    pointDeath: {
        height: 100,
        width: screenWidth / 2,
        textAlignVertical: "center",
        paddingBottom: 20,
        paddingLeft: 20
    },

    textDeath: {
        fontSize: 35,
        color: '#dd595d',
        fontFamily: "sans-serif-medium",
        width: "auto"
    },

    pointRecovered: {
        height: 100,
        width: screenWidth / 2,
        textAlignVertical: "center",
        paddingBottom: 20,
        paddingLeft: 20
    },

    textRecovered: {
        fontSize: 35,
        color: '#9fe3ac',
        fontFamily: "sans-serif-medium",
        width: "auto",
    },

    pointConfirmed: {
        height: 100,
        width: screenWidth / 2,
        textAlignVertical: "center",
        paddingBottom: 20,
        paddingLeft: 20
    },

    textConfirmed: {
        fontSize: 35,
        color: '#ebaa76',
        fontFamily: "sans-serif-medium",
        width: "auto",
    }
})