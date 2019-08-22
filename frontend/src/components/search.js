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
            flicker:false
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
    changeClass=()=> {
        if(!this.state.filters) {
        this.setState({flicker:true}) 
        document.getElementById('filterBox').classList.add("clicked")}
        
        else{
            this.setState({flicker:false}) 
            document.getElementById('filterBox').classList.remove("clicked")
    
        } 
        }
 
    
    render(){
        return(
            <center >
                <div className='fixedMenu'>
          
                <input placeholder='Search'  name='name' type='text' onChange={this.handlefilters} className='search' />
                <span className='upDown' ><i  className={this.state.filters ? "fas fa-chevron-up":"fas fa-chevron-down"} onClick={this.filters}></i></span>
               {this.state.filters ? <Filters  /> : null}

               </div>
               </center>
        )
    }
}
export default Search