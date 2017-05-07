//result.js
Page({
  data: {
    progress : {
        s3_lv20 : 0,
        s3_lv25 : 0,
        s4_lv25 : 0,
        s4_lv30 : 0,
        s5_lv30 : 0
    },
    shikigami_remain : {
        s3_lv20 : 100,
        s4_lv25 : 25,
        s5_lv30 : 5
    },
    money_remain : "300万",
    progress_percent : 0
  },
  onLoad: function () {
    var progress = wx.getStorageSync("progress");
    wx.clearStorageSync("progress");
    var shikigami_remain = getRemainingShikigami(progress)
    console.log(shikigami_remain);
    var money_remain = getRemainingMoney(shikigami_remain);
    console.log(money_remain);
    var progress_percent = getProgressBarPercent(progress,shikigami_remain);
    console.log(progress_percent);
    this.setData({
      progress: progress,
      shikigami_remain : shikigami_remain,
      money_remain : money_remain,
      progress_percent : progress_percent
    });
  }
})
//计算剩余狗粮
function getRemainingShikigami(progress){
    var shikigami_remain = {
        s3_lv20 : 100,
        s4_lv25 : 25,
        s5_lv30 : 5
    };
    if(progress.s5_lv30 >= 5){
        shikigami_remain = {
            s3_lv20 : 0,
            s4_lv25 : 0,
            s5_lv30 : 0
        };
    }
    else{
        shikigami_remain.s5_lv30 = 5 - progress.s5_lv30;
        shikigami_remain.s4_lv25 = 25 - 5 * progress.s5_lv30 - progress.s4_lv25 - progress.s4_lv30;
        if(shikigami_remain.s4_lv25 <= 0){
            shikigami_remain.s4_lv25 = 0;
            shikigami_remain.s3_lv20 = 0;
        }
        else{
            shikigami_remain.s3_lv20 = 4 * shikigami_remain.s4_lv25 - progress.s3_lv25 - progress.s3_lv20;
            if(shikigami_remain.s3_lv20 < 0){
                shikigami_remain.s3_lv20 = 0;
            }
        }
    }
    return shikigami_remain;
}
//计算剩余金币
function getRemainingMoney(shikigami_remain){
    var money_remain = 5 + 4 * shikigami_remain.s5_lv30 + 3 * shikigami_remain.s4_lv25 + 2 * shikigami_remain.s3_lv20;
    money_remain += "万";
    return money_remain;
}
//计算进度条
function getProgressBarPercent(progress,shikigami_remain){
    var progress_percent = 0;
    //5星进度
    progress_percent += 20 * (5 - shikigami_remain.s5_lv30);
    if(progress_percent >= 100){
        return 100;
    }
    //4星进度
    var s4_lv30_remain = shikigami_remain.s5_lv30;
    var s4_lv25_remain = 4 * s4_lv30_remain;
    if(progress.s4_lv30 <= s4_lv30_remain){
        progress_percent += 5.25 * progress.s4_lv30;
        if(progress.s4_lv25 <= s4_lv25_remain){
            progress_percent += 3.69 * progress.s4_lv25;
        }
        else{
            var sub = (progress.s4_lv25 - s4_lv25_remain) <= (s4_lv30_remain - progress.s4_lv30) ? 
                (progress.s4_lv25 - s4_lv25_remain) : (s4_lv30_remain - progress.s4_lv30);
            progress_percent += 3.69 * (sub + s4_lv25_remain);
        }
    }
    else{
        progress_percent += 5.25 * s4_lv30_remain;
        if(progress.s4_lv25 >= s4_lv25_remain){
            progress_percent += 3.69 * s4_lv25_remain;
        }
        else{
            var sub = (s4_lv25_remain - progress.s4_lv25) <= (progress.s4_lv30 - s4_lv30_remain) ? 
                (s4_lv25_remain - progress.s4_lv25) : (progress.s4_lv30 - s4_lv30_remain);
            progress_percent += 3.69 * (sub + progress.s4_lv25);
        }
    }
    if(progress_percent >= 100){
        return 100;
    }
    //3星进度
    var s3_lv25_remain = shikigami_remain.s4_lv25;
    var s3_lv20_remain = 3 * s3_lv25_remain;
    if(progress.s3_lv25 <= s3_lv25_remain){
        progress_percent += 1.59 * progress.s3_lv25;
        if(progress.s3_lv20 <= s3_lv20_remain){
            progress_percent += 0.7 * progress.s3_lv20;
        }
        else{
            var sub = (progress.s3_lv20 - s3_lv20_remain) <= (s3_lv25_remain - progress.s3_lv25) ? 
                (progress.s3_lv20 - s3_lv20_remain) : (s3_lv25_remain - progress.s3_lv25);
            progress_percent += 0.7 * (sub + s3_lv20_remain);
        }
    }
    else{
        progress_percent += 1.59 * s3_lv25_remain;
        if(progress.s3_lv20 >= s3_lv20_remain){
            progress_percent += 0.7 * s3_lv20_remain;
        }
        else{
            var sub = (s3_lv20_remain - progress.s3_lv20) <= (progress.s3_lv25 - s3_lv25_remain) ? 
                (s3_lv20_remain - progress.s3_lv20) : (progress.s3_lv25 - s3_lv25_remain);
            progress_percent += 0.7 * (sub + progress.s3_lv20);
        }
    }
    if(progress_percent > 100){
        return 100;
    }
    return progress_percent;
}