import React, { Component } from 'react'

class Show extends Component {
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
                    </div>
                </div>
            </center>
        )
    }
}

export default Show