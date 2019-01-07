import { starPng, livePng, locationPng, recentPng } from '../../../static/info'

const list = [
  {img: starPng, name: '我的收藏', hash: 'collect'},
  {img: livePng, name: '提交干货', hash: 'upload'},
  // {img: eyePng, name: '实用工具', hash: 'tool'},
  {img: locationPng, name: '地图定位', hash: 'location'},
  // {img: scanPng, name: '扫一扫', hash: 'scan'}, // weChat already have scan
  {img: recentPng, name: '系统信息', hash: 'setting'},
  // {img: excepPng, name: '打赏', hash: 'exceptional'},
];

export default list
