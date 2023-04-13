// .vuepress/config.js

module.exports = {
    base: "./",
    theme: 'reco',
    title: '小泽博客正在开发',
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      //导航
      nav: [{ text: "首页", link: "/" }],
      // 博客配置
      blogConfig: {
        category: {
          location: 2, // 在导航栏菜单中所占的位置，默认2
          text: "博客", // 默认文案 “分类”
        },
        tag: {
          location: 3, // 在导航栏菜单中所占的位置，默认3
          text: "Tag", // 默认文案 “标签”
        },
      },
    },
}  