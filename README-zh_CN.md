## 🔍 使用前必须阅读 

这是一个入门的小项目

**特别感谢 [Gank.io](https://gank.io/api)** 提供API

[English](./README.md) | 简体中文

## 💡 [GIF 预览](./README-figure_bed.md)

## 🍦 技术栈
> React + taro + taro-ui + es6 

## 📦 安装
```bash
  git clone https://github.com/hyyqcweb/taro-gank.git
  cd taro-gank
  yarn || npm install
```

## 🔨 预览 
```bash
  yarn dev:weapp || npm run dev:weapp  // 只做了微信小程序适配
  open weChat web development tool  // 打开微信web开发者工具
  click new project // 点击新建项目
  import taro-gank dist folder and write appid // 导入 taro-gank/dist 文件 并且填入 appid
```

## 💦 目录
```bash
\---src
    +---pages
    |   +---detail
    |   +---error
    |   +---index   
    |   +---info
    |   |   \---Components
    |   |       +---collect
    |   |       +---details
    |   |       +---imageUpload
    |   |       +---location
    |   |       +---setting
    |   |       +---upload
    |   +---log
    |   |   \---Components
    |   |       \---view
    |   +---topic
    +---static
    |   +---images
    |   +---info
    +---utils
```

## 📑 特性

✔ 导航内容**双联动**

✔ 利用 ```localStorage``` 进行**收藏, 删除, 去重**

✔ 原生 ```request``` 请求, 进行```promise```封装

✔ 腾讯地图SDK接入

✔ 全国城市 **拼音转汉字**

✔ 复杂数据结构转换

✔ 长按图片保存

## 🔥 如何联系
```bash
  junjie_hyyqc@163.com // 请注明您的来意
```

## 🍔 [捐赠](./README-wechat.md)

收到捐款后，我会及时更新捐款列表!

## 🌍 License

```MIT```
