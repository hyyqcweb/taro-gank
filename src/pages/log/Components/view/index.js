import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './style.less'

export default class ImageView extends Component {

  config = {
    navigationBarTitleText: '图片预览'
  }

  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const { url } = this.$router.params;
    this.setState({
      url
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { url } = this.state;
    return (
      <View className='imageView'>
        <Image src={url} />
      </View>
    )
  }
}

