import React, { Component } from 'react';
import ShadesList from './shades';
import TemperatureList from './temperature';
import './App.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';

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
        const finestreUrl="stubs/finestre_list.json";
        const temperatureUrl="stubs/temperature_list.json";
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
