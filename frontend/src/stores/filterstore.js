    
import { observable, action } from  'mobx'

export class FilterStore {
    @observable name 
    @observable cost = 5000
    @observable location = "all"
    @observable date = "all"
    @action handlefilters = (name, value) => {
        this[name] = value
    } 
}