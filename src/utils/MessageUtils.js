import {DeviceEventEmitter} from 'react-native'

function _sendMsg(action,paylod,callbackId,webviewPageContainer) {
    DeviceEventEmitter.emit(action,{...paylod,callbackId})
    if(webviewPageContainer&&webviewPageContainer.web&&webviewPageContainer.canInjectJavaScript){
        let js = 'var event = new CustomEvent("message_from_app", {detail: ' + JSON.stringify({action, paylod, callbackId}) + '});';
        js = js + 'window.document.dispatchEvent(event);true;';
        webviewPageContainer.web.webview.injectJavaScript(js);
    }
}

const info={
    sendMsg:function ({action,paylod,callbackId},webviewPageContainer) {
        // console.log('webviewPageContainer',webviewPageContainer.web)
        console.log('webviewPageContainer222')
        if(webviewPageContainer&&webviewPageContainer.web&&webviewPageContainer.web.canInjectJavaScript){
            console.log('webviewPageContainer333', webviewPageContainer.web.injectJavaScript)
            console.log('webviewPageContainer',action,paylod,callbackId)
            let js = 'var event = new CustomEvent("message_from_app", {detail: ' + JSON.stringify({action, paylod, callbackId}) + '});';
            js = js + 'window.document.dispatchEvent(event);true;';
            webviewPageContainer.web.webview.injectJavaScript(js);
        }
        
    },
    handleMsg:function (data,webviewPageContainer) {
        //处理传递来的消息
        if(data){

            let action = data.action;
            let paylod = data.paylod||{}; //数据
            let callbackId = data.callbackId; //传递的函数
            if(action==='log'){
                console.log('webjs',data.info)
                return
            }
            _sendMsg(action,paylod,callbackId,webviewPageContainer)

        }

    }
}
export default  info