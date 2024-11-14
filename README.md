# How to Set Up Microfrontends and Host App with Vite

## Step 1: Create Microfrontends and Host App with Vite
```bash
npm create vite@latest microfrontend-1
cd microfrontend-1
npm install

npm create vite@latest microfrontend-2
cd microfrontend-2
npm install

npm create vite@latest host-app
cd host-app
npm install
```

## Step 2: Install Required Plugins and Tools
For each microfrontend and host app, install the module federation plugin and concurrently for managing builds.

```bash
cd microfrontend-1
npm install @originjs/vite-plugin-federation --save-dev
npm install concurrently --save-dev

cd microfrontend-2
npm install @originjs/vite-plugin-federation --save-dev
npm install concurrently --save-dev

cd host-app
npm install @originjs/vite-plugin-federation --save-dev
npm install concurrently --save-dev
```

## Step 3: Configure vite.config.js for Module Federation
In each app, configure vite.config.js for module federation to expose and consume components.

### microfrontend-1 (vite.config.js):
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'microfrontend1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
      },
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext', // to support shared modules
  },
  server: {
    port: 7070
  }
});
```
### microfrontend-2 (vite.config.js):
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'microfrontend2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
      },
      shared: ['vue'],
    }),
  ],
  build: {
    target: 'esnext', // to support shared modules
  },
  server: {
    port: 6060
  }
});
```

### host-app (vite.config.js):
```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host-app",
      remotes: {
        microfrontend1: "http://localhost:7070/assets/remoteEntry.js",
        microfrontend2: 'http://localhost:6060/assets/remoteEntry.js'
      },
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext", // to support shared modules
  },
});
```
## Step 4: Update App.vue in the Host App
In host-app, import and display the components from the microfrontends.

### host-app (App.vue):
```javascript
<template>
  <h1>MyApp</h1>
  <div>Welcome to the micro frontends demo</div>
  <div class="container">
    <App1 />
    <App2 />
  </div>
</template>

<script setup>
import App1 from "microfrontend1/App";
import App2 from "microfrontend2/App";
</script>
```

## Step 5: Modify package.json Scripts for Microfrontends
Modify the package.json scripts for microfrontend-1 and microfrontend-2 to enable concurrent build and preview.

### microfrontend-1 (package.json):
```javascript
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "concurrently \"vite build --watch\" \"vite preview --port 7070 --strictPort\""
  },
```
### microfrontend-2 (package.json):
```javascript
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "concurrently \"vite build --watch\" \"vite preview --port 6060 --strictPort\""
  },
```

## Step 6: Build and Preview
Build and preview each microfrontend and the host app.

```bash
cd microfrontend-1
npm run build
npm run preview

cd microfrontend-2
npm run build
npm run preview

cd host-app
npm run build
npm run preview
```