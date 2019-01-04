## 使用前必须阅读 🔍

这是一个入门的小项目

**特别感谢 [Gank.io](https://gank.io/api)** 提供API

[English](./README.md) | 简体中文

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
    |   +---detail // 详情页
    |   +---error // 错误页
    |   +---index // 首页 
    |   +---info // 我的
    |   |   \---Components
    |   |       +---collect // 收藏
    |   |       +---details // 个人信息
    |   |       +---exceptional // 打赏
    |   |       +---imageUpload // 图片上传(没有服务器支持)
    |   |       +---location // 定位
    |   |       +---scan // 扫码
    |   |       +---setting // 设置
    |   |       +---tool // 工具
    |   |       |   \---phone // 手机号查询
    |   |       +---upload // 提交
    |   +---log // 分类
    |   |   \---Components
    |   |       \---view
    |   +---topic // 推荐
    +---static // 静态资源
    |   +---images
    |   +---info
    +---utils // 工具类
```

## 🔥 如何联系
```bash
  junjie_hyyqc@163.com // 请注明您的来意
```

## 🌍 License

```MIT```
