// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    ssr: true,
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@nuxtjs/supabase'
    ],
    vite: {
        define: {
          'process.env.DEBUG': false,
        },
    },
    hooks: {
      'vite:extendConfig': (config) => {
        config.plugins.push(
          vuetify()
        )
      }  
    }
})






