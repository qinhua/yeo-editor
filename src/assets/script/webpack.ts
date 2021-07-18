/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: BabyChin
 * @Date: 2021-06-10 23:14:16
 * @LastEditTime: 2021-06-11 12:21:16
 * @Description:
 */
const {
  override,
  overrideDevServer,
  fixBabelImports,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

function resolve(dir: string) {
  return path.join(__dirname, ".", dir);
}

const addCustomize = () => (config: any) => {
  if (process.env.NODE_ENV === "production") {
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置
    config.output.path = resolve("dist");
    config.output.publicPath = "./";
    // 添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024,
      })
    );
  }
  return config;
};
const devServerConfig = () => (config: any) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "xxx",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  };
};

const adjustStyleLoaders = (rule?: any) => {
  if (rule.test.toString().includes("scss")) {
    rule.use.push({
      loader: require.resolve("sass-resources-loader"),
      options: {
        resources: "./src/assets/style/variable.scss", //这里是你自己放公共scss变量的路径
      },
    });
  }
};
module.exports = {
  webpack: override(
    // 配置antd 的按需引入
    fixBabelImports("import", {
      libraryName: "antd-mobile",
      style: "css",
    }),
    // 配置路径访问快捷键 @/xxx
    addWebpackAlias({
      "@": resolve("src"),
    }),
    // postCss 自动将px转为rem 需要配合 lib-flexible 使用
    // addPostcssPlugins([
    //   require("postcss-pxtorem")({
    //     rootValue: 75,
    //     propList: ["*"],
    //     minPixelValue: 2,
    //     selectorBlackList: ["am-"],
    //   }),
    // ]),
    // 配置css
    adjustStyleLoaders(),
    // 压缩js等
    addCustomize()
  ),
  // 本地启动配置，可以设置代理
  devServer: overrideDevServer(devServerConfig()),
};
export {};
