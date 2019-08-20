import React, { Component } from 'react'
import Show from './Show'
import { observer, inject } from 'mobx-react'
    

@inject("Filterstore")
@observer


class Shows extends Component {

    render() {
        return (
                <div>
                    {this.props.shows.filter(n => n.name.includes(this.props.Filterstore.name)).map(s => <Show show={s} />)}
                </div>
        )
    }
}

export default Shows