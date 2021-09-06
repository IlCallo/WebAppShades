import React, { Component } from 'react';
import ShadesList from './shades';
import TemperatureList from './temperature';
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import indigo from '@material-ui/core/colors/indigo';
const a=blue

class MyTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const finestreUrl="http://cherilee:8000/gateway/finestre_list/";
        const temperatureUrl="http://cherilee:8000/gateway/temperature_list/";
        console.log(a)
        return (
            <div>
            <AppBar position="static" color="primary">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    centered>
                    <Tab label="Finestre" />
                    <Tab label="Temperature" />
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}>
                <ShadesList url={finestreUrl}/>
                <TemperatureList url={temperatureUrl}/>
            </SwipeableViews>
            </div>
        );
    }
}



class App extends Component {
  render() {
    return (
      <div>
          <MyTabs/>
      </div>
    );
  }
}



export default App;
