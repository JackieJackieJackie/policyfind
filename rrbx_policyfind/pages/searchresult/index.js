//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js');
import _HUIBAOData from '../../utils/data.js';
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    companyname:'',
    campanyList:'',
    companynamelist:[],
    companyoptions:'',
    inputvalue:'',//输入框的值

    companyId: '',
    isaplimg: false,//控制二维码的开关
    // wxSearchData:{
    //   view:{
    //     isShow: true
    //   }
    // }
  },
  onLoad: function (options) {
    
    
    var value = wx.getStorageSync('wxSearchHisKeys');

    var that = this;


    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,"搜索结果", 43, that.data.companynamelist);//初始化数据列表
    WxSearch.initMindKeys(value);//联想关键字搜索
    WxSearch.wxSearchFocus(options, that);

    
    //没有历史记录，显示热门搜索，有的话显示是 搜索结果
    if(value.length==0){
        that.wxSearchResult(options);//热门搜索结果
    }
    

   
  },
  //搜索结果
  wxSearchResult: function (options){
    var that=this;

    //获取搜索结果数据
    wx.request({
      url: _HUIBAOData.huibao_host_hotsearch ,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
       

        if (res.data.code == 10000) {
         
          that.setData({
            campanyList: res.data.response,
            companynamelist:[]
          })
          for (let i = 0; i < res.data.response.length; i++) {
            that.data.companynamelist.push(res.data.response[i].companyName);
          }
          var value = wx.getStorageSync('wxSearchHisKeys');
          //初始化的时候渲染wxSearchdata
          WxSearch.init(that,"热门搜索", 43, that.data.companynamelist);
          WxSearch.initMindKeys(value);
          WxSearch.wxSearchFocus(options, that);
        
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况

          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.dir(res);
      }

    })
  },
  //button点击搜索
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);//加入搜索历史
    if (that.data.inputvalue==''){
      wx.showToast({
        title: '请输入公司名称',
      })
      return;
    }

    //获取搜索结果数据
    wx.request({
      url: _HUIBAOData.huibao_host_searchResulst + '?key=' + that.data.inputvalue,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
      
        if (res.data.code == 10000) {
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          that.setData({
            campanyList: res.data.response,
            companynamelist:[]
          })
          for (let i = 0; i < res.data.response.length; i++) {

            that.data.companynamelist.push(res.data.response[i].companyName);
          }
          var value = wx.getStorageSync('wxSearchHisKeys');
          //初始化的时候渲染wxSearchdata
          WxSearch.init(that,"搜索结果", 43, that.data.companynamelist);
          WxSearch.initMindKeys(value);

          // WxSearch.wxSearchFocus(that.data.companyoptions, that);
          // WxSearch.wxSearchInput(that.data.companyoptions, that);


          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.dir(res);
      }

    })
  },
  
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
    that.setData({
      inputvalue:e.detail.value
    })
    // console.log("rrbx===S" + e.detail.value);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
    //给输入框传递默认的值
    that.setData({
      inputvalue: e.target.dataset.key
    })
    
    var companyname = e.target.dataset.key;
    // console.log("rrbx===" + companyname);
    //热门搜索跳转
    // wx.navigateTo({
    //   url: '../searchresult/index?companyname=' + companyname,
    // })
    var campanyList = that.data.campanyList;
    for (let i = 0; i < campanyList.length; i++) {
      console.log("rrbx===" + campanyList[i].companyName);
      if (companyname == campanyList[i].companyName) {
        console.log("rrbx===" + campanyList[i].companyId);
        that.setData({
          companyId: campanyList[i].companyId,
          isaplimg: true,
          companyname: companyname
        })
      }
    }

    //获取热门搜索数据
    wx.request({
      url: _HUIBAOData.huibao_host_searchResultDetail + '?companyId=' + that.data.companyId,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        if (res.data.code == 10000) {

          if (res.data.response == null) {
            var insertData = '<div style="text-align:left;padding:10px;width:90%; font-size:15px"></div>';
            WxParse.wxParse('insertData', 'html', insertData, that);
            return;
          }
      

          var insertData = '<div style="text-align:left;padding:10px;width:90%; font-size:15px">' + res.data.response.content + '</div>';
          WxParse.wxParse('insertData', 'html', insertData, that);

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况

          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.dir(res);
      }
    })
  },
  //关闭二维码弹框
  closeEject: function () {
    this.setData({
      isaplimg: false,

      eject_title: '',
    })
  },
  //点击获取 herf 网址
  wxParseTagATap: function (e) {
    var href = e.currentTarget.dataset.src;

    wx.setClipboardData({
      data: href,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: '已成功复制网址',
            })
          }
        })
      }
    })

  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  }
})
