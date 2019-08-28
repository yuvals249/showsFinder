import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios'

@inject("Datastore")
@observer
class ShowPage extends Component {

    

    render() {

        const onSuccess = async (payment) => {
            // Congratulation, it came here means everything's fine!
            alert("The payment was succeeded!", payment);
            
            let email=await localStorage.getItem('email')
          let user=  await axios.put(`/payment/${this.props.show.name}/${this.props.show.amountLeft}/${email}`)
            let data = await axios.get('/')
            this.props.Datastore.getdata(data.data)
            this.props.Datastore.updateStore(data.data)
            localStorage.setItem('keypurchasedShows', JSON.stringify(user.data.purchasedShows))
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

        const style = {
            size: 'small',
            color: 'blue',
            shape: 'rect',
            label: 'checkout',
            size: 'responsive'
        }

        let youtubeVideoId = 'https://www.youtube.com/embed/' + this.props.show.youtubeVideoId
        let show = this.props.show

        return (
            <div className='showPageContainer'>
                <iframe className='youtubeBoxPage' src={youtubeVideoId} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div className='infoBox'>
                    <h3 className='showNamePage'>{show.name} <i class="far fa-star"></i></h3>
                    <hr></hr>
                    <h4 className='showDatePage'>{show.date} <i class="far fa-calendar-alt"></i></h4>
                    <hr></hr>
                    <h4 className='showAdressPage'>{show.address} <i class="fas fa-map-marked-alt"></i></h4>
                    <hr></hr>
                    <h4 className='showPricePage'>{show.currentPrice}₪ <i class="fas fa-ticket-alt"> </i></h4>
                    <hr></hr>
                    <p className='showDescPage'>{show.description}</p>
                </div>
                <div className='showPageButton'>
                    <div className='paypalPayBoxPage'>{localStorage.email ?<PaypalExpressBtn onCancel={onCancel} onSuccess={onSuccess} client={client} currency={'ILS'} total={show.currentPrice} style={style} /> : 'Please Login In Order To Purchase'}</div>
                </div>
            </div>
        )
    }
}

export default ShowPage