import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer, inject } from 'mobx-react'
@inject("Datastore")
@observer
class Show extends Component {
    showinfo=()=>{
        this.props.Datastore.getinfo(this.props.show)
    }
    render() {
        return (
            <div className='showContainer'>

             <img  src='https://media.pitchfork.com/photos/5cd2e98393a536660f1ed572/2:1/w_790/Led-Zeppelin.jpg' class='picContainer'></img>
            <div class='infoBar'>   
                <span class='showTitle'>{this.props.show.name}</span>
                <span class='showDate'>{this.props.show.date}</span>
                <span class='showLoc'>{this.props.show.address}</span>
                <Link to={`/${this.props.show.name}`}>
                <div onClick={this.showinfo} class='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> {this.props.show.amountLeftPretty} <br></br>Buy Now</div>
                </Link>
                </div>
            </center>
        )
    }
}

export default Show