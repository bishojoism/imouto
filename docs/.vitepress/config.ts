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
                        text: '小红书触达潜在妹妹',
                        link: '/任务/小红书触达潜在妹妹',
                    },
                    {
                        text: '小红书确定兄妹关系',
                        link: '/任务/小红书确定兄妹关系',
                    },
                ]
            },
            {
                text: '规范',
                items: [
                    {
                        text: '线上对话',
                        link: '/规范/线上对话',
                    },
                ]
            },
        ]
    }
})