import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Collect extends Component {

  config = {
    navigationBarTitleText: '我的收藏'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='collect'>
        <Text>我的收藏!</Text>
      </View>
    )
  }
}

