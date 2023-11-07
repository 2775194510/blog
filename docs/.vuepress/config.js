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
    // ['vuepress-plugin-nuggets-style-copy', {
    //   copyText: "复制代码",
    //   tip: {
    //     content: "复制成功"
    //   }
    // }],
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
        theme: ['z16', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku']
      }
    ],
    // 只要把这个放进 config的plugins中就可以了 
    ["sakura", {
      num: 15,  // 默认数量
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
                'java/Java-Stream大全',
                'java/Java位运算符详解',

              ]
            },
            {
              title: 'Juc',
              collapsable: false,
              children: [
                'juc/1：线程基础',
                'juc/2：CompletableFuture',
                'juc/2：CompletableFuture个人代码',
                'juc/3：Java锁',
                'juc/4：LockSupport与线程中断',
                'juc/5：Java内存模型之JMM',
                'juc/6：volatile与Java内存模型',
                'juc/7：CAS',
                'juc/8：原子操作类之18罗汉增强',
                'juc/9：聊聊ThreadLocal',

              ]
            },
            {

              title: 'mybatis',
              collapsable: false,
              children: [
                'mybatis/1：mybatis入门教程',
                'mybatis/2：mybatis常用sql大全',
              ]
            },
            {

              title: 'redis',
              collapsable: false,
              children: [
                'redis/redis基本数据类型',
                'redis/缓存击穿，穿透解决',
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
                'springboot/1：SpringBoot拦截器',
              ]
            },
            {
              title: 'springcloud',
              collapsable: false,
              children: [
                'springcloud/1：springcloud入门',
                'springcloud/2：eureka服务注册',
                'springcloud/3：ribbon负载均衡',
                'springcloud/4：Nacos注册中心',
                'springcloud/5：Nacos配置管理',
                'springcloud/6：Feign远程调用',
                'springcloud/7：Gateway服务网关',
              ]
            },
            {
              title: '消息中间件',
              collapsable: false,
              children: [
                {
                  title: 'rabbitmq',
                  collapsable: false,
                  children: [
                    'rabbitmq/1：RabbitMq',
                  ]
                },
                {
                  title: 'rocketmq',
                  collapsable: false,
                  children: [
                    'rocketmq/1：RocketMq',
                    'rocketmq/2：RocketMq简单集成文档',

                  ]
                },
              ]
            },
          ]
        }
      ],
      '/blogs/运维/': [
        {
          title: '运维篇',
          collapsable: false,
          children: [
            {
              title: 'docker',
              collapsable: false,
              children: [
                'docker/1：docker安装部署',
                'docker/2：docker命令',
                'docker/3：docker安装三方指南',
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
                'linux特殊命令',
              ]
            },
            {
              title: 'nginx',
              collapsable: false,
              children: [
                'Nginx',
              ]
            },
            {
              title: 'lua',
              collapsable: false,
              children: [
                'lua脚本',
                'redis操作lua脚本'
              ]
            },
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

      '/blogs/好玩的东西/': [
        {
          title: '各种杂货铺',
          collapsable: false,
          children: [
            {
              title: '电脑',
              collapsable: false,
              children: [
                'cmd命令/1：cmd打开本地电脑文件',
                'cmd命令/2：杂货铺',
              ]
            },
            {
              title: 'markdown',
              collapsable: false,
              children: [
                'markdown语法/markdown',
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
            {
              title: 'spring',
              collapsable: false,
              children: [
                {
                  title: 'springboot',
                  collapsable: false,
                  children: [
                    {
                      title: '开发必备',
                      collapsable: false,
                      children: [
                        'spring/springboot/开发必备/1：maven包大全',
                        'spring/springboot/开发必备/2：application.yml',
                        'spring/springboot/开发必备/3：SpringBoot统一解决跨域处理',
                        'spring/springboot/开发必备/4：SpringBoot统一解决异常处理',
                        'spring/springboot/开发必备/5：公共类',
                        'spring/springboot/开发必备/6：SpringBoot读取yml文件',

                      ]
                    },
                    {
                      title: '业务需求',
                      collapsable: false,
                      children: [
                        'spring/springboot/业务需求/1：开发小工具',
                        'spring/springboot/业务需求/2：常用sql大全',
                        'spring/springboot/业务需求/3：SpringBoot启动时加载数据库数据到redis',
                        'spring/springboot/业务需求/4：SpringBoot启动时加载数据库数据到项目中',
                        'spring/springboot/业务需求/5：Springboot集成Jaxb加载数据到xml',
                        'spring/springboot/业务需求/6：接受、发送xml报文',
                        'spring/springboot/业务需求/7：结合mapStruct实现JavaBean转换',
                        'spring/springboot/业务需求/8：调用三方接口示例实现',
                        'spring/springboot/业务需求/9：数据脱敏',

                      ]
                    },
                    {
                      title: '自定义注解',
                      collapsable: false,
                      children: [
                        'spring/springboot/自定义注解/1：自定义校验字段注解',
                        'spring/springboot/自定义注解/2：统计方法执行时间注解',
                        'spring/springboot/自定义注解/3：设置接口访问频率',
                        'spring/springboot/自定义注解/4：SpringBoot+Vue实现数据加密',

                      ]
                    },
                    {
                      title: '整合三方',
                      collapsable: false,
                      children: [
                        'spring/springboot/整合三方/1：springboot整合easyExcel',
                        'spring/springboot/整合三方/2：springboot整合word',
                        'spring/springboot/整合三方/3：springboot基于模板word导出',
                        'spring/springboot/整合三方/4：springboot整合pdf',
                        'spring/springboot/整合三方/5：springboot整合QQ邮箱',
                        'spring/springboot/整合三方/6：springboot整合jasypt实现yml配置文件密码加密',
                        'spring/springboot/整合三方/7：springboot实现微信登录',

                      ]
                    },
                  ]
                },
              ]
            },
          ]
        }
      ],
      '/blogs/面试/': [
        {
          title: '面试大全',
          collapsable: false,
          children: [
            {
              title: '计算机网络',
              collapsable: false,
              children: [
                '计算机网络上',
                '计算机网络下'
              ]
            },
            {
              title: '操作系统',
              collapsable: false,
              children: [
                '操作系统',
              ]
            },
            {
              title: 'JVM',
              collapsable: false,
              children: [
                'jvm笔记',
                'jvm细节'
              ]
            },
            {
              title: 'Java',
              collapsable: false,
              children: [
                {
                  title: 'Java基础',
                  collapsable: false,
                  children: [
                    'Java基础上',
                    'Java基础下'
                  ]
                },
                {
                  title: 'Java集合',
                  collapsable: false,
                  children: [
                    'HashMap',
                    'HashMap的线程安全问题',
                    'ConcurrentHashMap',
                    'Java集合高频面试题'
                  ]
                },
                {
                  title: 'Java并发',
                  collapsable: false,
                  children: [
                    'AQS',
                    'Java多线程面试-基础',
                    'Java多线程总结版',
                    '进程通信和线程通信的方式',
                    '如何设计线程池',
                    'juc'
                  ]
                }
              ]
            },
            {
              title: 'Linux',
              collapsable: false,
              children: [
                'Linux',
                'shell'
              ]
            },
            {
              title: 'Spring',
              collapsable: false,
              children: [
                'Spring',
              ]
            },
            {
              title: 'SpringSecurity',
              collapsable: false,
              children: [
                'SpringSecurity',
              ]
            },
            {
              title: 'Mybatis',
              collapsable: false,
              children: [
                'Mybatis',
              ]
            },
            {
              title: 'Mysql',
              collapsable: false,
              children: [
                'MySQL',
                'MySQL基础',
                'MySQL索引连环18问！',
              ]
            },
            {
              title: 'Redis',
              collapsable: false,
              children: [
                'Redis',
              ]
            },
            {
              title: 'Dubbo',
              collapsable: false,
              children: [
                'Dubbo面试题',
              ]
            },
            {
              title: 'MQ',
              collapsable: false,
              children: [
                'MQ面试题',
                'Kafka面试题'
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
        items: [
          { text: 'jQuery笔记', link: '/blogs/前端/jquery' },
          { text: 'vue2', link: '/blogs/前端/vue2/vue2' },
          { text: 'vue3', link: '/blogs/前端/vue3/vue3' },
          { text: 'ES6', link: '/blogs/前端/ES6/ES6语法' },
          { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'Java', link: '/blogs/后端/java/Java面向对象' },
          { text: 'Juc', link: '/blogs/后端/juc/1：线程基础' },
          { text: 'Mybatis', link: '/blogs/后端/mybatis/1：mybatis入门教程' },
          { text: 'Redis', link: '/blogs/后端/redis/redis基本数据类型' },
          { text: 'Spring', link: '/blogs/后端/spring/spring' },
          { text: 'SpringBoot', link: '/blogs/后端/springboot/1：SpringBoot拦截器' },
          { text: 'SpringCloud', link: '/blogs/后端/springcloud/1：springcloud入门' },
          { text: '消息中间件', link: '/blogs/后端/rabbitmq/1：RabbitMq' },
          { text: '其它链接', link: 'https://www.baidu.com/' }// 外部链接
        ]
      },
      {
        text: '运维',
        items: [
          { text: 'docker', link: '/blogs/运维/docker/1：docker安装部署' },
        ]
      },
      {
        text: '数据库',
        items: [
          { text: 'Mysql', link: '/blogs/数据库/mysql/mysql基本语法' },
          { text: 'Oracle', link: '/blogs/数据库/oracle/oracle基本语法' },
          { text: '学习链接', link: 'https://www.runoob.com/mysql/mysql-tutorial.html' }// 外部链接
        ]
      },
      {
        text: '算法',
        items: [
          { text: 'Java', link: '/blogs/算法/java/Java算法' },
          { text: 'Mysql', link: '/blogs/算法/MySQL/MySQL算法' },
          { text: '刷题链接', link: 'https://leetcode.cn/problemset/all/' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'gitee', link: '/blogs/其他/gitee' },
          { text: 'linux', link: '/blogs/其他/linux' },
          { text: 'nginx', link: '/blogs/其他/Nginx' },
          { text: 'lua', link: '/blogs/其他/lua脚本' },


        ]
      },
      {
        text: "好玩的东西",
        items: [
          { text: '电脑杂货铺', link: '/blogs/好玩的东西/cmd命令/1：cmd打开本地电脑文件' },
          { text: 'markdown语法', link: '/blogs/好玩的东西/markdown语法/markdown' }
        ]
      },
      {
        text: '工具集合',
        items: [
          { text: '常用css', link: '/blogs/工具/css/h5/h5' },
          { text: 'spring工具', link: '/blogs/工具/spring/springboot/自定义注解/1：自定义校验字段注解' },
          { text: '面试大全', link: '/blogs/面试/Java基础上' },
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