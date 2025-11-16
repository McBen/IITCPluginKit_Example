import {defineConfig} from 'vitepress'

const isProd = process.env.NODE_ENV === 'production'
const prodBase = '/IITCPluginKit_Example/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: isProd ? prodBase : '/',
    title: "IITC PluginKit Tutorial",
    description: "This is a tutorial for the IITC PluginKit",
    lastUpdated: true,
    ignoreDeadLinks: [
        /^https?:\/\/localhost/,
    ],
    head: [['link', { rel: 'icon', href: isProd ? prodBase + 'favicon.ico' : '/favicon.ico' }]],

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
                    {text: '1. Creating the Plugin', link: '/1-creating-the-plugin'},
                    {text: '2. Starting Buttons', link: '/2-starting-buttons'},
                    {text: '3. The Calculation', link: '/3-the-calculation'},
                    {text: '4. The Dialog', link: '/4-the-dialog'},
                    {text: '5. Map Icons', link: '/5-map-icons'},
                    {text: '6. Hooks', link: '/6-hooks'},
                    {text: '7. Release', link: '/7-release'},
                    {text: '8. Debugging', link: '/8-debugging'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/McBen/IITCPluginKit'}
        ],
        editLink: {
            pattern: 'https://github.com/McBen/IITCPluginKit_Example/edit/master/docs/:path',
            text: 'Edit this page on GitHub'
        },
        externalLinkIcon: true
    }
})
