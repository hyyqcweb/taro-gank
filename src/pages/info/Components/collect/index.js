import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtSwipeAction, AtMessage} from "taro-ui";

export default class Collect extends Component {

  config = {
    navigationBarTitleText: '我的收藏'
  };

  constructor(props) {
    super(props);
    this.state = {
      storageArray: []
    }
  }

  componentDidMount () {
    Taro.getStorage({key: 'collect'}).then(res => {
      if(res.data.length) {
        this.setState({
          storageArray: JSON.parse(res.data)
        })
      }else {
        this.setState({
          storageArray: res.data
        })
      }
    }).catch(err => {
      console.log('err', err);
    });
  }

  // open detail
  handleDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/detail/index?item=${JSON.stringify(item)}`
    })
  };

  // open or close button
  onCollection = (item, index) => {
    let { storageArray } = this.state;
    Taro.atMessage({
      'message': '删除成功',
      'type': 'success',
    });
    storageArray.splice(index, 1);
    Taro.setStorageSync('collect', storageArray.length ? JSON.stringify(storageArray) : storageArray);
    this.setState({
      storageArray
    })
  };


  render () {
    let {storageArray} = this.state;

    const style = {
        marginTop: '5px',
        display: 'flex',
        flexFlow: 'column'
    };
    const list = {
      fontSize: '26px',
      lineHeight: '46px',
      color: '#9C978B'
    };
    return (
      <View style={style}>
        <AtMessage />
        {storageArray.length ? storageArray.map((d, i) =>
          <View style={list} key={d._id}>
            <AtSwipeAction onClick={this.onCollection.bind(this, d, i)} autoClose options={[
              {
                text: '删除',
                style: {
                  backgroundColor: '#FF4949'
                }
              }
            ]}
            >
              <Text onClick={this.handleDetail.bind(this, d)}>{i + 1}. {d.desc}</Text>
            </AtSwipeAction>
          </View>
        ) : '暂无收藏'}
      </View>
    )
  }
}

