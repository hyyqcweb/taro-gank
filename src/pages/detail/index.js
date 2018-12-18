import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem,Image } from '@tarojs/components'
import { AtList, AtListItem, AtCard } from "taro-ui"
import './style.less'

export default class Topic extends Component {

  config = {
    navigationBarTitleText: '详情'
  };

  constructor(props) {
    super(props);
    this.state = {
      propsItem: {}
    }
  }

  componentDidMount () {
    const { item } = this.$router.params;
    this.setState({
      propsItem: JSON.parse(item)
    })
  }


  render () {
    const { propsItem } = this.state;
    console.log(propsItem);
    return (
      <View className='container'>
        {
          JSON.stringify(propsItem) !== "{}" && propsItem.images !== undefined &&
          <Swiper
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            circular
            indicatorDots
            autoplay={false}
          >
            {
              propsItem.images.map((d, i) => {
                return <SwiperItem key={i}>
                  <Image src={d} style={{width:'100%', background: 'cover'}} mode='widthFix' />
                </SwiperItem>
              })
            }
          </Swiper>
        }
        {JSON.stringify(propsItem) !== "{}" &&
          <View className='content'>
            <AtCard
              note={`描述: ${propsItem.desc}`}
              extra={`类型: ${propsItem.type}`}
              title={`来源: ${propsItem.source}`}
              isFull
            >
              <AtList>
                <AtListItem title='日期' extraText={propsItem.publishedAt.substring(0, 10)} />
                <AtListItem title='作者' extraText={propsItem.who} />
              </AtList>
            </AtCard>
          </View>
        }
      </View>
    )
  }
}


