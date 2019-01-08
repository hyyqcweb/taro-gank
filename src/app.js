import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.less'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/topic/index',
      'pages/log/index',
      'pages/info/index',
      'pages/detail/index',
      'pages/error/index',
      // info details
      'pages/info/Components/details/index',
      'pages/info/Components/collect/index',
      'pages/info/Components/upload/index',
      'pages/info/Components/location/index',
      'pages/info/Components/setting/index',
      'pages/info/Components/imageUpload/index',
      // log details
      'pages/log/Components/view/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#9C978B',
      navigationBarTitleText: '干货集中营',
      navigationBarTextStyle: 'white'
    },
    "tabBar": {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#b4282d",
      "color": "#666",
      "list": [
        {
          "pagePath": "pages/index/index",
          "iconPath": "static/images/ic_menu_choice_nor.png",
          "selectedIconPath": "static/images/ic_menu_choice_pressed.png",
          "text": "首页"
        },
        {
          "pagePath": "pages/topic/index",
          "iconPath": "static/images/ic_menu_topic_nor.png",
          "selectedIconPath": "static/images/ic_menu_topic_pressed.png",
          "text": "推荐"
        },
        {
          "pagePath": "pages/log/index",
          "iconPath": "static/images/ic_menu_sort_nor.png",
          "selectedIconPath": "static/images/ic_menu_sort_pressed.png",
          "text": "分类"
        },
        {
          "pagePath": "pages/info/index",
          "iconPath": "static/images/ic_menu_me_nor.png",
          "selectedIconPath": "static/images/ic_menu_me_pressed.png",
          "text": "我的"
        }
      ]
    }
  };

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'));
