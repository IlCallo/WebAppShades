import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import './shades.css';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

class TemperatureElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: -1,
            humid: -1,
            name: this.props.name,
            url: this.props.url,
            updateTimeout: 60000
        };
        this.update=this.update.bind(this);
    }

    componentDidMount() {
        this.update()
    }

    update(){
        //console.log('updating '+this.state.name);
        fetch(this.state.url)
            .then(res => res.json())
            .then(result => {
                if (result.temp > 0) {
                    this.setState({
                        temp: '' + result.temp + ' C'
                    });
                } else {
                    this.setState({
                        temp: 'n/a',
                    });
                }
                if (result.humid > 0) {
                    this.setState({
                        humid: '' + result.humid + ' %',
                    });
                } else {
                    this.setState({
                        humid: 'n/a',
                    });
                }
            });
        // schedule next update
        setTimeout(this.update, this.state.updateTimeout)

    }

    render (){
        return (
            <div className="temperature-element">
                <Grid container justify="space-between" alignItems="center" spacing={8}>
                    <Grid item xs={6}> <Typography>{this.state.name}</Typography></Grid>
                    <Grid item xs={1}> <Typography>{this.state.temp}</Typography></Grid>
                    <Grid item xs={1}> <Typography>{this.state.humid}</Typography></Grid>
                </Grid>
            </div>
        );
    }
}

class TemperatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            temperatureData: [],
            url: this.props.url
        };
    }
    componentDidMount() {
        // retrieve data
        // format:
        // [
        //   {
        //     "name": "Camera Riccardo",
        //     "url": "/gateway/temperature/diamond-tiara/temp1/"
        //   },
        //   ...
        // ]
        fetch(this.state.url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        temperatureData: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render (){
        const { error, isLoaded, temperatureData} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="temperature-list">Loading...</div>;
        } else {
            return (
                <div className="temperature-list">
                    <GridList cols={1} cellHeight="auto">
                        {temperatureData.map(tile => (
                            <GridListTile key={tile.name}>
                                <TemperatureElement name={tile.name} url={tile.url}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            );
        }
    }
}


export default TemperatureList;
