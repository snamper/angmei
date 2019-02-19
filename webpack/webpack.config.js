let path=require('path');
let HtmlWebpackPlugin=require('html-webpack-plugin')//html插件  yarn add webpack-dev-server -d
module.exports={
    mode:'production',//开发 development 生产 production
    entry:'./src/index.js',//入口
    output:{
        filename:'bundle.[hash:8].js',//出口文件名  /bundle.[hash:8].js 每次生成8位随机得数
        path:path.resolve(__dirname,'dist')//路径
    },
    devServer:{//开发服务器得配置
        port:3000,//端口号
        progress:true,//进度
        contentBase:'./dist',//找到dist目录启动服务
        open:true,//自动打开
        compress:true
    },
    plugins:[//数组放着所有webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true, //删除属性双引号
                collapseWhitespace:true,//html压缩成一行
            },
            hash:true, //引入的文件加上随机数后缀 缓存问题
        })
    ]
};