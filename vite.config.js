import { defineConfig } from 'vite' 
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'), 
        products: resolve(__dirname, 'src/products/index.html'),
        product: resolve(__dirname, 'src/products/product-details.html'),
        login: resolve(__dirname, 'src/auth/login.html'),
        register: resolve(__dirname, 'src/auth/register.html'),
        dasboard: resolve(__dirname, 'src/adm/index.html'),
        orders: resolve(__dirname, 'src/adm/orders.html'),
        productsAdmin: resolve(__dirname, 'src/adm/products.html'),
        addProduct: resolve(__dirname, 'src/adm/add-product.html'), 
      },
    },
  },
})