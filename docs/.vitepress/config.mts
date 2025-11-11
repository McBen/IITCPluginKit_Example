import {defineConfig} from 'vitepress'

const isProd = process.env.NODE_ENV === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: isProd ? '/test-vitepress/' : '/',
    title: "IITC PluginKit Tutorial",
    description: "This is a tutorial for the IITC PluginKit",
    ignoreDeadLinks: [
        /^https?:\/\/localhost/,
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
//            {text: 'Home', link: '/'},
//            {text: 'Examples', link: '/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Tutorial',
                items: [
                    {text: '1. Creating the Plugin', link: '/creating-the-plugin'},
                    {text: '2. Starting Buttons', link: '/starting-buttons'},
                    {text: '3. The Calculation', link: '/the-calculation'},
                    {text: '4. The Dialog', link: '/the-dialog'},
                    {text: '5. Map Icons', link: '/map-icons'},
                    {text: '6. Hooks', link: '/hooks'},
                    {text: '7. Release', link: '/release'},
                    {text: '8. Debugging', link: '/debugging'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/xxxx'}
        ],
        editLink: {
            pattern: 'https://github.com/xxx/yyy/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        externalLinkIcon: true
    }
})
