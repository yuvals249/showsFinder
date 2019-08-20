import React, { Component } from 'react'

class Show extends Component {
    render() {
        return (
            <div class='showContainer'>

             <img  src='https://media.pitchfork.com/photos/5cd2e98393a536660f1ed572/2:1/w_790/Led-Zeppelin.jpg' class='picContainer'></img>

            <div class='infoBar'>   
                <span class='showTitle'>{this.props.show.name}</span>
                <span class='showDate'>{this.props.show.date}</span>
                <span class='showLoc'>{this.props.show.address}</span>
                <div class='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> {this.props.show.amountLeftPretty} <br></br>Buy Now</div>
                </div>
            </div>
        )
    }
}

export default Show