import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './style.less'
import QQMapWX from '../../../../utils/qqmap-wx-jssdk'

export default class Location extends Component {

  config = {
    navigationBarTitleText: '地图定位'
  };

  constructor(props) {
    super(props);
    const qqMapSdk = new QQMapWX({ key: '2LEBZ-4HA3U-LURVA-46SOK-PLYQ2-YMB6G' }); // import tencent map key
    this.state = {
      location: '',
      qqMapSdk: qqMapSdk
    };
  }

  componentWillMount () { }

  componentDidMount () {
    const { qqMapSdk } = this.state;
    let _that = this;
    Taro.getLocation()
      .then(res => {
        console.log(res);
        qqMapSdk.reverseGeocoder({ // reverse parsing location
          location: {latitude: res.latitude, longitude: res.longitude},
          success: function (response) {
            console.log(response);
            _that.setState({location: response.result.address});
          },
          fail: function (err) {
            console.log(err);
          }
        });
      }).catch(error => {
      console.log(error);
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {location} = this.state;
    return (
      <View className='content'>
        <Text className='name'>
          所在城市:
        </Text>
        <Text className='city'>
          {location}
        </Text>
      </View>
    )
  }
}

