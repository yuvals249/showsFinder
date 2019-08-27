import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { async } from 'q';

@inject("Datastore")
@observer
class Show extends Component {
    constructor() {
        super()
        this.state = {
            bookmarks: false
        }
    }

    showinfo = async () => {
        this.props.Datastore.getinfo(this.props.show)
    }

    addToBookmarks = () => {
        this.setState({bookmarks: !this.state.bookmarks}, function () {
            if (this.state.bookmarks) {
                alert('Added to your bookmarks')
                axios.put(`http://localhost:8080/userProfileAdd/${this.props.show.name}/${localStorage.getItem('email')}`)
            }
            else {
                alert('Removed from your bookmarks')
                axios.put(`http://localhost:8080/userProfileRemove/${this.props.show.name}/${localStorage.getItem('email')}`)
            }
        })
    }

    render() {
        return (
            <center>
                <div className='showContainer'>
                    <img src={this.props.show.image} class='picContainer'></img>
                    <div class='infoBar'>
                        <i className="fas fa-bookmark" onClick={this.addToBookmarks}></i>
                        <div class='showTitle'>{this.props.show.name}</div>
                        <div class='showDate'>{this.props.show.date}  {this.props.show.time1}</div>
                        <div class='showLoc'>{this.props.show.address}</div>
                        <Link to={`/inform/${this.props.show.name}`}>
                            <div onClick={this.showinfo} class='showPriceBuyNow'>{this.props.show.currentPrice} <i class="fas fa-shekel-sign"></i> <br></br> אחרונים {this.props.show.amountLeft} <br></br>Buy Now</div>
                        </Link>
                    </div>
                </div>
            </center>
        )
    }
}

export default Show