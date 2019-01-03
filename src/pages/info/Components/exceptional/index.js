import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import weChatQrCode from '../../../../static/info/weChat-qrcode.jpg'
import '../../../log/Components/view/style.less'

export default class ScanQrCode extends Component {

  config = {
    navigationBarTitleText: '打赏作者'
  };

  handleLongPress = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: weChatQrCode
    }).then(() => {
      Taro.showToast({
        title: '已保存到系统相册'
      })
    })
  };

  render () {
    return (
      <View className='imageView' onLongPress={this.handleLongPress.bind(this)}>
        <Image src={weChatQrCode} mode='widthFix' />
      </View>
    )
  }
}

