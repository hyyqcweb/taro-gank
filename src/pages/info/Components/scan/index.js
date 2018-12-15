import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

export default class ScanQrCode extends Component {

  config = {
    navigationBarTitleText: '扫一扫'
  }

  componentDidMount () {
    this.onScanQrCode()
  }

  onScanQrCode() {
    Taro.scanCode().then(res => {
      console.log(res);
      Taro.showModal({
        title: '提示',
        content: res.result,
      });
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='content'>
        <Button type='primary' onClick={this.onScanQrCode}>扫一扫!</Button>
      </View>
    )
  }
}

