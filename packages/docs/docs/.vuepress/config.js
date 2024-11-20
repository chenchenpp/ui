module.exports = {
  title: "rt组件库",
  description: "对于element二次封装",
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'RtUi组件库',
      description: '对于elementUI二次封装'
    }
  },
  plugins: [
    require('../plugins/vuepress-plugin-demo-container/index'),
  ],
  theme: false,
  themeConfig: {
    nav: [
      { text: 'gitlab', link: '/' },
    ],
    sidebarDepth: 2,
    sidebar: [
        ['/', '介绍'],
        ['/started', '快速上手'],
        ['/table', '表格']
    ]
  },
};
