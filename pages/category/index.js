import request from "../../request/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 存放分类名字
    categoryName: [],
    // 存放分类详情
    categoryDetail: [],
    // 当前选中项
    currentIndex: 0,
    // 右侧滚动条开始高度为0
    scrollTop: 0
  },
  // data外部存放整个数据  data里面的数据越多页面越卡，所以先将数据存放在外面，需要的时候再取出放入data
  CategoryList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 先看本地存储有没有旧数据
    // 1.没有 直接发送请求获取新数据 再存储到本地
    // 2.有旧数据 判断有没有过期 
    // 2.1过期重新发送请求获取新数据 再存储到本地
    // 2.2没过期直接那本地存储的旧数据
    const categoryList = wx.getStorageSync('categoryList');
    if (!categoryList) {
      // 直接发送请求获取新数据
      console.log("没有本地存储");
      this.getCategoryList();
    } else {
      // 我们假设时间超过10秒就过期 重新发送请求
      if (Date.now() - categoryList.time > 10 * 1000) {
        console.log("过期，重新请求");
        this.getCategoryList();
      } else {
        // 没有过期
        console.log("没有过期，旧数据");
        this.CategoryList = categoryList.list;
        // 设置data
        this.setData({
          // 存放分类名字
          categoryName: this.CategoryList.map(v => v.cat_name),
          // 右侧分类详情
          categoryDetail: this.CategoryList[this.data.currentIndex].children
        })
      }
    }
  },
  // 获取分类数据
  getCategoryList() {
    request({url: "categories"})
    .then(result => {
      console.log(result);
      this.CategoryList = result.data.message;
      this.setData({
        // 存放分类名字
        categoryName: this.CategoryList.map(v => v.cat_name),
        // 右侧分类详情
        categoryDetail: this.CategoryList[this.data.currentIndex].children
      })
      // 将数据存到本地带上时间
      wx.setStorageSync('categoryList', {
        list: this.CategoryList,
        time: Date.now()
      });
    })
  },
  // 菜单点击事件
  bindMenuTap(e) {
    const currentIndex = e.currentTarget.dataset.index;
    this.setData({
      currentIndex,
      // 右侧分类详情
      categoryDetail: this.CategoryList[currentIndex].children,
      //  重新设置滚动条高度为0
      scrollTop: 0
    })
  }
})