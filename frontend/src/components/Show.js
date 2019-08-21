
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
            <center>
            <div className='showContainer'>
             <img  src={this.props.show.image} class='picContainer'></img>
            <div class='infoBar'>   
                <span class='showTitle'>{this.props.show.name}</span>
                <span class='showDate'>{this.props.show.date}  {this.props.show.time1}</span>
                <span class='showLoc'>{this.props.show.address}</span>
                <Link to={`/${this.props.show.name}`}>
                <div onClick={this.showinfo} class='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> {this.props.show.amountLeftPretty} <br></br>Buy Now</div>
                </Link>
                </div>
            </div>
            </center>
        )
    }
}

export default Show


