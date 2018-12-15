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
      qqMapSdk: qqMapSdk,
      weather: {}
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
            _that.getWeather(response.result.address);
          },
          fail: function (err) {
            console.log(err);
          }
        });
      }).catch(error => {
      console.log(error);
    });
  }

  getWeather = (value) => {
    Taro.request({
      url: `https://api.seniverse.com/v3/weather/now.json?key=frml54jabcv13hpy&location=${value.substring(3,5)}&language=zh-Hans&unit=c`
    }).then(res => {
      const { data } = res;
      this.setState({
        weather: data.results[0].now
      })
    }).catch(err => {
      console.log(err);
    })
  };

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onTap = (e) => {
    console.log(e)
  };

  render () {
    const {location, oldLocaltion, weather} = this.state;
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
          <Map onClick={this.onTap} longitude={oldLocaltion.lng} latitude={oldLocaltion.lat} showLocation	/>
        </View>
        <View className='weather'>
          <View className='header'>今日天气</View>
          <View className='box'>
            <Text>
              天气: {weather.text}
            </Text>
            <Text>
              气温: {weather.temperature}°
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

