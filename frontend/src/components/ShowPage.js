import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@observer
class ShowPage extends Component {
    constructor() {
        super()
    }

    render() {
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
                <button>להזמנה</button>
            </div>
        )
    }
}

export default ShowPage
