import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios'

@inject("Datastore")
@observer
class ShowPage extends Component {

    loadData = async () => {
        let data = await axios.get('http://localhost:8080')
        this.props.Datastore.getdata(data.data)
        this.props.Datastore.updateStore(data.data)
        window.location.href = "http://localhost:3000/";
    }

    render() {

        const onSuccess = async (payment) => {
            // Congratulation, it came here means everything's fine!
            await axios.put(`http://localhost:8080/payment/${this.props.show.name}/${this.props.show.amountLeft}`)
            let data = await axios.get('http://localhost:8080')
            this.props.Datastore.getdata(data.data)
            this.props.Datastore.updateStore(data.data)
            alert("The payment was succeeded!", payment);
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            alert('Your payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const client = {
            sandbox: 'AU9Z-v0OKEORBN1Bow_3DlBvP-siykd7Mh5yMmOc5Tn9GBo7DKG_vQpwbwl5q2qug1zi39UPKQEY_mHQ',
        }

        let youtubeVideoId = 'https://www.youtube.com/embed/' + this.props.show.youtubeVideoId
        let show = this.props.show

        return (
            <div className='showPageContainer'>
                <iframe className='youtubeBoxPage' src={youtubeVideoId} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <h3 className='showNamePage'>{show.name} <i class="far fa-star"></i></h3>
                <hr></hr>
                <h4 className='showDatePage'>{show.date} <i class="far fa-calendar-alt"></i></h4>
                <hr></hr>
                <h4 className='showAdressPage'>{show.address} <i class="fas fa-map-marked-alt"></i></h4>
                <hr></hr>
                <h4 className='showPricePage'>{show.currentPrice}₪ <i class="fas fa-ticket-alt"> </i></h4>
                <hr></hr>
                <p className='showDescPage'>{show.description}</p>
                <hr></hr>
                <PaypalExpressBtn onCancel={onCancel} onSuccess={onSuccess} client={client} currency={'USD'} total={show.currentPrice} className='paypalPayBoxPage' />
                <div className='backButton' onClick={this.loadData}><i class="fas fa-undo-alt"></i></div>
            </div>
        )
    }
}

export default ShowPage