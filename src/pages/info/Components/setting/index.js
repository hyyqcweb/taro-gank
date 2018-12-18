import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './style.less'

export default class setting extends Component {

  config = {
    navigationBarTitleText: '系统信息'
  };

  constructor(props) {
    super(props);
    this.state = {
      item: {}
    }
  }

  componentDidMount () {
    Taro.getSystemInfo().then(res => {
      this.setState({
        item: res
      })
    }).catch(err => {
      console.log(err);
    })
  }

  render () {
    const { item } = this.state;
    return (
      <View className='content'>
        <View className='details'>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>手机品牌</Text>
            </View>
            <View className='item-icon'>
              <Text>{item.brand}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>手机型号</Text>
            </View>
            <View className='item-icon'>
              <Text>{item.model}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>操作系统版本</Text>
            </View>
            <View className='item-icon'>
              <Text>{item.system}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>微信版本号</Text>
            </View>
            <View className='item-icon'>
              <Text>{item.version}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>设备像素比</Text>
            </View>
            <View className='item-icon'>
              <Text>{item.pixelRatio}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

