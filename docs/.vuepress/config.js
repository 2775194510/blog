// .vuepress/config.js
module.exports = {
    base: "/xiaoze-blog/",
    theme: 'reco',
    title: '小泽认真奋进',
    markdown: {
      lineNumbers: true,
    },
    plugins: [
      // 页面滚动时自动激活侧边栏链接的插件
      [
        "@vuepress/active-header-links",
        {
          sidebarLinkSelector: ".sidebar-link",
          headerAnchorSelector: ".header-anchor",
        },
      ], 
    //  光标插件
      ['cursor-effects', {
          size: 2, // size of the particle, default: 2
          shape: 'circle', // ['star' | 'circle'], // shape of the particle, default: 'star'
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
  //    ["vuepress-plugin-nuggets-style-copy", {
  //     copyText: "复制代码",
  //     tip: {
  //         content: "复制成功"
  //     }
  //  }],
    [
      'copyright',
      {
        authorName: '小泽', // 选中的文字将无法被复制
        minLength: 30, // 如果长度超过  30 个字符
      },
    ],
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['z16','blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku']
      }
    ],
      // 只要把这个放进 config的plugins中就可以了 
      ["sakura", {
        num: 30,  // 默认数量
        show: true, //  是否显示
        zIndex: 999,   // 层级
        img: {
          replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        }     
      }],
  
    ],
  
    themeConfig: {
      type: 'blog',
      logo: '/logo.png',
      authorAvatar: '/titletop.jpg',
      subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容,
      sidebar: {
        '/blogs/后端/': [
          {
            title: '后端',
            collapsable: false,
            children: [
              {
                title: 'java',
                collapsable: false,
                children: [
                  'java/Java面向对象',
                  'java/Java反射',
                ]
              },
              {
                title: 'redis',
                collapsable: false,
                children: [
                  'redis/redis基本数据类型',
                ]
              },
              {
                title: 'spring',
                collapsable: false,
                children: [
                  'spring/spring',
                ]
              },
              {
                title: 'springboot',
                collapsable: false,
                children: [
                  'springboot/SpringBoot',
                ]
              },
            ]
          }
        ],
        '/blogs/其他/': [
          {
            title: '其他',
            collapsable: false,
            children: [
              {
                title: 'gitee',
                collapsable: false,
                children: [
                  'gitee',
                ]
              },
              {
                title: 'linux',
                collapsable: false,
                children: [
                  'linux',
                ]
              }
            ]
          }
        ],
        '/blogs/数据库/': [
          {
            title: '数据库',
            collapsable: false,
            children: [
              {
                title: 'mysql',
                collapsable: false,
                children: [
                  'mysql/mysql基本语法',
                ]
              },
              {
                title: 'oracle',
                collapsable: false,
                children: [
                  'oracle/oracle基本语法',
                ]
              }
            ]
          }
        ],
        '/blogs/前端/': [
          {
            title: '前端知识',
            collapsable: false,
            children: [
              {
                title: 'jQuery',
                collapsable: false,
                children: [
                  'jquery',
                  'jquery常用'
                ]
              },
              {
                title: 'vue2',
                collapsable: false,
                children: [
                  'vue2/vue2',
                ]
              },
              {
                title: 'vue3',
                collapsable: false,
                children: [
                  'vue3/vue3',
                ]
              },
              {
                title: 'ES6',
                collapsable: false,
                children: [
                  'ES6/ES6语法',
                ]
              },
            ]
          }
        ],
        '/blogs/算法/': [
          {
            title: '算法大全',
            collapsable: false,
            children: [
              {
                title: 'Java',
                collapsable: false,
                children: [
                  'Java/Java算法',
                ]
              },
              {
                title: 'MySQL',
                collapsable: false,
                children: [
                  'MySQL/MySQL算法',
                ]
              }
            ]
          }
        ],
        '/blogs/工具/': [
          {
            title: '常用工具大全',
            collapsable: false,
            children: [
              {
                title: 'css',
                collapsable: false,
                children: [
                  {
                    title: 'h5',
                    collapsable: false,
                    children: [
                      'css/h5/h5',
                    ]
                  },
                  {
                    title: 'vue',
                    collapsable: false,
                    children: [
                      'css/vue/vue杂货铺',
                      'css/vue/vue模板',
                      'css/vue/vue常用css',
                    ]
                  }
                ]
              },
            ]
          }
        ],
      },
  
     // 设置侧边栏位置
      sidebarDepth: 4,
      //导航
      nav: [
        { text: "首页", link: "/" },
        {
          text: '前端',
          items:[
              {text:'jQuery笔记', link: '/blogs/前端/jquery'}, 
              {text:'vue2', link: '/blogs/前端/vue2/vue2'},
              {text:'vue3', link: '/blogs/前端/vue3/vue3'},  
              {text:'ES6', link: '/blogs/前端/ES6/ES6语法'}, 
              {text:'其它链接', link: 'https://www.baidu.com/'}// 外部链接
          ]
      },
      {
        text: '后端',
        items:[
            {text:'Java', link: '/blogs/后端/java/Java面向对象'}, 
            {text:'Redis', link: '/blogs/后端/redis/redis基本数据类型'}, 
            {text:'Spring', link: '/blogs/后端/spring/spring'}, 
            {text:'SpringBoot', link: '/blogs/后端/springboot/SpringBoot'}, 
            {text:'其它链接', link: 'https://www.baidu.com/'}// 外部链接
        ]
    },
      {
        text: '数据库',
        items:[
            {text:'Mysql', link: '/blogs/数据库/mysql/mysql基本语法'}, 
            {text:'Oracle', link: '/blogs/数据库/oracle/oracle基本语法'}, 
            {text:'学习链接', link: 'https://www.runoob.com/mysql/mysql-tutorial.html'}// 外部链接
        ]
    },
    {
      text: '算法',
      items:[
          {text:'Java', link: '/blogs/算法/java/Java算法'}, 
          {text:'Mysql', link: '/blogs/算法/MySQL/MySQL算法'}, 
          {text:'刷题链接', link: 'https://leetcode.cn/problemset/all/'}, 
      ]
  },
    {
      text: '其他',
      items:[
          {text:'gitee', link: '/blogs/其他/gitee'}, 
          {text:'linux', link: '/blogs/其他/linux'}, 

      ]
     },
        { text: "好玩的东西", 
          items:[
            {
              text:'cmd',items:[
                {
                  text:'  打开本地电脑文件', 
                  link: '/blogs/好玩的东西/cmd命令/1：cmd打开本地电脑文件'
                },
            ]
          },
            {text: 'markdown语法',link: '/blogs/好玩的东西/markdown语法/markdown'}
          ] 
        },
        {
          text: '工具集合',
          items:[
              {text:'常用css', link: '/blogs/工具/css/h5/h5'},  
          ]
      },
        // { text: "guide", link: "/guide/" },
        { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
      ],
      // 博客配置ll
      blogConfig: {
        category: {
          location: 2, // 在导航栏菜单中所占的位置，默认2
          text: "必备知识", // 默认文案 “分类”
        },
        tag: {
          location: 9, // 在导航栏菜单中所占的位置，默认3
          text: "Tag", // 默认文案 “标签”
        },
        socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-mayun', link: 'https://gitee.com/hu-haoze/xiaoze-blog/pages' },
        { icon: 'reco-csdn', link: 'https://blog.csdn.net/weixin_51472505?spm=1000.2115.3001.5343' }
      ]
      }
    },
}  