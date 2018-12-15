import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, Map } from '@tarojs/components'
import List from './Components/list'
import './style.less'

export default class Info extends Component {

  config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props);
    this.state = {
      userInfo : {}
    }
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.login().then(res => {
      console.log(res);
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

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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

  onTap = (e) => {
    console.log(e)
  };

  render () {
    const { userInfo } = this.state;
    return (
        <View className='info'>
          {/* test unauthorized*/}
          {JSON.stringify(userInfo) === "{}" && <Button open-type='getUserInfo' onClick={this.clickUserInfo}>获取授权</Button>}

          {/* avatar name */}
          <View className='warp-flex title'>
            <View className='avatar'>
              <Image className='user-info-avatar' src={userInfo.avatarUrl} backgroundSize='cover' />
            </View>
            <View className='user-info'>
              <Text className='nickname'>{userInfo.nickName}</Text>
              <Text className='edit' onClick={this.handleEdit}>查看或编辑个人主页</Text>
            </View>
          </View>

          {/* list */}
          <View className='item-list'>
            {List.map((d, i) =>
              <View className='warp-flex' key={i} onClick={this.handleClick.bind(this, d.hash)}>
                <View className='item-icon'>
                  <Image class='item-img' src={d.img} />
                </View>
                <View className='item-name'>
                  <Text>{d.name}</Text>
                </View>
              </View>
            )}
          </View>
          {/*weather*/}
          <Map onClick={this.onTap} scale='5' />
        </View>
    )
  }
}

