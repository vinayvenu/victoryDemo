import React, {Component} from 'react';
import {
    AppRegistry, ScrollView, Text, TextInput
} from 'react-native';
import {VictoryChart} from 'victory-native';


export default class victoryDemo extends Component {

    componentWillMount() {
        this.setUpGraphs('5');
    }

    componentDidMount() {
        this.changeTimeToMountText();
    }

    componentDidUpdate() {
        this.changeTimeToMountText();
    }

    setUpGraphs(numberOfGraphsStr) {
        this.setState({
            renderStartTime: new Date(),
            numberOfGraphs: numberOfGraphsStr,
            shouldChangeText: true
        });
    }

    numberOfGraphs() {
        const isNumeric = (str) => !isNaN(parseFloat(str)) && isFinite(str);
        return isNumeric(this.state.numberOfGraphs) ? parseInt(this.state.numberOfGraphs) : 0;
    }

    changeTimeToMountText() {
        if (!this.state.shouldChangeText) return;

        const timeToMountText = "Mounting of " + this.state.numberOfGraphs + " empty graphs took " + (new Date() - this.state.renderStartTime) + " ms";
        this.setState({shouldChangeText: false, timeToMountText})
    }

    renderGraphs() {
        const charts = [];
        for (var index = 0; index < this.numberOfGraphs(); index++) {
            charts.push(<VictoryChart key={index}/>);
        }
        return charts;
    }

    render() {
        return (
            <ScrollView>
                <Text style={{fontSize: 24}}>{this.state.changeTimeToMountText}</Text>
                <TextInput value={this.state.numberOfGraphs}
                           onChangeText={(numStr) => this.setUpGraphs(numStr)}></TextInput>
                {this.renderGraphs()}
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('victoryDemo', () => victoryDemo);