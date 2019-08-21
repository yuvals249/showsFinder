import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

@observer
class ShowPage extends Component {  

    render() {
        const client = {
            sandbox:    'AU9Z-v0OKEORBN1Bow_3DlBvP-siykd7Mh5yMmOc5Tn9GBo7DKG_vQpwbwl5q2qug1zi39UPKQEY_mHQ',
        }
        let youtubeVideoId = 'https://www.youtube.com/embed/' + this.props.show.youtubeVideoId
        let show = this.props.show
        console.log(this.props.show)
        return (
            <div>
                <div>{show.name}</div>
                <div>{show.date}</div>
                <div>{show.address}</div>
                <p>{show.description}</p>
                <iframe width="560" height="315" src={youtubeVideoId} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <PaypalExpressBtn client={client} currency={'USD'} total={show.currentPrice} />
            </div>
        )
    }
}

export default ShowPage
