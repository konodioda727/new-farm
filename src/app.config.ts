export default defineAppConfig({
  pages: [
    // 主界面
    'pages/index/index',
    // 用户信息界面
    'pages/userInfo/index',
    // VR界面
    'pages/map/index',
    // 农田界面
    'pages/maintainer/index',
    'pages/maintainer/farmLand/index',
    'pages/maintainer/product/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // custom: true,
    color: '#fff',
    backgroundColor: '#112d38',
    borderStyle:'black',
   
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath:'images/custom/home.png',
        selectedIconPath:'images/custom/home.png',
        text: '首页',
      },
      {
        pagePath: 'pages/maintainer/index',
        iconPath:'images/custom/application.png',
        selectedIconPath:'images/custom/application.png',
        text: '主要功能',
      },
      {
        pagePath: 'pages/userInfo/index',
        iconPath:'images/custom/userinfo.png',
        selectedIconPath:'images/custom/userinfo.png',
        text: '个人信息',
      },
    ],
  },
})
