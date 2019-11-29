Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 存放分类名字
    categoryName:[],
    // 存放分类详情
    categoryDetail:[],
    // 当前选中项
    currentIndex:0,
    // 右侧滚动条开始高度为0
    scrollTop:0
  },
  // data外部存放整个数据  data里面的数据越多页面越卡，所以先将数据存放在外面，需要的时候再取出放入data
CategoryList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    wx.request({
      url:"https://api.zbztb.cn/api/public/v1/categories",
      success:(result)=>{
        // console.log(result.data.message);
        this.CategoryList = result.data.message;
        this.setData({
          // 存放分类名字
          categoryName:this.CategoryList.map(v=>v.cat_name),
          // 右侧分类详情
          categoryDetail:this.CategoryList[this.data.currentIndex].children
        })     
      }
    })
  },
// 菜单点击事件
bindMenuTap(e){
  const currentIndex = e.currentTarget.dataset.index;
  this.setData({
    currentIndex,
     // 右侧分类详情
     categoryDetail:this.CategoryList[currentIndex].children,
    //  重新设置滚动条高度为0
     scrollTop:0
  }) 
}
})