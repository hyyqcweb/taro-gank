import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './style.less'
import Phone from './phone'

export default class Tool extends Component {

  config = {
    navigationBarTitleText: '实用工具集合'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='content'>
        <Phone />
      </View>
    )
  }
}

