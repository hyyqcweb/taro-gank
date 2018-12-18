import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Button, Image, ScrollView } from '@tarojs/components'
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
      item: {},
      category: []
    }
  }

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
        loading: false,
        category: data.category
      })
    }).catch(err => {
      console.log(err);
    })
  };

  // switch date
  onChange = e => {
    const { dataList} = this.state;
    this.setState({
      selectorChecked: dataList[e.detail.value]
    });
    this.getData(dataList[e.detail.value]);
  };

  // scroll-event
  onScrolltoupper = e => {
    console.log(e);
  };

  onScroll = e => {
    console.log(e);
  };

  // open detail
  handleDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/detail/index?item=${JSON.stringify(item)}`
    })
  };

  render () {
    const { dataList, selectorChecked, item, loading, category } = this.state;
    console.log(item);
    console.log(category);
    return (
      <View className='container'>
        {!loading && JSON.stringify(item) !== "{}" &&
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 100%'
          onScrolltoupper={this.onScrolltoupper}
          onScroll={this.onScroll}
        >
            <View className='title'>
              <Image className='title-img' src={item['福利'][0].url} mode='widthFix' />
            </View>
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
            {category.length && category.map((d, i) =>
              <View key={i} className='section'>
                  <View className='section-title'>
                    {d}
                  </View>
                  <View className='section-content'>
                    {item[d].map(v =>
                      <View className='section-list' key={v._id} onClick={this.handleDetail.bind(this, v)}>
                          {v.desc}
                      </View>
                    )}
                  </View>
              </View>
            )}
        </ScrollView>
        }
      </View>
    )
  }
}

