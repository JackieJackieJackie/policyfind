//app.js
import _HUIBAOData from '/utils/data';
var timer;
var currentTime;
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    var userSet = '',
      that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo,
          nickName = userInfo.nickName,
          avatarUrl = userInfo.avatarUrl,
          gender = userInfo.gender,
          province = userInfo.province,
          city = userInfo.city,
          country = userInfo.country;

        that.userData.userInfo = userInfo;
        userSet = '&wxName=' + nickName + '&wxAvatar=' + avatarUrl + '&sex=' + gender + '&province=' + province + '&city=' + city + '&appId='+app.userData.appId;
      }
    });
    // 登录
    wx.login({
      success: res => {
        console.log('rrbx===》' + res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that=this;
        if(res.code){
          // console.log('rrbx===》'+res.code);
         wx.request({
           
          //  url: _HUIBAOData.huibao_host_userinfo + '?jscode=' + res.code + userSet + '&appid=wx422264f5730da7cd' + '&secret=87aa2a2a8ffdaaa962a44b64babf2345',
           url: _HUIBAOData.huibao_host_userinfo + '?jscode=' + res.code + userSet,
           method:'POST',
           data:{},
           header: {
             'content-type': 'application/x-www-form-urlencode' // 默认值
           },
            success:function(res){
              console.log("rrbx===" + res.data.code);
              if(res.data.code==10000){
                that.userData.openId=res.data.response;
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }else{
                console.log(res);
              }
            },
              fail: function (res) {
              console.dir(res);
            }

          })
          
        }else{
          console.log('获取用户登录状态失败！'+res.errMsg)
        }
      
      
      }, fail: function (res) {
        console.log(res);
      }
    })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: '',
    utoken:''
  },
  userData:{
    'openId':'',
	'openId':'你自己的',
    'userInfo':{}
  }
})