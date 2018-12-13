import Taro, { Component } from '@tarojs/taro'
import { View, Text, Video } from '@tarojs/components'
import './rest.less'

let page = 1;
export default class Rest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      List: [],
      loading: true
    }
  }

  componentDidMount () {
    this.getRestData()
  }

  getRestData() {
    Taro.showLoading({ title: '加载中' });
    Taro.request({
      url: `https://api.apiopen.top/videoCategory`,
      header: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      Taro.hideLoading();
      const { data } = res;
      console.log(data.result);
    }).catch(err => {
      console.log(err);
    })
  }

  handleClick = (e, index) => {
    console.log(e);
    console.log(index);
  };

  render () {
    const { List } = this.state;
    return (
      <View className='rest'>
        {List.map((d, i) =>
          <View className='item-box' key={i} onClick={this.handleClick.bind(this, i)}>
            <View className='title'>
              <Video
                src={d.url}
                autoplay={false}
                controls
                initialTime='0'
                id='video'
                loop={false}
                muted={false}
              />
              <Text className='abstract'>{d.desc}</Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

