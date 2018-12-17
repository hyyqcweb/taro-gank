import Taro, { Component } from '@tarojs/taro'
import { View, Text, Video } from '@tarojs/components'
import './rest.less'

export default class Rest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      List: [],
      loading: true
    }
  }

  componentDidMount () {
    if(this.props.currentIndex === 0 || this.props.currentIndex === 1 || this.props.currentIndex === 2) {
      this.getRestData()
    }
  }

  getRestData() {
    Taro.showLoading({ title: '加载中' });
    Taro.request({
      url: 'https://api.apiopen.top/todayVideo',
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      Taro.hideLoading();
      const { data } = res;
      this.setState({
        List: data.result,
        loading: false
      })
    }).catch(err => {
      console.log(err);
    })
  }

  handleClick = (e, index) => {
    console.log(e);
    console.log(index);
  };

  render () {
    const { List, loading } = this.state;
    return (
      <View className='rest'>
        {
          !loading && List.map((d, i) =>
            d.data.content !== undefined &&
              <View className='item-box' key={i} onClick={this.handleClick.bind(this, i)}>
                <View className='title'>
                  <Video
                    src={d.data.content.data.playUrl}
                    autoplay={false}
                    controls
                    initialTime='0'
                    id='video'
                    loop={false}
                    muted={false}
                  />
                  <View className='bottom'>
                    <Text className='abstract'>简介: {d.data.content.data.title}</Text>
                    <Text className='category'>类型: {d.data.content.data.category}</Text>
                  </View>
                </View>
              </View>
          )
        }
      </View>
    )
  }
}

