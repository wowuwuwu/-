Page({
    data: {
        // 存放轮播图数据
        swiperList:[],
        // 导航列表
        navsList:[]
    },
    onLoad(){  
        // 发送异步请求 请求轮播图数据
        wx.request({
            url:"https://api.zbztb.cn/api/public/v1/home/swiperdata",
            success:(result)=>{
                // console.log(result);
                this.setData({
                    swiperList: result.data.message
                })
            }
        }),
        wx.request({
            url:"https://api.zbztb.cn/api/public/v1/home/catitems",
            success:(result)=>{
                console.log(result);
                this.setData({
                    navsList:result.data.message
                })
            }
        })
    }
});
  