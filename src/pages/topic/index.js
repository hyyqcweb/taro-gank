import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Button, Image } from '@tarojs/components'
import './style.less'

export default class Topic extends Component {

  config = {
    navigationBarTitleText: '推荐'
  };

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      selectorChecked: '',
      loading: true,
      item: {}
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getHistory()
  }

  // get history data
  getHistory() {
    Taro.request({
      url: 'http://gank.io/api/day/history',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const {data} = res;
      this.setState({
        dataList: data.results,
        selectorChecked: data.results[0]
      });
      this.getData(data.results[0]);
    }).catch(err => {
      console.log(err)
    })
  }

  // get content data
  getData = (value) => {
    Taro.showLoading({ title: '加载中' });
    console.log(value.split("-").join("\/"));  // string to array to string
    Taro.request({
      url: `https://gank.io/api/day/${value.split("-").join("\/")}`,
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const { data } = res;
      Taro.hideLoading();
      this.setState({
        item: data.results,
        loading: false
      })
    }).catch(err => {
      console.log(err);
    })
  };

  onChange = e => {
    const { dataList} = this.state;
    this.setState({
      selectorChecked: dataList[e.detail.value]
    });
    this.getData(dataList[e.detail.value]);
  };

  render () {
    const { dataList, selectorChecked, item, loading  } = this.state;
    console.log(item);
    return (
      <View className='container'>
        {!loading && JSON.stringify(item) !== "{}" &&
          <View className='title'>
            <Image src={item['福利'][0].url} />
          </View>
        }
        <View className='page-section'>
          <View>
            <Picker mode='selector' range={dataList} onChange={this.onChange}>
              <View className='picker'>
                <View className='header'>
                  <Text>{selectorChecked}</Text>
                  <Button type='primary'>切换日期</Button>
                </View>
              </View>
            </Picker>
          </View>
        </View>
      </View>
    )
  }
}

