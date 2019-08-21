import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import axios from 'axios'
@inject("Filterstore","Datastore")

@observer
class Filters extends Component {
    handlefilters = (e) => {

        this.props.Filterstore.handlefilters(e.target.name, e.target.value)
        this.search()
    }

    locations(){
        let obj={}
      let arr = this.props.Datastore.shows.map(l=>l.locations.slice(-1))
      
        for (let l of arr){
            obj[l]=l
        }
        let locations=[]
        for (let x in obj ){
            locations.push(x)
        }
        return locations
    }
    search=async()=>{
        let filters={
            price: this.props.Filterstore.cost,
            location: this.props.Filterstore.location,
            date: this.props.Filterstore.date
        }
        let data=await axios.post(`http://localhost:8080/filter`,filters)
        this.props.Datastore.updateStore(data.data)
        console.log(data.data)
    }
    render() {
       
        return (
            <div>
                <div className='filterNum'>{this.props.Filterstore.cost}</div>
                <input type="range" name="cost" min="10" max="500" onChange={this.handlefilters} value={this.props.Filterstore.cost} className='slider'/>

                <br></br>
                
                <select name="location" onChange={this.handlefilters} value={this.props.Filterstore.location} className='dropFilter' >
                    <option value='all'>all</option>
                    {this.locations().map(l=><option key={l} value={l}>{l.charAt(0).toUpperCase()}{l.slice(1).toLowerCase()}</option>)}
                </select>
                <select name="date" onChange={this.handlefilters} value={this.props.Filterstore.date} className='dropFilter'>
                   <option value='all'>All</option>

                   <option value='today'>Today</option>
                   <option value='tomorrow'>Tomorrow</option>
                   <option value='weekend'>This weekend</option>
                </select>
            </div>
        )
    }
}

export default Filters
