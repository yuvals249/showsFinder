import { observable,  action } from  'mobx'

export class DataStore{
    @observable shows=[]
    @observable showsfilter=[]
    @observable showinfo={}
    @action updateStore=(data)=>{
        this.showsfilter=data
    }
    @action getdata=(data)=>{
        this.shows=data
    }
    @action getinfo=(data)=>{
        this.showinfo=data
    }
}