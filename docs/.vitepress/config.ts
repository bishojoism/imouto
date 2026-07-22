import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: 'by浅仓朔弥',
    themeConfig: {
        sidebar: [
            {
                text: '网上处兄妹标准作业程序',
                link: '/',
            },
            {
                text: '任务',
                items: [
                    {
                        text: '准备微信',
                        link: '/任务/准备微信',
                    },
                    {
                        text: '准备小红书',
                        link: '/任务/准备小红书',
                    },
                    {
                        text: '触达潜在妹妹',
                        link: '/任务/触达潜在妹妹',
                    },
                    {
                        text: '确定兄妹关系',
                        link: '/任务/确定兄妹关系',
                    },
                    {
                        text: '和妹妹聊天',
                        link: '/任务/和妹妹聊天',
                    },
                ]
            },
        ]
    }
})