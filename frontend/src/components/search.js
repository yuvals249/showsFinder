import React, { Component } from 'react'
import Filters from './Filters'
import { observer, inject } from 'mobx-react'
@inject("Filterstore","Datastore")

@observer
class Search extends Component{
    constructor(){
        super()
        this.state={
            filters:false,
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
            <center >
                <div className='fixedMenu'>
          
                <input placeholder='Search'  name='name' type='text' onChange={this.handlefilters} className='search' />
                <span className='upDown'><i className={this.state.filters ? "fas fa-arrow-up":"fas fa-arrow-down"} onClick={this.filters}></i></span>
               {this.state.filters ? <div id='filterBox' ><Filters  /></div> : null}

               </div>
               </center>
        )
    }
}
export default Search