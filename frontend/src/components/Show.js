import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ShowPage from './ShowPage'
import { observer, inject } from 'mobx-react'


@inject("Datastore")
@observer

class Show extends Component {

    updateShowInfo = () => {
        this.props.Datastore.updateShowInfo(this.props.show)
        // console.log(this.props.Datastore.showInfo)
    }

    render() {
        return (
            <center>
                <div className='showContainer'>
                    <img src='https://i.ytimg.com/vi/8TfywEx5kmo/maxresdefault.jpg' className='picContainer'></img>
                    <div className='infoBar'>
                        <span className='showTitle'>{this.props.show.name}</span>
                        <span className='showDate'>{this.props.show.date}</span>
                        <span className='showLoc'>{this.props.show.address}</span>
                        <div className='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> {this.props.show.amountLeftPretty} <br></br>Buy Now</div>
                        <Link to="/showPage"><div className='showPriceBuyNow' onClick={this.updateShowInfo}>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> {this.props.show.amountLeftPretty} <br></br>Buy Now</div></Link>
                    </div>
                </div>
            </center>
        )
    }
}

export default Show