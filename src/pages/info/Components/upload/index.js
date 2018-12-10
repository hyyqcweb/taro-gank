import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Upload extends Component {

  config = {
    navigationBarTitleText: '提交干货'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='collect'>
        <Text>提交干货!</Text>
      </View>
    )
  }
}

