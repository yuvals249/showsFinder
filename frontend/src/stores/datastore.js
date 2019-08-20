import { observable, computed, action } from  'mobx'

export class DataStore{
    @observable shows
    @observable showsfilter
    @action updateStore=(data)=>{
        this.showsfilter=data
    }
}