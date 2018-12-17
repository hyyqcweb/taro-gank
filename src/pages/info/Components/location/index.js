import Taro, { Component } from '@tarojs/taro'
import { View, Text, Map } from '@tarojs/components'
import './style.less'
import { AtCard, AtAccordion, AtList, AtListItem  } from "taro-ui"
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
      url: `https://www.apiopen.top/weatherApi?city=${value.substring(3,5)}`
    }).then(res => {
      const { data } = res;
      this.setState({
        weather: data.data
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

  onClick = (index) => {
    console.log(index);
  };

  render () {
    const {location, oldLocaltion, weather} = this.state;
    console.log(weather);
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

        {
          JSON.stringify(weather) !== "{}" ? <AtCard
            note={`温馨提示: ${weather.ganmao}`}
            extra={`${weather.forecast.length && weather.forecast[0].type} ${weather.wendu}°`}
            title={`${weather.city.substring(0, 2)} 天气`}
            thumb='http://www.logoquan.com/upload/list/20171008/logoquan15081601617.PNG'
            isFull
          >
            {weather.forecast.map((d, i) => {
              return <AtAccordion
                onClick={this.onClick.bind(this, i)}
                title={`${d.date.substring(0, 2)}号 ( ${d.date.substring(3)} )`}
                key={i}
              >
                <AtList hasBorder={false}>
                  <AtListItem
                    title='最高气温'
                    extraText={d.high}
                  />
                  <AtListItem
                    title='最低气温'
                    extraText={d.low}
                  />
                  <AtListItem
                    title='风向'
                    extraText={d.fengxiang}
                  />
                  <AtListItem
                    title='类型'
                    extraText={d.type}
                  />
                </AtList>
              </AtAccordion>
            })}
          </AtCard> : '正在加载中...'
        }
      </View>
    )
  }
}

