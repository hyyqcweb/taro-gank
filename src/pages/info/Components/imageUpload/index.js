import Taro, { Component } from '@tarojs/taro'
import {Image, View} from '@tarojs/components'
import '../../../log/Components/view/style.less'

export default class Topic extends Component {

  config = {
    navigationBarTitleText: '个人头像'
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

  render () {
    const { url } = this.state;
    const container = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const img = {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      display: 'block'
    };

    return (
      <View style={container}>
        <Image src={url} mode='widthFix' style={img} />
      </View>
    )
  }
}

