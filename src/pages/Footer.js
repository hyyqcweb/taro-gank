import Taro, {Component} from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import '../app.less'

export default class Footer extends Component{
  render() {
    const { page } = this.props;
    return (
      <View className='load-more-container'>
        {page === 7 ? <Text className='load-more-tips'>没有更多数据了...</Text> : <Text className='load-more-tips'>加载更多数据...</Text>}
      </View>
    )
  }
}
