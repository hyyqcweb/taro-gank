import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import List from './Components/list'
import './style.less'

export default class Info extends Component {

  config = {
    navigationBarTitleText: '我的'
  };

  constructor(props) {
    super(props);
    this.state = {
      userInfo : {}
    }
  }

  componentDidMount () {
    Taro.login().then(() => {
      Taro.getUserInfo().then(response => {
        const {userInfo} = response;
        this.setState({
          userInfo
        })
      }).catch(error => {
        console.log('error', error);
      })
    }).catch(err => {
      console.log(err, '1');
    })
  }

  clickUserInfo = () => {
    Taro.getUserInfo().then(response => {
      const {userInfo} = response;
      this.setState({
        userInfo
      })
    }).catch(error => {
      console.log('error', error);
    })
  };

  handleEdit = () => {
    let {userInfo} = this.state;
    Taro.navigateTo({
      url: `/pages/info/Components/details/index?userInfo=${JSON.stringify(userInfo)}`
    })
  };

  handleClick = (value) => {
    let {userInfo} = this.state;
    Taro.navigateTo({
      url: `/pages/info/Components/${value}/index?userInfo=${JSON.stringify(userInfo)}`
    })
  };

  render () {
    const { userInfo } = this.state;
    return (
        <View className='info'>
          {JSON.stringify(userInfo) === "{}" && <Button open-type='getUserInfo' onClick={this.clickUserInfo}>获取授权</Button>}
          <View className='warp-flex title'>
            <View className='avatar'>
              <Image className='user-info-avatar' src={userInfo.avatarUrl} backgroundSize='cover' />
            </View>
            <View className='user-info'>
              <View className='fl'>
                <Text className='nickname'>{userInfo.nickName}</Text>
                <Text className='edit'>微信登录</Text>
              </View>
              <View className='fr' onClick={this.handleEdit}>
                <AtIcon value='settings' size='20' />
              </View>
            </View>
          </View>
          {List.map((d, i) =>
            <View className='item-list' key={i}>
              <View className='warp-flex udl' onClick={this.handleClick.bind(this, d.hash)}>
                <View className='fl'>
                  <View className='item-icon'>
                    <Image class='item-img' src={d.img}/>
                  </View>
                  <View className='item-name'>
                    <Text>{d.name}</Text>
                  </View>
                </View>
                <View className='fr'>
                  <AtIcon value='chevron-right' size='20'/>
                </View>
              </View>
            </View>
          )}
        </View>
    )
  }
}



