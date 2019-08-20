import React, { Component } from 'react'
import Filters from './Component/Filters'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject("FilterStore","DataStore")

@observer
class Search extends Component{
    constructor(){
        super()
        this.state={
            filters:false
        }
    }
    handlefilters = (e) => {
        this.props.FilterStore.handlefilters(e.target.name, e.target.value)
    }

    filters(){
        this.setState({
            filters:true
        })
    }
    
     search=async()=>{
        let filters={
            price: this.props.FilterStore.cost,
            location: this.props.FilterStore.location,
            date: this.props.FilterStore.date
        }

        let data=await axios.post(`http://localhost:8080/filter`,filters)
        this.props.DataStore.updateStore(data)
    }

    render(){
        return(
            <div>
                <input placeholder='search'  name='band' type='text' onChange={this.handlefilters}/>
                <button onClick={this.search}></button>
               {this.state.filters ? <Filters  /> : null}
                <div onClick={this.filters}></div>
            </div>
        )
    }
}

export default Search