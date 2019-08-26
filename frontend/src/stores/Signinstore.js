import { observable, action } from  'mobx'

export class SigninStore {
    @observable email = ""
    @observable password = ""
    @action handleinputs = (name, value) => {
        this[name] = value
    } 
}