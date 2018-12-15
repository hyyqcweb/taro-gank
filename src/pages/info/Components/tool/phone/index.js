import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './style.less'

export default class Phone extends Component {

  onConfirm = (e) => {
    console.log(e);
  };

  render () {
    return (
      <View className='phone'>
        <Text className='title'>手机归属地查询</Text>
        <View className='box'>
          <Input type='text' placeholder='请输入查询的手机号' onConfirm={this.onConfirm} />
          <Button>点击提交</Button>
        </View>
        <View className='desc'>
          123
        </View>
      </View>
    )
  }
}

