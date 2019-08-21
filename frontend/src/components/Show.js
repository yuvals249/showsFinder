import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject("Datastore")
@observer
class Show extends Component {

    showinfo = async () => {
        this.props.Datastore.getinfo(this.props.show)
    }

    render() {
        return (
            <center>
                <div className='showContainer'>
                    <img src={this.props.show.image} class='picContainer'></img>
                    <div class='infoBar'>
                        <div class='showTitle'>{this.props.show.name}</div>
                        <div class='showDate'>{this.props.show.date}  {this.props.show.time1}</div>
                        <div class='showLoc'>{this.props.show.address}</div>
                        <Link to={`/${this.props.show.name}`}>
                            <div onClick={this.showinfo} class='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> אחרונים {this.props.show.amountLeft} <br></br>Buy Now</div>
                        </Link>
                    </div>
                </div>
            </center>
        )
    }
}

export default Show