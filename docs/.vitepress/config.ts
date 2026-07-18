import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: 'by浅仓朔弥',
    themeConfig: {
        sidebar: [
            {
                text: '平台',
                items: [
                    {
                        text: '快手',
                        link: '/平台/快手',
                    },
                ]
            },
            {
                text: '操作员',
                items: [
                    {
                        text: '界面',
                        link: '/操作员/界面',
                    },
                    {
                        text: '应用',
                        link: '/操作员/应用',
                    },
                    {
                        text: '对话',
                        link: '/操作员/对话',
                    },
                ]
            },
        ]
    }
})