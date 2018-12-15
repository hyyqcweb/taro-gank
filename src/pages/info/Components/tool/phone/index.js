import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'
import './style.less'

export default class Phone extends Component {
  constructor () {
    super(...arguments);
    this.state = {
      value: '',
      list: ''
    }
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  handleClick = () => {
    const { value } = this.state;
    if(!(/^1[34578]\d{9}$/.test(value))){
      Taro.atMessage({
        'message': '手机号码有误，请重填',
        'type': 'error',
      });
      return false;
    }

    Taro.request({
      url: `http://ws.webxml.com.cn/WebServices/MobileCodeWS.asmx/getMobileCodeInfo`,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        'mobileCode': value,
        'userID': ''
      }
    }).then(res => {
      const {data} = res;
      this.setState({
        value: '',
        list: data.substring(data.lastIndexOf('\/">') + 3 , data.lastIndexOf('\</string>'))
      });
    }).catch(err => {
      console.log(err);
    })
  };

  render () {
    const { list } = this.state;
    return (
      <View className='phone'>
        <AtMessage />
        <Text className='title'>手机归属地查询</Text>
        <View className='box'>
          <AtInput
            clear
            type='text'
            maxlength='11'
            placeholder='请输入手机号'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          >
            <AtButton type='primary' size='small' onClick={this.handleClick}>确定</AtButton>
          </AtInput>
        </View>
        <View className='desc'>
          {list}
        </View>
      </View>
    )
  }
}

