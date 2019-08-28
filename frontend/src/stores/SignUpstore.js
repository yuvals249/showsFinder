import { observable, action } from  'mobx'

export class SignUpStore {
    @observable firstname = ""
    @observable surename = ""
    @observable email = ""
    @observable password = ""
    @observable confirmpassword = ""

    @action handleinputs = (name, value) => {
        this[name] = value
    } 
}