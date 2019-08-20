import { observable,  action } from  'mobx'

export class DataStore{
    @observable shows=[]
    @observable showsfilter=[]
    @action updateStore=(data)=>{
        this.showsfilter=data
    }
    @action getdata=(data)=>{
        this.shows=data
    }
}