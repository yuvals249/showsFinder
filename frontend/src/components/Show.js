import React, { Component } from 'react'

class Show extends Component {
    render() {
        return (
            <div className='showContainer'>

             <img  src='https://media.pitchfork.com/photos/5cd2e98393a536660f1ed572/2:1/w_790/Led-Zeppelin.jpg' class='picContainer'></img>

            <div className='infoBar'>   
                <span className='showTitle'>Led Zepplin</span>
                <span className='showDate'>12.09.2022</span>
                <span className='showLoc'>Tel-Aviv</span>
                <div className='showPriceBuyNow'>500 NIS <br></br>Buy Now</div>
                </div>
            </div>
        )
    }
}

export default Show