import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CancelIcon from '@material-ui/icons/Cancel';
import 'typeface-roboto';
import './shades.css';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";


class ShadesButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            blink: false,
        };
        // must bind method to object instance
        this.handleClick=this.handleClick.bind(this);
        this.handleTimeout=this.handleTimeout.bind(this);
    }

    handleTimeout(){
        this.setState({blink : false})
    }

    handleClick(){
        //console.log("should call url: " + this.props.url + this.props.action)
        fetch(this.props.url + this.props.action)
            .then(() => {
                this.setState({blink : true});
                // set timer
                setTimeout(this.handleTimeout, 4000)
            })
    }

    render (){
        let icon="";
        const action=this.props.action;
        let className="icon-normal";
        if (this.state.blink) {className="icon-blink"}
        if (action==="up"){
            icon=<ArrowUpwardIcon className={className} />;
        }
        if (action==="down"){
            icon=<ArrowDownwardIcon className={className} />;
        }
        if (action==="stop"){
            icon=<CancelIcon className={className} />;
        }
        return (
            <div className="shades-button">
                <IconButton onClick={this.handleClick}>
                    {icon}
                </IconButton>
            </div>
        );
    }
}

class ShadesElement extends Component {
    render (){
        return (
            <div className="shades-element">
                <Grid container alignItems="center" spacing={8}>
                    <Grid item xs={3}> <Typography align="center">{this.props.name}</Typography></Grid>
                    <Grid item xs={1}> <ShadesButton action="up" url={this.props.url}/></Grid>
                    <Grid item xs={1}> <ShadesButton action="down" url={this.props.url}/></Grid>
                    <Grid item xs={1}> <ShadesButton action="stop" url={this.props.url}/></Grid>
                </Grid>
            </div>
        );
    }
}

class ShadesList extends Component {
    constructor(props) {
        super(props);
        let mqtt = require('mqtt');
        this.state = {
            error: null,
            isLoaded: false,
            finestreData: [],
            mqttTopic: "",
            shadesUrl: this.props.shadesUrl,
            mqttClient: undefined
        };
        this.handleConnect=this.handleConnect.bind(this);
        this.state.mqttClient.on('connect', this.handleConnect)
    }

    handleConnect(){
        this.state.mqttClient.subscribe(this.state.mqttTopic);
    }

    componentDidMount() {
        // retrieve data
        // format:
        // { mqttUrl: "mqtt://cherilee",
        //   mqttTopic: "/home/+/tapparelle/#"
        //   tapparelle: [
        //     {
        //       "name": "Finestra Est Camera Riccardo",
        //       "url": "/gateway/tapparelle/diamond-tiara/fin_cameraRL_E/",
        //       "topic": "/home/diamond-tiara/tapparelle/fin_cameraRL_E"
        //     },
        //     ...
        //   ]
        // }

        fetch(this.state.shadesUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        finestreData: result
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
        const { error, isLoaded, finestreData} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="shades-list">Loading...</div>;
        } else {
            return (
                <div className="shades-list">
                    <GridList cols={1} cellHeight="auto">
                        {finestreData.map(tile => (
                            <GridListTile key={tile.name}>
                                <ShadesElement name={tile.name} url={tile.url}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            );
        }
    }
}


export default ShadesList;
