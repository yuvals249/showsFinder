import React, { Component } from 'react'
import Filters from './Filters'
import { observer, inject } from 'mobx-react'
@inject("Filterstore","Datastore")

@observer
class Search extends Component{
    constructor(){
        super()
        this.state={
            filters:false
        }
    }
    handlefilters = (e) => {
        this.props.Filterstore.handlefilters(e.target.name, e.target.value)
        
    }
    filters=()=>{
        this.setState({
            filters:!this.state.filters
        })
    }
    

    render(){
        return(
            <div>
                <input placeholder='search'  name='name' type='text' onChange={this.handlefilters} />
               {this.state.filters ? <Filters  /> : null}
                <i className={this.state.filters ? "fas fa-arrow-up":"fas fa-arrow-down"} onClick={this.filters}></i>
            </div>
        )
    }
}

export default Search