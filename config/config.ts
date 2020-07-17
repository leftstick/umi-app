import { defineConfig } from 'umi'

export default defineConfig({
  publicPath: 'http://localhost:8000/ok/',
  hash: true,
  mock: {
    exclude: ['mock/**/_*.[jt]s']
  },
  antd: {},
  locale: {
    antd: true,
    title: true
  },
  define: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL
  }
})
