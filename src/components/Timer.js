import React, { Component } from 'react';


export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            time : new Date().toLocaleTimeString()
        }
    };

    componentDidMount(){
        this.intervalID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalID)
    }

    tick(){
        this.setState({
            time : new Date().toLocaleTimeString()
        })
    }

    render(){
        return(
            <h1 style = {{fontFamily : 'source-code-pro, Menlo, Monaco, Consolas, "Courier New"', color:'white',position : 'relative', top: '0', width: '100%'}}>
                {this.state.time}
            </h1>
        )
    }

}