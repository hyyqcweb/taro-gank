import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Picker, Button, Form } from '@tarojs/components'
import './style.less'
import onJudge from './Judge'

export default class Upload extends Component {

  config = {
    navigationBarTitleText: '提交干货'
  }

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      selector: ['Android', 'iOS', '休息视频', '福利', '拓展资源', '前端', '瞎推荐', 'App'],
      selectorChecked: 'Android',
    }
  }

  componentWillMount () { }

  componentDidMount () {
    const {userInfo} = this.$router.params;
    if(userInfo) {
      this.setState({
        userInfo : JSON.parse(userInfo)
      });
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  };

  show = (value) => {
    Taro.showToast({
      title: value,
      icon: 'none',
      duration: 2000,
    });
  };

  formSubmit = (e) => {
    let {desc, who, url, type} = e.detail.value;
    if(desc === "") {
      this.show('描述信息必填');
      return false;
    }else if(who === "") {
      this.show('提交者必填');
      return false;
    }else if(url === "") {
      this.show('url 地址必填');
      return false;
    }else {
      Taro.request({
        url: 'https://gank.io/api/add2gank',
        method: 'POST',
        data: {"desc":desc,"who":who, "url":url, "type":onJudge(type), "debug": true},
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        const {data} = res;
        Taro.showModal({
          title: '提示',
          content: data.msg,
        }).then(response => {
          if(response.confirm) {
            if(!data.error) {
              Taro.switchTab({
                url: '/pages/info/index'
              });
            }
          }
        });

      }).catch(err => {
        console.log(err);
      })
    }
  };

  render () {
    const {userInfo} = this.state;
    return (
      <View className='collect'>
        <Form onSubmit={this.formSubmit}>
          <View className='content'>
            <View className='item-list'>
              <Text>描述</Text>
              <Input type='text' placeholder='请输入描述信息...' name='desc' />
            </View>
            <View className='item-list'>
              <Text>提交者</Text>
              <Input type='text' placeholder='请输入提交者姓名...' value={userInfo.nickName} name='who' />
            </View>
            <View className='item-list'>
              <Text>URL</Text>
              <Input type='text' placeholder='请输入 url 地址...' name='url' />
            </View>
            <View className='page-body item-list'>
              <View className='page-section'>
                <Picker mode='selector' range={this.state.selector} onChange={this.onChange} name='type'>
                  <View className='picker'>
                    <Text className='type'>类型</Text>
                    <Text className='checked'>{this.state.selectorChecked}</Text>
                  </View>
                </Picker>
              </View>
            </View>
          </View>
          <Button className='submit' type='primary' formType='submit'>提交干货</Button>
        </Form>
      </View>
    )
  }
}
