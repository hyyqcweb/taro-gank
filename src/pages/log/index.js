import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './style.less'

export default class Log extends Component {

  config = {
    navigationBarTitleText: '分类'
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      dataGroup: []
    }
  }

  componentWillMount () { }

  componentDidMount () {
     this.getData()
  }

  getData = () => {
    let { page } = this.state;
    Taro.request({
      url: `http://gank.io/api/data/福利/10/${page}`,
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      const {data} = res;
      if(!data.error) {
        this.convertData(data.results);
      }
    }).catch(err => {
      console.log(err);
    })
  };

  convertData = (item) => {
    let dataGroup = [];
    let group = [];
    item.map(girlInfo => {
      girlInfo.url = girlInfo.url.replace('http://ww', 'http://ws');
      if (group.length === 2)  {
        dataGroup.push(group);
        group = [girlInfo]
      } else {
        group.push(girlInfo)
      }
    });

    if (group.length > 0) {
      dataGroup.push(group)
    }
    this.setState({
      dataGroup
    });
    return dataGroup
  };

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = (url) => {
    Taro.navigateTo({
      url: `/pages/log/Components/view/index?url=${url}`
    })
  };

  render () {
    const { dataGroup } = this.state;
    return (
      <View className='log'>
        {dataGroup.map((d, i) => (
          <View className='item-container' key={i}>
            <View className='item' onClick={this.handleClick.bind(this, d[0].url)}>
              <Image src={d[0].url} />
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
      </View>
    )
  }
}

