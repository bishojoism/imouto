import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: 'by浅仓朔弥',
    themeConfig: {
        sidebar: [
            {
                text: '小红书处兄妹标准作业程序',
                link: '/',
            },
            {
                text: '脚本',
                items: [
                    {
                        text: '准备小红书',
                        link: '/脚本/准备小红书',
                    },
                    {
                        text: '触达潜在妹妹',
                        link: '/脚本/触达潜在妹妹',
                    },
                    {
                        text: '确定兄妹关系',
                        link: '/脚本/确定兄妹关系',
                    },
                ]
            },
        ]
    }
})