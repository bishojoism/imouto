import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: '妹谱',
    description: '网上处兄妹完全指南',
    themeConfig: {
        sidebar: [
            {
                text: '为什么处兄妹？',
                link: '/为什么处兄妹？',
            },
            {
                text: '快速开始',
                link: '/快速开始',
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
        ],
        editLink: {
            pattern: 'https://github.com/bishojoism/imouto/edit/main/docs/:path'
        }
    }
})