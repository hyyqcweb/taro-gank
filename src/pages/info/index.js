import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Info extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='info'>
        <Text>我的!</Text>
      </View>
    )
  }
}

