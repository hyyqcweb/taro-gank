import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, ScrollView, Text} from '@tarojs/components'
import './index.less'
import '../../app.less'
import Api from '../../utils/api'

let page = 1;
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      navTab: ['Android', 'iOS', '前端'],
      currentIndex: 0,
      List: []
    }
  }

  componentDidMount() {
    const { navTab } = this.state;
    this.getData(navTab[0]);
  }

  getData(value, index) {
    Taro.showLoading({ title: '加载中' });
    Api.request({url:`data/${value}/10/${page}`}).then(res => {
      const { data } = res;
      Taro.hideLoading();
      if(index === undefined) {
        this.setState({
          List: data.results,
          loading: false
        })
      }else {
        const { List } = this.state;
        this.setState({
          List: List.concat(data.results),
          loading: false
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onClick = (index) => {
    this.setState({
      currentIndex: index
    })
  };

  handleToBottom = () => {
    const { currentIndex, navTab } = this.state;
    page++;
    this.getData(navTab[currentIndex], page);
  };

  handleChange = (e) => {
    const { navTab } = this.state;
    this.setState({
      currentIndex: e.detail.current
    });
    console.log(e);
    this.getData(navTab[e.detail.current]);
  };

  handleDetail = (item) => {
    Taro.navigateTo({
      url: `/pages/detail/index?item=${JSON.stringify(item)}`
    })
  };

  render() {
    const { navTab, currentIndex, List, loading } = this.state;
    console.log('List', List);
    return (
      <View className='index'>
        <View className='title'>
          {navTab.map((d, i) =>
            <View className={currentIndex === i ? 'flex-item active' : 'flex-item'} key={d.id} onClick={this.onClick.bind(this, i)}>
              {d}
            </View>
          )}
        </View>
        <View className='content'>
          <Swiper
            className='test-h'
            vertical={false}
            circular
            indicatorDots={false}
            current={currentIndex}
            onChange={this.handleChange.bind(this)}
          >
            {navTab.map((d, i) => (
              <SwiperItem key={i}>
                <View className={`demo-text-${i}`}>
                  <ScrollView
                    className='scroll-view'
                    scrollY
                    scrollWithAnimation
                    enableBackToTop
                    lowerThreshold='20'
                    upperThreshold='20'
                    onScrollToLower={this.handleToBottom.bind(this)}
                  >
                    {!loading && List.map((t, r) => {
                      return <View className='item-list' key={r} onClick={this.handleDetail.bind(this, t)}>
                        <View className='item-content'>
                          {t.desc}
                        </View>
                        <View className='item-bottom'>
                          <View className='fl'>
                            {t.publishedAt.substring(0, 10)}
                          </View>
                          <View className='fr'>
                            {t.who}
                          </View>
                        </View>
                      </View>
                    })}
                    <View className='load-more-container'>
                      <Text className='load-more-tips'>加载更多数据...</Text>
                    </View>
                  </ScrollView>
                </View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
      </View>
    )
  }
}

