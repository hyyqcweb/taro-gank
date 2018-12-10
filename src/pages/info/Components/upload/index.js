import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Picker, Button, Form } from '@tarojs/components'
import './style.less'

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
      switch (type) {
        case type === "" || type === "0":
          type = 'Android';
          break;
        case type === "1":
          type = 'iOS';
          break;
        case type === "2":
          type = '休息视频';
          break;
        case type === "3":
          type = '福利';
          break;
        case type === "4":
          type = '拓展资源';
          break;
        case type === "5":
          type = '前端';
          break;
        case type === "6":
          type = '瞎推荐';
          break;
        case type === "7":
          type = 'App';
          break;
      }
      console.log(desc, who, url, type);
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
