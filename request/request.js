// 封装发送请求，带参不带参都可以
function axios({ url, ...params}) {
    return new Promise((resolve, reject) => {
        // 我们发现所有的url前面路径相同，所以都存到一个里面
        const baseURL = "https://api.zbztb.cn/api/public/v1/";
        wx.request({
            url: baseURL + url,
            // 由于参数可能不同  所以我们将传过来的参数都放入params
            ...params,
            // data: {},
            // header: {'content-type':'application/json'},
            // method: 'GET',
            // dataType: 'json',
            // responseType: 'text',
            success: (result) => {
                //  成功就 执行resolve
                resolve(result);
            }
        });
    })
}
// 暴露出去
export default axios;