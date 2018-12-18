import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './style.less'
import Phone from './phone'

export default class Tool extends Component {

  config = {
    navigationBarTitleText: '实用工具集合'
  };

  render () {
    return (
      <View className='content'>
        <Phone />
      </View>
    )
  }
}

