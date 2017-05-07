//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo : null,
    s3_lv20 : 0,
    s3_lv25 : 0,
    s4_lv25 : 0,
    s4_lv30 : 0,
    s5_lv30 : 0
  },
  //获取输入内容
  getInput_s3_lv20:function(e){
    this.setData({
      s3_lv20 : Number(e.detail.value)
    })
  },
  getInput_s3_lv25:function(e){
    this.setData({
      s3_lv25 : Number(e.detail.value)
    })
  },
  getInput_s4_lv25:function(e){
    this.setData({
      s4_lv25 : Number(e.detail.value)
    })
  },
  getInput_s4_lv30:function(e){
    this.setData({
      s4_lv30 : Number(e.detail.value)
    })
  },
  getInput_s5_lv30:function(e){
    this.setData({
      s5_lv30 : Number(e.detail.value)
    })
  },
  //事件处理函数
  bindViewTap: function() {
    var progress = {
      s3_lv20 : this.data.s3_lv20,
      s3_lv25 : this.data.s3_lv25,
      s4_lv25 : this.data.s4_lv25,
      s4_lv30 : this.data.s4_lv30,
      s5_lv30 : this.data.s5_lv30
    };
    wx.setStorageSync('progress', progress)
    wx.navigateTo({
      url: '../result/result'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
