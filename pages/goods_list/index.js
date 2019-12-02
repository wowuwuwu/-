// 引入request
import request from "../../request/request";
Page({
  // 全局的接口参数
  Params:{
    query:"",
    cid:"",
    pagenum:1,//页码
    pagesize:5//页容量
  },
  data: {
    goods: []
  },
  onLoad(options) {
    console.log(options);
    this.Params.cid = options.cid;
    request({
        url: "goods/search",
        data:this.Params,
      })
      .then(res => {
        console.log(res);
        this.setData({
          goods:res.data.message.goods
        })
      })
  }
})