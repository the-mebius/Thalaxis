import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        products: resolve(__dirname, 'src/products.html'),
        productDetail: resolve(__dirname, 'src/product-detail.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        careers: resolve(__dirname, 'src/careers.html'),
        privacyPolicy: resolve(__dirname, 'src/privacy-policy.html'),
        terms: resolve(__dirname, 'src/terms-and-conditions.html'),
        notfound: resolve(__dirname, 'src/404.html'),
      },
    },
  },
})