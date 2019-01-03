import Taro from '@tarojs/taro'

export default class Api {
  static request(option, head=false) {
    let baseUrl = "http://gank.io/api/";
    let generalUrl = "https://gank.io/api/";
    return new Promise(resolve => {
      Taro.request({
        url: (head ? generalUrl : baseUrl) + option.url,
        method: option.method ? option.method : 'GET',
        header: !!option.header ? option.header : {
          'Content-Type': 'application/json'
        },
        timeout: 25000,
        params: (option.params ? option.params : ''),
        data: option.data
      }).then(res => {
        if(res.statusCode === 200) {
          resolve(res);
        }else {
          Taro.navigateTo({
            url: `/pages/error/index?err=${JSON.stringify(res)}`
          });
        }
      })
    })
  }
}
