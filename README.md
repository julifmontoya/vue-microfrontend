# Step-by-Step Guide to Setting Up Microfrontends and Host App with Vite

## Step 1: Create Microfrontends and Host App
**1. Open Terminal #1 and create the first microfrontend:**
```bash
npm create vite@latest microfrontend-1
cd microfrontend-1
npm install
```

**2. Open Terminal #2 and create the second microfrontend:**
```bash
npm create vite@latest microfrontend-2
cd microfrontend-2
npm install
```

**3. Open Terminal #3 and create the host app:**
```bash
npm create vite@latest host-app
cd host-app
npm install
```

After completing this step, you will have three directories: microfrontend-1, microfrontend-2, and host-app, each set up with Vite and ready for configuration.

## Step 2: Install Required Plugins and Tools
In each terminal, you’ll now install module federation plugin and concurrently (a tool for running multiple processes). Each terminal corresponds to a different part of the project. 

**1. Terminal #1 (microfrontend-1):**
```bash
npm install @originjs/vite-plugin-federation --save-dev
npm install concurrently --save-dev
```

**2. Terminal #2 (microfrontend-2):**
```bash
npm install @originjs/vite-plugin-federation --save-dev
npm install concurrently --save-dev
```

**3. Terminal #3 (host-app):**
```bash
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
Each microfrontend and the host app needs to be built and then previewed

**1. Open a Terminal for microfrontend-1**
```bash
cd microfrontend-1
npm run build
npm run preview
```

**2. Open Another Terminal for microfrontend-2**
```bash
cd microfrontend-2
npm run build
npm run preview
```

**3. Open a Third Terminal for the host app**
```bash
cd host-app
npm run build
npm run preview
```

host-app, which will load and display components from both microfrontend-1 and microfrontend-2.