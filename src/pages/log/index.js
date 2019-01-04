import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import './style.less'
import Api from '../../utils/api'
import Rvideo from './Video'
import Hot from './Hot'
import Footer from '../Footer'
import Title from "../Title";

let page = 1;
export default class Log extends Component {

  config = {
    navigationBarTitleText: '分类'
  };

  constructor(props) {
    super(props);
    this.state = {
      dataGroup: [],
      loading: true,
      navTab: ['妹子', '视频', '热门'],
      currentIndex: 0,
    }
  }

  componentDidMount () {
     this.getData()
  }

  getData = () => {
    Taro.showLoading({ title: '加载中' });
    Api.request({url:`data/福利/10/${page}`}).then(res => {
      const {data} = res;
      Taro.hideLoading();
      if(!data.error) {
        this.convertData(data.results);
      }
    })
  };

  convertData = (item) => {
    let data = [];
    let group = [];
    item.map(d => {
      d.url = d.url.replace('http://ww', 'http://ws');
      if (group.length === 2)  {
        data.push(group);
        group = [d]
      } else {
        group.push(d)
      }
    });

    if (group.length > 0) {
      data.push(group)
    }
    const { dataGroup } = this.state;
    if(dataGroup.length) {
      this.setState({
        dataGroup: dataGroup.concat(data),
        loading: false
      });
    }else {
      this.setState({
        dataGroup: data,
        loading: false
      });
    }
    return data
  };

  handleClick = (url) => {
    Taro.navigateTo({
      url: `/pages/log/Components/view/index?url=${url}`
    })
  };

  onScrollToLower = () => {
    if(page === 7) {
      Taro.showToast({ title: '我也是有底线的' });
    }else {
      page++;
      this.getData();
    }

  };

  onClick(index) {
    this.setState({
      currentIndex: index
    })
  }

  render () {
    const { dataGroup, loading, navTab, currentIndex } = this.state;
    return (
      <View className='log'>
        <Title currentIndex={currentIndex} navTab={navTab} onClick={this.onClick.bind(this)} />
        <View className='content'>
          <View className='sister' hidden={currentIndex !== 0}>
            <ScrollView scrollY style='height:1000px;' onScrollToLower={this.onScrollToLower.bind(this)} lowerThreshold='20' enableBackToTop>
              {!loading && dataGroup.map((d, i) => (
                <View className='item-container' key={i}>
                  <View className='item' onClick={this.handleClick.bind(this, d[0].url)}>
                    <Image src={d[0].url} lazyLoad />
                    <View className='bottom'>
                      <Text className='fl'>{d[0].desc}</Text>
                      <Text className='fr'>via: {d[0].who}</Text>
                    </View>
                  </View>
                  <View className='item'>
                    <Image src={d.length > 1 && d[1].url} onClick={this.handleClick.bind(this, d[1].url)} />
                    <View className='bottom'>
                      <Text className='fl'>{d.length > 1 && d[1].desc}</Text>
                      <Text className='fr'>{d.length > 1 && <Text>via: {d[1].who}</Text>}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <Footer page={page} />
            </ScrollView>
          </View>
          <View className='rest' hidden={currentIndex !== 1}>
            <Rvideo currentIndex={currentIndex} />
          </View>
          <View className='hot' hidden={currentIndex !== 2}>
            <Hot />
          </View>
        </View>
      </View>
    )
  }
}

