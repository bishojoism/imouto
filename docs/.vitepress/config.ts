import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: '网上处兄妹',
    description: '一种安全、轻量、简洁、高效的异性相处范式',
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/bishojoism/imouto/edit/main/docs/:path'
        }
    }
})