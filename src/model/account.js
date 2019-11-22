import {observable,action} from "mobx";


class Account{
    @observable userId;
    @observable password=undefined;

    @action.bound
    testThings(data){
        console.log('testThings',data)
       this.userId=data.userId
        this.password=data.password
    }
}

export default new Account()