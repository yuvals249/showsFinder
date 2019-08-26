import React, { Component } from 'react'
import Filters from './Filters'
import { observer, inject } from 'mobx-react'
@inject("Filterstore", "Datastore")

@observer
class Search extends Component {
    constructor() {
        super()
        this.state = {
            filters: false
        }
    }
    handlefilters = (e) => {
        this.props.Filterstore.handlefilters(e.target.name, e.target.value)

    }
    filters = () => {
        this.setState({
            filters: !this.state.filters
        })
    }



    render() {
        return (
            
                <div className='fixedMenu'>
                    <input placeholder='Search' name='name' type='text' onChange={this.handlefilters} className='search' />
                    <i className={this.state.filters ? "fas fa-chevron-up" : "fas fa-chevron-down"} onClick={this.filters}></i>
                    {this.state.filters ? <Filters /> : null}

                </div>

        )
    }
}
export default Search