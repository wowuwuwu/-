// 引入统一发送异步请求的函数
import request from "../../request/request"
Page({
    data: {
        // 存放轮播图数据
        swiperList:[],
        // 导航列表
        navsList:[],
        // 楼层数据
        floorList:[]
    },
    onLoad(){  
         // 发送异步请求 请求轮播图数据
        // .then就是获取数据成功后发送的请求 有封装函数中的resolve才有.then
        request({url:"home/swiperdata"})
        .then(result=>{
            this.setData({
                swiperList:result.data.message
            })
        })
        request({url:"home/catitems"})
        .then(result=>{
            this.setData({
                navsList:result.data.message
            })
        })
        request({url:"home/floordata"})
        .then(result=>{
            this.setData({
                floorList:result.data.message
            })
        })
    }
});
  