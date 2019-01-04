import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import '../app.less'

export default class Title extends Component{

 render() {
   const {navTab, currentIndex, onClick} = this.props;
   return (
     <View className='T-title'>
       {navTab.map((d, i) =>
         <View className={currentIndex === i ? 'flex-item active' : 'flex-item'} key={i} onClick={onClick.bind(this, i)}>
           {d}
         </View>
       )}
     </View>
   )
 }
}
