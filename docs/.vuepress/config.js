// .vuepress/config.js
module.exports = {
    base: "/xiaoze-blog/",
    theme: 'reco',
    title: '小泽认真奋进',
    markdown: {
      lineNumbers: true,
    },
    plugins: [
      // 页面滑动自动跳转到对应的二级标题
      [
        "@vuepress/active-header-links",
        {
          sidebarLinkSelector: ".sidebar-link",
          headerAnchorSelector: ".header-anchor",
        },
      ], 
      // 歌曲
      [
        "@vuepress-reco/vuepress-plugin-bgm-player",
        {
          audios: [
            //本地歌曲
            {
              //名字
              name: "温柔只给意中人",
              //作者
              artist: "MC梦柯",
              //地址
              url: "https://www.ytmp3.cn/down/52951.mp3",
              //封面图片
              cover: "https://p1.music.126.net/qTSIZ27qiFvRoKj-P30BiA==/109951165895951287.jpg?param=200y200",
            }
          ],
          // 是否默认缩小
          autoShrink: true,
          // 缩小时缩为哪种模式
          shrinkMode: "float",
          // 悬浮窗样式
          floatStyle: { bottom: "30px", "z-index": "999999" },
        },
      ],
    //  光标插件
      ['cursor-effects', {
          size: 2, // size of the particle, default: 2
          shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
          zIndex: 999999999, // z-index property of the canvas, default: 999999999
       }
     ],
    //  动态标题
    ['dynamic-title', {
      showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
      showText: '客官欢迎回来~',
      hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
      hideText: '客官不要走嘛~',
      recoverTime: 2000,
     }],
    [
      'copyright',
      {
        authorName: 'onion', // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
      },
    ],
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['z16','blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku']
      }
    ],
  
    //    [
    //   'vuepress-plugin-nuggets-style-copy',
    //   {
    //     // copyText: "复制代码",
    //     // tip: {
    //     //   content: "复制成功",
    //     // },
    //   },
    // ],
  
    ],
  
    themeConfig: {
      type: 'blog',
      logo: '/logo.png',
      authorAvatar: '/logo.png',
      subSidebar: 'auto',
      //导航
      nav: [
        { text: "首页", link: "/" },
        // { text: "guide", link: "/guide/" },
        { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
      ],
      // 博客配置
      blogConfig: {
        category: {
          location: 2, // 在导航栏菜单中所占的位置，默认2
          text: "必备知识", // 默认文案 “分类”
        },
        tag: {
          location: 3, // 在导航栏菜单中所占的位置，默认3
          text: "Tag", // 默认文案 “标签”
        },
        socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
      ]
      }
    },
}  