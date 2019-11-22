/**
 * 详情页面（二级页面）
 *
 * Created by 材主<diamont1001@163.com> on 2019/04/19.
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import {Text, Header, Icon} from 'react-native-elements';

import {AppTheme} from './theme';

type Props = {};
import {observer, inject} from 'mobx-react'
import {runInAction} from 'mobx'

@inject('account')
@observer
export default class DetailStack extends Component<Props> {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    };


    changeInfo = () => {
        runInAction(() => {
            this.props.account.testThings({userId: 'Mobx', password: 'Mobx'})
        })
    }

    render() {
        console.log('accountDetail', this.props.account)
        return (
            <View style={AppTheme.pageContainer}>
                <Header
                    leftComponent={<Icon name={'3d-rotation'} onPress={() => this.changeInfo()}/>}
                    centerComponent={{text: 'page', style: {color: '#fff'}}}
                />
                <ScrollView>
                    <Text style={styles.welcome}>{this.props.account.userId}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});