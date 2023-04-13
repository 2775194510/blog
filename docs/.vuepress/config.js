// .vuepress/config.js
module.exports = {
    base: "/xiaoze-blog/",
    theme: 'reco',
    title: '小泽认真奋进',
    markdown: {
      lineNumbers: true,
    },
    themeConfig: {
      type: 'blog',
      logo: '/logo.png',
      authorAvatar: '/logo.png',
      //导航
      nav: [{ text: "首页", link: "/" },{ text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }],
      // 博客配置
      blogConfig: {
        category: {
          location: 2, // 在导航栏菜单中所占的位置，默认2
          text: "菜单控制", // 默认文案 “分类”
        },
        tag: {
          location: 3, // 在导航栏菜单中所占的位置，默认3
          text: "Tag", // 默认文案 “标签”
        },
      },
    },
}  