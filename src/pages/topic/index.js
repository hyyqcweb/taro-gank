import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Topic extends Component {

  config = {
    navigationBarTitleText: '推荐'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='topic'>
        <Text>推荐!</Text>
      </View>
    )
  }
}

