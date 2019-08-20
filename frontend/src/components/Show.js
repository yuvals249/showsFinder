import React, { Component } from 'react'

class Show extends Component {
    render() {
        return (
            <div class='showContainer'>

             <img  src='https://media.pitchfork.com/photos/5cd2e98393a536660f1ed572/2:1/w_790/Led-Zeppelin.jpg' class='picContainer'></img>

            <div class='infoBar'>   
                <span class='showTitle'>Led Zepplin</span>
                <span class='showDate'>12.09.2022</span>
                <span class='showLoc'>Tel-Aviv</span>
                <div class='showPriceBuyNow'>500 NIS <br></br>Buy Now</div>
                </div>
            </div>
        )
    }
}

export default Show