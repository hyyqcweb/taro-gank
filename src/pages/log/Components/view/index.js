import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './style.less'

export default class ImageView extends Component {

  config = {
    navigationBarTitleText: '图片预览'
  };

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentDidMount () {
    const { url } = this.$router.params;
    this.setState({
      url
    })
  }

  handleLongPress = (url) => {
    Taro.downloadFile({
      url
    }).then(res => {
      let path = res.tempFilePath;
      Taro.saveImageToPhotosAlbum({
        filePath: path
      }).then(r => {
        console.log(r);
        Taro.showToast({
          title: '已保存到系统相册'
        })
      })
    })
  };

  render () {
    const { url } = this.state;
    return (
      <View className='imageView' onLongPress={this.handleLongPress.bind(this, url)}>
        <Image src={url} mode='widthFix' />
      </View>
    )
  }
}

