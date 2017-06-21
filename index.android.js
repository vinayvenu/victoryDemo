import React, {Component} from 'react';
import {AppRegistry, ScrollView, Text, TextInput, View} from 'react-native';
import {VictoryChart, VictoryLine} from 'victory-native';


export default class victoryDemo extends Component {

    componentWillMount() {
        this.setUpCharts('5', '1');
    }

    componentDidMount() {
        this.changeTimeToMountText();
    }

    componentDidUpdate() {
        this.changeTimeToMountText();
    }

    setUpCharts(numberOfChartsStr, numberOfLinesStr) {
        this.setState({
            renderStartTime: new Date(),
            numberOfCharts: numberOfChartsStr,
            numberOfLines: numberOfLinesStr,
            shouldChangeText: true
        });
    }

    changeTimeToMountText() {
        if (!this.state.shouldChangeText) return;

        const timeToMountText = "Mounting of " + this.state.numberOfCharts + " empty Charts took " + (new Date() - this.state.renderStartTime) + " ms";
        this.setState({shouldChangeText: false, timeToMountText: timeToMountText})
    }

    toNumber(valueStr) {
        const isNumeric = (str) => !isNaN(parseFloat(str)) && isFinite(str);
        return isNumeric(valueStr) ? parseInt(valueStr) : 0;
    }

    renderLines() {
        const lines = [],
            xAxis = Array.from({length: 30}, (v, i) => i),
            data = () => {
                return xAxis.map((item) => {
                    return {x: item, y: Math.floor((Math.random() * 10) + 1)}
                });
            };

        for (let index = 0; index < this.toNumber(this.state.numberOfLines); index++) {
            lines.push(<VictoryLine data={data()} key={index}/>)
        }
        return lines;
    }

    renderCharts() {
        const charts = [];
        for (let index = 0; index < this.toNumber(this.state.numberOfCharts); index++) {
            charts.push(<VictoryChart key={index}>
                {this.renderLines()}
            </VictoryChart>);
        }
        return charts;
    }

    render() {
        return (
            <ScrollView>
                <Text style={{fontSize: 24}}>{this.state.timeToMountText}</Text>
                <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-start'}}>
                    <Text style={{flex: 1}}>Number of charts</Text>
                    <TextInput style={{flex: 1}} value={this.state.numberOfCharts}
                               onChangeText={(numberOfChartsStr) => this.setUpCharts(numberOfChartsStr, this.state.numberOfLines)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Text style={{flex: 1}}>Number of lines in chart</Text>
                    <TextInput  style={{flex: 1}} value={this.state.numberOfLines}
                               onChangeText={(numberOfLinesStr) => this.setUpCharts(this.state.numberOfCharts, numberOfLinesStr)}/>
                </View>

                {this.renderCharts()}
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('victoryDemo', () => victoryDemo);