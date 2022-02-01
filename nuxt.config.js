export default {
  ssr: true,
  target: 'server',
  server: {
    host: '0.0.0.0',
    port: '3000',
  },
  loadingIndicator: {
    name: 'circle',
    color: '#007cc2',
    background: '#ffffff'
  },
  head: {
    title: 'ESKON ESENLER İNŞAAT SAN.VE TİC. A.Ş',
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "https://polyfill.io/v3/polyfill.min.js?features=default",
      },
      {
        src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAf7oC3XlkgfMljwgUzq4GIUMGwfvEwXGc&v=weekly&language=tr&region=JP&channel=2",
        body: true
      },
    ],
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:4001'
  },
  css: [
  ],
  plugins: [
    '@/plugins/vue-awesome-swiper',
    '@/plugins/VMask',
    '@/plugins/checkTcKimlik.js',
    '@/plugins/checkEmail.js',
    '@/plugins/appStatus.js',
    '@/plugins/dateFormat.js'
  ],
  components: true,
  buildModules: [
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    'nuxt-lazy-load'
  ],
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName: '[hash:base64:4]',
        },
      },
    },

    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },

    transpile: ['vee-validate/dist/rules'],

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'app.[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'chunk.[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'main.[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]'),
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]',
    },
  },
  bootstrapVue: {
    icons: true,
    bootstrapCSS: true,
    bootstrapVueCSS: true
  }
}
