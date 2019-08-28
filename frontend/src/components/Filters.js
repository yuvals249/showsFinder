import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import axios from 'axios'
@inject("Filterstore","Datastore")

@observer
class Filters extends Component {
    constructor(){
        super()
        this.state={
            flicker:false
        }
    }
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
        let data=await axios.post(`/filter`,filters)
        this.props.Datastore.updateStore(data.data)
        console.log(data.data)
    }
    
 

    render() {
       
        return (
            <div id='filterBox'>
                <div className='filterNum'>{this.props.Filterstore.cost}{this.props.Datastore.shows[0].priceCurrencySign}</div>
                <input type="range" name="cost" min="10" max="200" onChange={this.handlefilters} value={this.props.Filterstore.cost} className='slider'/>

            <div className='dropDownBox'>               
                <select name="location" onChange={this.handlefilters} value={this.props.Filterstore.location} className='dropFilterLoc' id='dropFilter' >
                    <option value='all'>All cities</option>
                    {this.locations().map(l=><option key={l} value={l}>{l.charAt(0).toUpperCase()}{l.slice(1).toLowerCase()}</option>)}
                </select>
                <select name="date" onChange={this.handlefilters} value={this.props.Filterstore.date} className='dropFilterDate' id='dropFilter'>
                   <option value='all'>All dates</option>
                   <option value='today'>Today</option>
                   <option value='tomorrow'>Tomorrow</option>
                   <option value='weekend'>This weekend</option>
                </select>
            </div> 
            </div>
        )
    }
}

export default Filters
