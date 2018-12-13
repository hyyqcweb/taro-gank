import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      navTab: [],
      currentIndex: 0,
    }
  }

  componentDidMount() {
    this.getRestData()
  }

  getRestData() {
    Taro.showLoading({title: '加载中'});
    Taro.request({
      url: `https://api.apiopen.top/videoCategory`,
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      Taro.hideLoading();
      const {itemList} = res.data.result;
      this.getPushArray(itemList);
    }).catch(err => {
      console.log(err);
    })
  }

  getPushArray(item) {
    let array = [];
    item.map(d => {
      array.push(d.data);
    });
    this.setState({
      navTab: array
    })
  }

  onClick = (id, index) => {
    this.setState({
      currentIndex: index
    })
  };

  handleLeft = (e) => {
    console.log(e);
  };

  handleRight = (e) => {
    console.log(e)
  };

  render() {
    const { navTab, currentIndex } = this.state;
    return (
      <View className='index'>
        <ScrollView
          scrollX
          scrollWithAnimation
          onScrollToUpper={this.handleLeft}
          onScrollToLower={this.handleRight}
        >
          <View className='title'>
            {navTab.map((d, i) =>
              <View className={currentIndex === i ? 'flex-item active' : 'flex-item'} key={d.id} onClick={this.onClick.bind(this, d.id, i)}>
                {d.title.substring(1)}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

