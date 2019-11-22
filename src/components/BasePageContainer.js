import React,{Component} from 'react'
import {merge} from "../utils/Utils";


export default class BasePageContainer extends Component{
    constructor(props){
        super(props)
        this.params = this.props.navigation && this.props.navigation.state.params || {};
        this.params = merge(this.params, this.props);
        global.baseThis=this
    }


    pop() {
        if (this.props.navigation) {
            this.props.navigation.goBack();
        }
    }

    popToTop() {
        if (this.props.navigation) {
            this.props.navigation.popToTop();
        }
    }

    navigate(routeName, params = {}) {
        if (this.props.navigation) {
            this.props.navigation.navigate(routeName, params);
        }
    }
    push(routeName, params = {}, isPushAndReplace = true) {
        if(isPushAndReplace) {
            if (this.props.navigation) {
                this.props.navigation.push(routeName, params);
            }
        }else {
            global.baseThis.replace(routeName, params);
        }
    }


}