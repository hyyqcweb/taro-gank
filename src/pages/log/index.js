import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Log extends Component {

  config = {
    navigationBarTitleText: '分类'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='log'>
        <Text>分类!</Text>
      </View>
    )
  }
}

