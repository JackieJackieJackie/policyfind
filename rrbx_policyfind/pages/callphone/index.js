// pages/search/search.js
import _HUIBAOData from '../../utils/data.js';
//定义索引字母数组
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var y = 0;
//获取touchstart字母数组角标
function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}
//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}
Page({
  data: {
    rightShow: false,
    dropShow: false,
    indexShow: false,
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    arrId: indexArr,
    userInfo: ["我是0", "我是1", "我是2", "我是3"],
    companyInfo:'',
    AIconlist: [],
    BIconlist: [],
    CIconlist: [],
    DIconlist: [],
    EIconlist: [],
    FIconlist: [],
    GIconlist: [],
    HIconlist: [],
    IIconlist: [],
    JIconlist: [],
    KIconlist: [],
    LIconlist: [],
    MIconlist: [],
    NIconlist: [],
    OIconlist: [],
    PIconlist: [],
    QIconlist: [],
    RIconlist: [],
    SIconlist: [],
    TIconlist: [], 
    UIconlist: [],
    VIconlist: [],
    WIconlist: [],
    XIconlist: [],
    YIconlist: [],
    ZIconlist: []
  },
  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },
  touchmove: function (e) {
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)) {
      this.setData({
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y).toLowerCase(),
        indexEnglish: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)
      })
    }
  },
  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          indexTop: res.windowHeight / 2 - 200
        });
      }
    })


    //获取电话信息
    wx.request({
      url: _HUIBAOData.huibao_host_calling,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        console.log("rrbx===" + res.data.code);

        if (res.data.code == 10000) {
          
          var mList = res.data.response;

          that.setData({
            companyInfo:mList
          })

          for (let i = 0; i < mList.length; i++) {
            if (mList[i].firstChar=="A"){
              that.data.AIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "B") {
              that.data.BIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "C") {
              that.data.CIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "D") {
              that.data.DIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "E") {
              that.data.EIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "F") {
              that.data.FIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "G") {
              that.data.GIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "H") {
              that.data.HIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "I") {
              that.data.IIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "J") {
              that.data.JIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "K") {
              that.data.KIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "L") {
              that.data.LIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "M") {
              that.data.MIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "N") {
              that.data.NIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "O") {
              that.data.OIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "P") {
              that.data.PIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "Q") {
              that.data.QIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "R") {
              that.data.RIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "S") {
              that.data.SIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "T") {
              that.data.TIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "U") {
              that.data.UIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "V") {
              that.data.VIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "W") {
              that.data.WIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "X") {
              that.data.XIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "Y") {
              that.data.YIconlist.push(mList[i].companyIcon);
            }
            if (mList[i].firstChar == "Z") {
              that.data.ZIconlist.push(mList[i].companyIcon);
            }

          }
          that.setData({
            AIconlist: that.data.AIconlist,
            BIconlist: that.data.BIconlist,
            CIconlist: that.data.CIconlist,
            DIconlist: that.data.DIconlist,
            EIconlist: that.data.EIconlist,
            FIconlist: that.data.FIconlist,
            GIconlist: that.data.GIconlist,
            HIconlist: that.data.HIconlist,
            IIconlist: that.data.IIconlist,
            JIconlist: that.data.JIconlist,
            KIconlist: that.data.KIconlist,
            LIconlist: that.data.LIconlist,
            MIconlist: that.data.MIconlist,
            NIconlist: that.data.NIconlist,

            OIconlist: that.data.OIconlist,
            PIconlist: that.data.PIconlist,
            QIconlist: that.data.QIconlist,
            RIconlist: that.data.RIconlist,
            SIconlist: that.data.SIconlist,

            TIconlist: that.data.TIconlist,
            UIconlist: that.data.UIconlist,

            VIconlist: that.data.VIconlist,
            WIconlist: that.data.WIconlist,
            XIconlist: that.data.XIconlist,
            YIconlist: that.data.YIconlist,
            ZIconlist: that.data.ZIconlist,
          })
         


          console.log("---------rrbxLAG" + that.data.BIconlist);
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
  //点击事件
  showRequire: function (e) {
    // console.log(e.d)
  },
  //item事件监听
  detail: function (res) {
    var that=this;
    var pid = res.currentTarget.dataset.pid;
    console.log("---------rrbxLAG" + pid);
    var mList = that.data.companyInfo;
    for (let i = 0; i < mList.length; i++) {
      if (mList[i].companyIcon==pid){
        console.log("---------rrbxLAG" + mList[i].serviceTel);
        that.calling(mList[i].serviceTel);
      }
    }
    
  },
  //打电话事件
  calling: function (phoneNumber) {
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function () { console.log("拨打电话成功！") },
      fail: function () { console.log("拨打电话失败！") }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})