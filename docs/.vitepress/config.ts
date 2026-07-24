import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    title: '处兄妹攻略',
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/bishojoism/imouto/edit/main/docs/:path'
        }
    }
})