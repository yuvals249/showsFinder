import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
@inject("FilterStore","DataStore")

@observer
class Filters extends Component {
    handlefilters = (e) => {
        this.props.FilterStore.handlefilters(e.target.name, e.target.value)
    }
    render() {
        return (
            <div>
                <input type="range" name="cost" min="10" max="500" onChange={this.handlefilters} value={this.props.FilterStore.cost}/>
                <select name="location" onChange={this.handlefilters} value={this.props.FilterStore.location}>
                    {this.props.DataStore.shows.map(l=><option key={l.id} value={l.locations}>{l.locations}</option>)}
                </select>
                <select name="date" onChange={this.handlefilters} value={this.props.FilterStore.date}>
                   <option value='today'>today</option>
                   <option value='tomorrow'>tomorrow</option>
                   <option value='weekend'>this weekend</option>
                </select>
            </div>
        )
    }
}

export default Filters