/**
 *  Class: Webview
 *  Author: zhangpeng
 *  Date: 2019/10/28.
 *  Description: 都使用箭头函数 funNmae = () =>{}
 *  component: 调用组件 先定义 ref = {name => this.name = name} 使用this.name获取组件发方法和变量
 *  子组件   : 参考demo
 */
import React, {Component} from 'react';

import {WebView} from 'react-native-webview'
import {View} from "react-native";
import utils from '../utils/MessageUtils'
export default class _Webview extends Component {

    constructor(props) {
        super(props);
        // 初始化
        this.state = {};
        // 返回给父组件的数据
        this.callbackValue = () => {
            // TODO code
        };
        this.canInjectJavaScript=false

    }



    _onError=(event)=>{
        this.canInjectJavaScript=false
        if(event && event.nativeEvent && event.nativeEvent.code){}
        console.log('event',event.nativeEvent.code)
    }
    _onLoadStart=()=>{
        this.canInjectJavaScript=false
        console.log('_onLoadStart_onLoadStart')
    }
    _onLoadEnd=()=>{
        console.log('_onLoadEnd_onLoadEnd')
        this.canInjectJavaScript=true
       let onLoadEnd = this.props.onLoadEnd;
        if(onLoadEnd&&typeof onLoadEnd==='function'){
            onLoadEnd({
                width:this.webWidth,
                height:this.webHeight
            })
        }


    }
    _onMessage=(event)=>{
        // 统一去做处理
        // console.log('_onMessage_onMessage',event.nativeEvent.data)
        try {
            let onMessage = this.props.onMessage;
            if(onMessage&&typeof onMessage==='function'){
                onMessage(event)
            }
            // utils.handleMsg(JSON.parse(event.nativeEvent.data))
        }catch (e){
           console.log(e)
        }

    }

    layoutInfo = (event) =>{
        const {width, height} = event.nativeEvent.layout;
        this.webWidth = width;
        this.webHeight = height;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {
        let url = this.props.url;
        return (
            <View style={[{width:'100%',height:'100%'},this.props.style]} onLayout={(event)=>this.layoutInfo(event)}>
                <WebView
                    ref={r=>this.webview=r}
                    source={{uri:url}}
                    style={{flex:1}}
                    onError={(event)=>this._onError(event)}
                    onLoadStart={()=>this._onLoadStart()}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onMessage={(event)=>this._onMessage(event)}

                />

            </View>
        );
    }
}
