import Taro, { Component } from '@tarojs/taro'
import { View, Text, Map } from '@tarojs/components'
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
      oldLocaltion: '',
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
            _that.setState({
              location: response.result.address,
              oldLocaltion: response.result.location
            });
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

  onTap = (e) => {
    console.log(e)
  };

  render () {
    const {location, oldLocaltion} = this.state;
    return (
      <View className='content'>
        <View className='title'>
          <Text className='name'>
            所在城市:
          </Text>
          <Text className='city'>
            {location}
          </Text>
        </View>
        <View className='location-map'>
          <Map onClick={this.onTap} longitude={oldLocaltion.lng} latitude={oldLocaltion.lat} showLocation	 />
        </View>
      </View>
    )
  }
}

