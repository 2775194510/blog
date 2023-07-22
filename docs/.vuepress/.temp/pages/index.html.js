export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"subSidebar\":false,\"bgImage\":\"/aboutUs.jpg\",\"heroImage\":\"/logo.png\",\"heroText\":\"学习永无止境，人生永无上限！\",\"description\":\"Happy , EveryDay , 工作中学习，学习中生活!\",\"features\":[{\"title\":\"简洁至上\",\"details\":\"以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\"},{\"title\":\"Vue驱动\",\"details\":\"享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\"},{\"title\":\"高性能\",\"details\":\"VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present Evan You\",\"heroImageStyle\":{\"maxHeight\":\"300px\",\"display\":\"block\",\"margin\":\"6rem auto 1.5rem\",\"borderRadius\":\"50%\",\"boxShadow\":\"0 5px 18px rgba(0,0,0,0.2)\"}},\"headers\":[]}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
