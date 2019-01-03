import Taro, { Component } from '@tarojs/taro'
import { View, Text, Map } from '@tarojs/components'
import { AtCard, AtAccordion, AtList, AtListItem  } from "taro-ui"
import './style.less'
import QQMapWX from '../../../../utils/qqmap-wx-jssdk'
import WTL from '../../../../static/wtl.png'

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

  componentDidMount () {
    const { qqMapSdk } = this.state;
    let _that = this;
    Taro.getLocation()
      .then(res => {
        qqMapSdk.reverseGeocoder({ // reverse parsing location
          location: {latitude: res.latitude, longitude: res.longitude},
          success: function (response) {
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

  onTap = (e) => {
    console.log(e)
  };

  onClick = (index) => {
    console.log(index);
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

        {
          JSON.stringify(weather) !== "{}" ? <AtCard
            note={`温馨提示: ${weather.ganmao}`}
            extra={`${weather.forecast.length && weather.forecast[0].type} ${weather.wendu}°`}
            title={`${weather.city.substring(0, 2)} 天气`}
            thumb={WTL}
            isFull
          >
            {weather.forecast.map((d, i) =>
              <AtAccordion
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
            )}
          </AtCard> : '正在加载中...'
        }
      </View>
    )
  }
}

