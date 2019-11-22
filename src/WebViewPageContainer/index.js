/**
 *  Class: index
 *  Author: zhangpeng
 *  Date: 2019/10/29.
 *  Description: 都使用箭头函数 funNmae = () =>{}
 *  component: 调用组件 先定义 ref = {name => this.name = name} 使用this.name获取组件发方法和变量
 *  子组件   : 参考demo
 */
/**
 *  Class: index
 *  Author: zhangpeng
 *  Date: 2019/10/16.
 *  Description: 都使用箭头函数 funNmae = () =>{}
 *  component: 调用组件 先定义 ref = {name => this.name = name} 使用this.name获取组件发方法和变量
 *  子组件   : 参考demo
 */
import React from 'react';
// react-native导入
import {View} from 'react-native';
import WebView from '../components/Webview'

// 第三发库导入
import utils from '../utils/MessageUtils'
import BasePageContainer from "../components/BasePageContainer";

// 子组件导入

// api导入

// 图片导入(使用例子:import feed from './source/image/zcr/feed_button_yy.png'')

// 变量定义

export default class WebViewPageContainer extends BasePageContainer {
    constructor(props) {
        super(props);
        // 初始化
        this.state = {};
    }


    componentDidMount() {
    }

    getWebViewInfo = (width, height) =>{
        //传递给web
        utils.sendMsg({action:'INIT_DATA',paylod:{width,height}},this)

    }

    getSendMsg = (event) =>{
        utils.handleMsg(JSON.parse(event.nativeEvent.data))
    }


    render() {
        let url = this.params.url;
        return (
            <View style={{flex:1}}>
                <WebView ref={com=>this.web=com}
                         url={url}
                         onLoadEnd={({width, height})=>this.getWebViewInfo(width,height)}
                             onMessage={(event)=>this.getSendMsg(event)}



                />

            </View>
        );
    }
}
