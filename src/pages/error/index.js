import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import Err from '../../static/error.png'

export default class Topic extends Component {

  config = {
    navigationBarTitleText: 'Oh oh'
  };

  componentDidMount () {
    console.log(this.$router.params)
  }

  handleClick = () => {
    Taro.switchTab({
      url: '/pages/index/index'
    });
  };

  render () {
    const container = {
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        flexDirection: 'column',
        width: '100%',
        height: '100vh'
    };

    const title = {
      fontSize: '18px',
      color: '#bababa',
      marginTop: '10px',
      marginBottom: '10px'
    };

    return (
      <View style={container}>
        <Image src={Err} />
        <Text style={title}>抱歉,服务器离家出走了!</Text>
        <Button plain onClick={this.handleClick}>返回首页</Button>
      </View>
    )
  }
}


