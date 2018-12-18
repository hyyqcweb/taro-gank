import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './style.less'
import getRegion from '../../../../utils/conversion'

export default class Details extends Component {

  config = {
    navigationBarTitleText: '个人信息'
  }

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      countries: ''
    }
  }

  componentDidMount () {
    const {userInfo} = this.$router.params;
    if(userInfo) {
      this.setState({
        userInfo : JSON.parse(userInfo)
      },() => {
        Taro.request({
          url: `http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_CN&q=${this.state.userInfo.country}`
        }).then(res => {
          const {data} = res;
          this.setState({
            countries: data.sentences[0].trans
          })
        }).catch(err => {
          console.log(err);
        })
      });
    }
  }

  render () {
    const {userInfo, countries} = this.state;
    let province, city = '';
    if(JSON.stringify(userInfo) !== "{}") {
      province = getRegion((userInfo.province).toLowerCase());
      city = getRegion(userInfo.city.toLowerCase());
    }
    return (
      <View className='content'>
        <View className='details'>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>头像</Text>
            </View>
            <View className='item-icon'>
              <Image class='item-img' src={userInfo.avatarUrl} />
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>名字</Text>
            </View>
            <View className='item-icon'>
              <Text>{userInfo.nickName}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>性别</Text>
            </View>
            <View className='item-icon'>
              <Text>{userInfo.gender === 1 ? '男' : '女'}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>地区</Text>
            </View>
            <View className='item-icon'>
              <Text>{province} - {city}</Text>
            </View>
          </View>
          <View className='warp-flex title'>
            <View className='item-name'>
              <Text>国家</Text>
            </View>
            <View className='item-icon'>
              <Text>{countries}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

