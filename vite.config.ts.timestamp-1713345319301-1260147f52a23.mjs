// vite.config.ts
import { defineConfig } from "file:///C:/project/gelios-fluidd/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/project/gelios-fluidd/node_modules/@vitejs/plugin-vue2/dist/index.mjs";
import { VitePWA } from "file:///C:/project/gelios-fluidd/node_modules/vite-plugin-pwa/dist/index.js";
import Components from "file:///C:/project/gelios-fluidd/node_modules/unplugin-vue-components/dist/vite.js";
import { VuetifyResolver } from "file:///C:/project/gelios-fluidd/node_modules/unplugin-vue-components/dist/resolvers.js";
import path2 from "path";
import content from "file:///C:/project/gelios-fluidd/node_modules/@originjs/vite-plugin-content/dist/mjs/index.js";
import monacoEditorPluginModule from "file:///C:/project/gelios-fluidd/node_modules/vite-plugin-monaco-editor/dist/index.js";
import checker from "file:///C:/project/gelios-fluidd/node_modules/vite-plugin-checker/dist/esm/main.js";

// vite.config.inject-version.ts
import child_process from "child_process";
import fs from "fs";
import path from "path";

// package.json
var version = "0.6.0";

// vite.config.inject-version.ts
var __vite_injected_original_dirname = "C:\\project\\gelios-fluidd";
var writeVersionFile = async () => {
  const versionFile = await fs.promises.open(path.resolve(__vite_injected_original_dirname, "dist/.version"), "w");
  await versionFile.writeFile(`v${version}`);
  await versionFile.close();
};
var writeReleaseInfoFile = async () => {
  const releaseInfoFile = await fs.promises.open(path.resolve(__vite_injected_original_dirname, "dist/release_info.json"), "w");
  await releaseInfoFile.writeFile(JSON.stringify({
    project_name: "fluidd",
    project_owner: "UselessJoy",
    version: `v${version}`
  }));
  await releaseInfoFile.close();
};
var vitePluginInjectVersion = () => {
  return {
    name: "version",
    config: () => {
      const git_hash = child_process.execSync("git rev-parse --short HEAD").toString();
      return {
        define: {
          "import.meta.env.VERSION": JSON.stringify(version),
          "import.meta.env.HASH": JSON.stringify(git_hash)
        }
      };
    },
    writeBundle: () => {
      setImmediate(async () => {
        await writeVersionFile();
        await writeReleaseInfoFile();
      });
    }
  };
};
var vite_config_inject_version_default = vitePluginInjectVersion;

// vite.config.ts
var __vite_injected_original_dirname2 = "C:\\project\\gelios-fluidd";
var isObjectWithDefaultFunction = (module) => module != null && typeof module === "object" && "default" in module && typeof module.default === "function";
var monacoEditorPlugin = isObjectWithDefaultFunction(monacoEditorPluginModule) ? monacoEditorPluginModule.default : monacoEditorPluginModule;
var vite_config_default = defineConfig({
  plugins: [
    VitePWA({
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
      includeAssets: [
        "**/*.svg",
        "**/*.png",
        "**/*.ico",
        "editor.theme.json"
      ],
      injectManifest: {
        globPatterns: [
          "**/*.{js,css,html,ttf,woff,woff2,wasm}"
        ],
        maximumFileSizeToCacheInBytes: 4 * 1024 ** 2
      },
      manifest: {
        name: "fluidd",
        short_name: "fluidd",
        description: "The Klipper web interface for managing your 3d printer",
        theme_color: "#2196F3",
        background_color: "#000000",
        icons: [
          {
            src: "img/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "img/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "img/icons/android-chrome-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "img/icons/android-chrome-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        shortcuts: [
          {
            name: "Configuration",
            url: "#/configure",
            icons: [
              {
                src: "img/icons/shortcut-configuration-96x96.png",
                sizes: "96x96",
                type: "image/png"
              }
            ]
          },
          {
            name: "Settings",
            url: "#/settings",
            icons: [
              {
                src: "img/icons/shortcut-settings-96x96.png",
                sizes: "96x96",
                type: "image/png"
              }
            ]
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html"
      }
    }),
    vue(),
    vite_config_inject_version_default(),
    content(),
    monacoEditorPlugin({
      languageWorkers: ["editorWorkerService", "json", "css"]
    }),
    checker({
      vueTsc: {
        tsconfigPath: path2.resolve(__vite_injected_original_dirname2, "./tsconfig.app.json")
      }
    }),
    Components({
      dts: true,
      dirs: [
        "src/components/common",
        "src/components/layout",
        "src/components/ui"
      ],
      resolvers: [
        VuetifyResolver()
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      css: { charset: false },
      scss: {
        additionalData: '@import "@/scss/variables";\n'
      },
      sass: {
        additionalData: '@import "@/scss/variables.scss"\n'
      }
    }
  },
  envPrefix: "VUE_",
  resolve: {
    alias: {
      "@": path2.resolve(__vite_injected_original_dirname2, "./src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [
      "./tests/unit/setup.ts"
    ],
    alias: [
      { find: /^vue$/, replacement: "vue/dist/vue.runtime.common.js" }
    ]
  },
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 8080
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5jb25maWcuaW5qZWN0LXZlcnNpb24udHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxccHJvamVjdFxcXFxnZWxpb3MtZmx1aWRkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9qZWN0XFxcXGdlbGlvcy1mbHVpZGRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3Byb2plY3QvZ2VsaW9zLWZsdWlkZC92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlMidcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgVnVldGlmeVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBjb250ZW50IGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1jb250ZW50J1xuaW1wb3J0IG1vbmFjb0VkaXRvclBsdWdpbk1vZHVsZSBmcm9tICd2aXRlLXBsdWdpbi1tb25hY28tZWRpdG9yJ1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcidcbmltcG9ydCB2ZXJzaW9uIGZyb20gJy4vdml0ZS5jb25maWcuaW5qZWN0LXZlcnNpb24nXG5cbi8vIEZpeCBmb3IgaW5jb3JyZWN0IHR5cGluZ3Mgb24gdml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvclxuY29uc3QgaXNPYmplY3RXaXRoRGVmYXVsdEZ1bmN0aW9uID0gKG1vZHVsZTogdW5rbm93bik6IG1vZHVsZSBpcyB7IGRlZmF1bHQ6IHR5cGVvZiBtb25hY29FZGl0b3JQbHVnaW5Nb2R1bGUgfSA9PiAoXG4gIG1vZHVsZSAhPSBudWxsICYmXG4gIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmXG4gICdkZWZhdWx0JyBpbiBtb2R1bGUgJiZcbiAgdHlwZW9mIG1vZHVsZS5kZWZhdWx0ID09PSAnZnVuY3Rpb24nXG4pXG5cbmNvbnN0IG1vbmFjb0VkaXRvclBsdWdpbiA9IGlzT2JqZWN0V2l0aERlZmF1bHRGdW5jdGlvbihtb25hY29FZGl0b3JQbHVnaW5Nb2R1bGUpXG4gID8gbW9uYWNvRWRpdG9yUGx1Z2luTW9kdWxlLmRlZmF1bHRcbiAgOiBtb25hY29FZGl0b3JQbHVnaW5Nb2R1bGVcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIFZpdGVQV0Eoe1xuICAgICAgc3JjRGlyOiAnc3JjJyxcbiAgICAgIGZpbGVuYW1lOiAnc3cudHMnLFxuICAgICAgc3RyYXRlZ2llczogJ2luamVjdE1hbmlmZXN0JyxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFtcbiAgICAgICAgJyoqLyouc3ZnJyxcbiAgICAgICAgJyoqLyoucG5nJyxcbiAgICAgICAgJyoqLyouaWNvJyxcbiAgICAgICAgJ2VkaXRvci50aGVtZS5qc29uJ1xuICAgICAgXSxcbiAgICAgIGluamVjdE1hbmlmZXN0OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogW1xuICAgICAgICAgICcqKi8qLntqcyxjc3MsaHRtbCx0dGYsd29mZix3b2ZmMix3YXNtfSdcbiAgICAgICAgXSxcbiAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDQgKiAxMDI0ICoqIDJcbiAgICAgIH0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnZmx1aWRkJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ2ZsdWlkZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIEtsaXBwZXIgd2ViIGludGVyZmFjZSBmb3IgbWFuYWdpbmcgeW91ciAzZCBwcmludGVyJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMjE5NkYzJyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltZy9pY29ucy9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltZy9pY29ucy9hbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2ltZy9pY29ucy9hbmRyb2lkLWNocm9tZS1tYXNrYWJsZS0xOTJ4MTkyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWcvaWNvbnMvYW5kcm9pZC1jaHJvbWUtbWFza2FibGUtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgcHVycG9zZTogJ21hc2thYmxlJ1xuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgc2hvcnRjdXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ0NvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgICAgdXJsOiAnIy9jb25maWd1cmUnLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJ2ltZy9pY29ucy9zaG9ydGN1dC1jb25maWd1cmF0aW9uLTk2eDk2LnBuZycsXG4gICAgICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ1NldHRpbmdzJyxcbiAgICAgICAgICAgIHVybDogJyMvc2V0dGluZ3MnLFxuICAgICAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogJ2ltZy9pY29ucy9zaG9ydGN1dC1zZXR0aW5ncy05Nng5Ni5wbmcnLFxuICAgICAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBkZXZPcHRpb25zOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCdcbiAgICAgIH1cbiAgICB9KSxcbiAgICB2dWUoKSxcbiAgICB2ZXJzaW9uKCksXG4gICAgY29udGVudCgpLFxuICAgIG1vbmFjb0VkaXRvclBsdWdpbih7XG4gICAgICBsYW5ndWFnZVdvcmtlcnM6IFsnZWRpdG9yV29ya2VyU2VydmljZScsICdqc29uJywgJ2NzcyddXG4gICAgfSksXG4gICAgY2hlY2tlcih7XG4gICAgICB2dWVUc2M6IHtcbiAgICAgICAgdHNjb25maWdQYXRoOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi90c2NvbmZpZy5hcHAuanNvbicpXG4gICAgICB9XG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICBkdHM6IHRydWUsXG4gICAgICBkaXJzOiBbXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9jb21tb24nLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvbGF5b3V0JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL3VpJ1xuICAgICAgXSxcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBWdWV0aWZ5UmVzb2x2ZXIoKVxuICAgICAgXVxuICAgIH0pXG4gIF0sXG5cbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgY3NzOiB7IGNoYXJzZXQ6IGZhbHNlIH0sXG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvc2Nzcy92YXJpYWJsZXNcIjtcXG4nXG4gICAgICB9LFxuICAgICAgc2Fzczoge1xuICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAL3Njc3MvdmFyaWFibGVzLnNjc3NcIlxcbidcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZW52UHJlZml4OiAnVlVFXycsXG5cbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpXG4gICAgfVxuICB9LFxuXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHNldHVwRmlsZXM6IFtcbiAgICAgICcuL3Rlc3RzL3VuaXQvc2V0dXAudHMnXG4gICAgXSxcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAvXnZ1ZSQvLCByZXBsYWNlbWVudDogJ3Z1ZS9kaXN0L3Z1ZS5ydW50aW1lLmNvbW1vbi5qcycgfVxuICAgIF1cbiAgfSxcblxuICBiYXNlOiAnLi8nLFxuXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiA4MDgwXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHByb2plY3RcXFxcZ2VsaW9zLWZsdWlkZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccHJvamVjdFxcXFxnZWxpb3MtZmx1aWRkXFxcXHZpdGUuY29uZmlnLmluamVjdC12ZXJzaW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9qZWN0L2dlbGlvcy1mbHVpZGQvdml0ZS5jb25maWcuaW5qZWN0LXZlcnNpb24udHNcIjtpbXBvcnQgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuXG5jb25zdCB3cml0ZVZlcnNpb25GaWxlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCB2ZXJzaW9uRmlsZSA9IGF3YWl0IGZzLnByb21pc2VzLm9wZW4ocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QvLnZlcnNpb24nKSwgJ3cnKVxuXG4gIGF3YWl0IHZlcnNpb25GaWxlLndyaXRlRmlsZShgdiR7dmVyc2lvbn1gKVxuXG4gIGF3YWl0IHZlcnNpb25GaWxlLmNsb3NlKClcbn1cblxuY29uc3Qgd3JpdGVSZWxlYXNlSW5mb0ZpbGUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlbGVhc2VJbmZvRmlsZSA9IGF3YWl0IGZzLnByb21pc2VzLm9wZW4ocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QvcmVsZWFzZV9pbmZvLmpzb24nKSwgJ3cnKVxuXG4gIGF3YWl0IHJlbGVhc2VJbmZvRmlsZS53cml0ZUZpbGUoSlNPTi5zdHJpbmdpZnkoe1xuICAgIHByb2plY3RfbmFtZTogJ2ZsdWlkZCcsXG4gICAgcHJvamVjdF9vd25lcjogJ1VzZWxlc3NKb3knLFxuICAgIHZlcnNpb246IGB2JHt2ZXJzaW9ufWBcbiAgfSkpXG5cbiAgYXdhaXQgcmVsZWFzZUluZm9GaWxlLmNsb3NlKClcbn1cblxuY29uc3Qgdml0ZVBsdWdpbkluamVjdFZlcnNpb24gPSAoKTogUGx1Z2luID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmVyc2lvbicsXG4gICAgY29uZmlnOiAoKSA9PiB7XG4gICAgICBjb25zdCBnaXRfaGFzaCA9IGNoaWxkX3Byb2Nlc3NcbiAgICAgICAgLmV4ZWNTeW5jKCdnaXQgcmV2LXBhcnNlIC0tc2hvcnQgSEVBRCcpXG4gICAgICAgIC50b1N0cmluZygpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlZmluZToge1xuICAgICAgICAgICdpbXBvcnQubWV0YS5lbnYuVkVSU0lPTic6IEpTT04uc3RyaW5naWZ5KHZlcnNpb24pLFxuICAgICAgICAgICdpbXBvcnQubWV0YS5lbnYuSEFTSCc6IEpTT04uc3RyaW5naWZ5KGdpdF9oYXNoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB3cml0ZUJ1bmRsZTogKCkgPT4ge1xuICAgICAgc2V0SW1tZWRpYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgd3JpdGVWZXJzaW9uRmlsZSgpXG4gICAgICAgIGF3YWl0IHdyaXRlUmVsZWFzZUluZm9GaWxlKClcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZpdGVQbHVnaW5JbmplY3RWZXJzaW9uXG4iLCAie1xuICBcIm5hbWVcIjogXCJmbHVpZGRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC42LjBcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiZmx1aWRkLCBhIGtsaXBwZXIgd2ViIGNsaWVudC5cIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcIkNyYWlnIEJhc3NldHRcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJzdGFydFwiOiBcInZpdGVcIixcbiAgICBcInNlcnZlXCI6IFwidml0ZVwiLFxuICAgIFwic2VydmU6cHJvZFwiOiBcInZpdGUgcHJldmlldyAtLXBvcnQgNTAwMFwiLFxuICAgIFwic2VydmU6ZG9jc1wiOiBcImNkIC4vZG9jczsgYnVuZGxlIGV4ZWMgamVreWxsIHNlcnZlXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC0tZXh0IC50cywuanMsLnZ1ZSAuL3NyY1wiLFxuICAgIFwiYm9vdHN0cmFwXCI6IFwiaHVza3lcIixcbiAgICBcImNvcHk6aG9zdDpjb25maWdcIjogXCJzaHggY3AgLWYgLi9zZXJ2ZXIvY29uZmlnLmpzb24gLi9kaXN0L2NvbmZpZy5qc29uXCIsXG4gICAgXCJkZXBsb3k6aG9zdFwiOiBcIm5weCAtLXllcyAtcCBAMHg0NDQ3L3BvdGF0byBwb3RhdG8gLXMgZGlzdCAtdSAtYiBhcHAuZmx1aWRkLnh5eiAtYSBcXFwiJEFXU19BQ0NFU1NfS0VZX0lEXFxcIiAtdCBcXFwiJEFXU19TRUNSRVRfQUNDRVNTX0tFWVxcXCJcIixcbiAgICBcImRlcGxveTpob3N0OmRldlwiOiBcIm5weCAtLXllcyAtcCBAMHg0NDQ3L3BvdGF0byBwb3RhdG8gLXMgZGlzdCAtdSAtYiBkZXYtYXBwLmZsdWlkZC54eXpcIixcbiAgICBcImkxOG4tZXh0cmFjdFwiOiBcInZ1ZS1pMThuLWV4dHJhY3QgdXNlLWNvbmZpZ1wiLFxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIixcbiAgICBcInJlbGVhc2U6bWFqb3JcIjogXCJucG0gcnVuIHJlbGVhc2UgLS0gLS1yZWxlYXNlLWFzIG1ham9yXCIsXG4gICAgXCJyZWxlYXNlOm1pbm9yXCI6IFwibnBtIHJ1biByZWxlYXNlIC0tIC0tcmVsZWFzZS1hcyBtaW5vclwiLFxuICAgIFwicmVsZWFzZTpwYXRjaFwiOiBcIm5wbSBydW4gcmVsZWFzZSAtLSAtLXJlbGVhc2UtYXMgcGF0Y2hcIixcbiAgICBcInJlbGVhc2U6cmNcIjogXCJucG0gcnVuIHJlbGVhc2UgLS0gLS1wcmVyZWxlYXNlIHJjXCIsXG4gICAgXCJ0ZXN0XCI6IFwibnBtIHJ1biB0ZXN0OnVuaXRcIixcbiAgICBcInRlc3Q6dW5pdFwiOiBcInZpdGVzdCAtLWVudmlyb25tZW50IGpzZG9tXCIsXG4gICAgXCJ0eXBlLWNoZWNrXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAtcCB0c2NvbmZpZy52aXRlc3QuanNvbiAtLWNvbXBvc2l0ZSBmYWxzZVwiLFxuICAgIFwiY2lyY3VsYXItY2hlY2tcIjogXCJza290dCAtLWRpc3BsYXlNb2RlPWZpbGUtdHJlZSAtLXNob3dDaXJjdWxhckRlcGVuZGVuY2llcyAtLXRzY29uZmlnPS4vdHNjb25maWcuYXBwLmpzb25cIixcbiAgICBcInRoZW1lOmNvbnZlcnRcIjogXCJjZCB0b29sczsgbm9kZSBjb252ZXJ0VGhlbWUuanNcIlxuICB9LFxuICBcIm1haW5cIjogXCJpbmRleC5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY3RybC90aW55Y29sb3JcIjogXCJeNC4wLjNcIixcbiAgICBcIkBmb250c291cmNlL3JhbGV3YXlcIjogXCJeNS4wLjE2XCIsXG4gICAgXCJAZm9udHNvdXJjZS9yb2JvdG9cIjogXCJeNS4wLjhcIixcbiAgICBcIkBpcm9qcy9pcm8tY29yZVwiOiBcIl4xLjIuMVwiLFxuICAgIFwiQGphYW1lcy9pcm9cIjogXCJeNS41LjJcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNi43XCIsXG4gICAgXCJjb25zb2xhXCI6IFwiXjMuMi4zXCIsXG4gICAgXCJkZWVwbWVyZ2VcIjogXCJeNC4zLjFcIixcbiAgICBcImRvbXB1cmlmeVwiOiBcIl4zLjAuOFwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjQuM1wiLFxuICAgIFwiZWNoYXJ0cy1nbFwiOiBcIl4yLjAuOVwiLFxuICAgIFwiaGxzLmpzXCI6IFwiXjEuNS4zXCIsXG4gICAgXCJqd3QtZGVjb2RlXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWFya2VkXCI6IFwiXjEyLjAuMFwiLFxuICAgIFwibWFya2VkLWJhc2UtdXJsXCI6IFwiXjEuMS4zXCIsXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcbiAgICBcIm1vbmFjby1lZGl0b3JcIjogXCJeMC40NS4wXCIsXG4gICAgXCJtb25hY28tZWRpdG9yLXRleHRtYXRlXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJtb25hY28tdGV4dG1hdGVcIjogXCJeMy4wLjFcIixcbiAgICBcIm5wbS1jaGVjay11cGRhdGVzXCI6IFwiXjE2LjE0LjE4XCIsXG4gICAgXCJvbmlnYXNtXCI6IFwiXjIuMi41XCIsXG4gICAgXCJwYW56b29tXCI6IFwiXjkuNC4zXCIsXG4gICAgXCJxci1zY2FubmVyXCI6IFwiXjEuNC4yXCIsXG4gICAgXCJxcmNvZGUudnVlXCI6IFwiXjEuNy4wXCIsXG4gICAgXCJzZW12ZXJcIjogXCJeNy41LjRcIixcbiAgICBcInNobGV4XCI6IFwiXjIuMS4yXCIsXG4gICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxuICAgIFwidXVpZFwiOiBcIl45LjAuMVwiLFxuICAgIFwidnVlXCI6IFwiXjIuNy4xNlwiLFxuICAgIFwidnVlLWNsYXNzLWNvbXBvbmVudFwiOiBcIl43LjIuNlwiLFxuICAgIFwidnVlLWVjaGFydHNcIjogXCJeNi42LjhcIixcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjguMjguMlwiLFxuICAgIFwidnVlLWlubGluZS1zdmdcIjogXCJeMi4xLjNcIixcbiAgICBcInZ1ZS1qc29uLXZpZXdlclwiOiBcIl4yLjIuMjJcIixcbiAgICBcInZ1ZS1tZXRhXCI6IFwiXjIuNC4wXCIsXG4gICAgXCJ2dWUtcHJvcGVydHktZGVjb3JhdG9yXCI6IFwiXjkuMS4yXCIsXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjMuNi41XCIsXG4gICAgXCJ2dWUtdmlydHVhbC1zY3JvbGxlclwiOiBcIl4xLjEuMlwiLFxuICAgIFwidnVlMi10b3VjaC1ldmVudHNcIjogXCJeMy4yLjNcIixcbiAgICBcInZ1ZXRpZnlcIjogXCJeMi43LjFcIixcbiAgICBcInZ1ZXRpZnktY29uZmlybVwiOiBcIl4yLjAuNlwiLFxuICAgIFwidnVleFwiOiBcIl4zLjYuMlwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBtZGkvanNcIjogXCJeNy40LjQ3XCIsXG4gICAgXCJAb3JpZ2luanMvdml0ZS1wbHVnaW4tY29udGVudFwiOiBcIl4xLjAuNVwiLFxuICAgIFwiQHR5cGVzL2RvbXB1cmlmeVwiOiBcIl4zLjAuNVwiLFxuICAgIFwiQHR5cGVzL2pzZG9tXCI6IFwiXjIxLjEuNlwiLFxuICAgIFwiQHR5cGVzL2xvZGFzaC1lc1wiOiBcIl40LjE3LjEyXCIsXG4gICAgXCJAdHlwZXMvbWQ1XCI6IFwiXjIuMy41XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMS4xM1wiLFxuICAgIFwiQHR5cGVzL3NlbXZlclwiOiBcIl43LjUuNlwiLFxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS43XCIsXG4gICAgXCJAdHlwZXMvdXVpZFwiOiBcIl45LjAuOFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi4yMC4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuMjAuMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlMlwiOiBcIl4yLjMuMVwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjguMC4xXCIsXG4gICAgXCJAdnVlL2VzbGludC1jb25maWctdHlwZXNjcmlwdFwiOiBcIl4xMi4wLjBcIixcbiAgICBcIkB2dWUvdGVzdC11dGlsc1wiOiBcIl4xLjMuNlwiLFxuICAgIFwiQHZ1ZS90c2NvbmZpZ1wiOiBcIn4wLjEuM1wiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yMS4wXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjAuN1wiLFxuICAgIFwianNkb21cIjogXCJeMjQuMC4wXCIsXG4gICAgXCJtb2NrZGF0ZVwiOiBcIl4zLjAuNVwiLFxuICAgIFwibW9uYWNvLXZzY29kZS10ZXh0bWF0ZS10aGVtZS1jb252ZXJ0ZXJcIjogXCJeMC4xLjdcIixcbiAgICBcInJvbGx1cFwiOiBcIl40LjkuNlwiLFxuICAgIFwic2Fzc1wiOiBcIn4xLjMyLjEzXCIsXG4gICAgXCJzaHhcIjogXCJeMC4zLjRcIixcbiAgICBcInNrb3R0XCI6IFwiXjAuMzIuMVwiLFxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjUuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNi4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMC4xMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tY2hlY2tlclwiOiBcIl4wLjYuM1wiLFxuICAgIFwidml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvclwiOiBcIl4xLjEuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tcHdhXCI6IFwiXjAuMTcuNVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjEuMi4yXCIsXG4gICAgXCJ2dWUtZGVib3VuY2UtZGVjb3JhdG9yXCI6IFwiXjEuMC4xXCIsXG4gICAgXCJ2dWUtaTE4bi1leHRyYWN0XCI6IFwiXjIuMC43XCIsXG4gICAgXCJ2dWUtdGVtcGxhdGUtY29tcGlsZXJcIjogXCJeMi43LjE2XCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC4yN1wiLFxuICAgIFwid29ya2JveC1idWlsZFwiOiBcIl43LjAuMFwiLFxuICAgIFwid29ya2JveC1jb3JlXCI6IFwiXjcuMC4wXCIsXG4gICAgXCJ3b3JrYm94LXJvdXRpbmdcIjogXCJeNy4wLjBcIixcbiAgICBcIndvcmtib3gtc3RyYXRlZ2llc1wiOiBcIl43LjAuMFwiLFxuICAgIFwid29ya2JveC13aW5kb3dcIjogXCJeNy4wLjBcIlxuICB9LFxuICBcIl9pZFwiOiBcImZsdWlkZEAwLjAuM1wiLFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL1VzZWxlc3NKb3kvZmx1aWRkL2lzc3Vlc1wiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vVXNlbGVzc0pveS9mbHVpZGQjcmVhZG1lXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwia2xpcHBlclwiXG4gIF0sXG4gIFwibGljZW5zZVwiOiBcIk1JVFwiLFxuICBcInJlYWRtZVwiOiBcIlJFQURNRS5tZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9Vc2VsZXNzSm95L2ZsdWlkZC5naXRcIlxuICB9LFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIl4xOCB8fCBeMjBcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixP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LE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsS0FBSztBQUFBLGdCQUNMLE9BQU87QUFBQSxnQkFDUCxNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxLQUFLO0FBQUEsZ0JBQ0wsT0FBTztBQUFBLGdCQUNQLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLG1DQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixtQkFBbUI7QUFBQSxNQUNqQixpQkFBaUIsQ0FBQyx1QkFBdUIsUUFBUSxLQUFLO0FBQUEsSUFDeEQsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sY0FBY0MsTUFBSyxRQUFRQyxtQ0FBVyxxQkFBcUI7QUFBQSxNQUM3RDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsS0FBSyxFQUFFLFNBQVMsTUFBTTtBQUFBLE1BQ3RCLE1BQU07QUFBQSxRQUNKLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxXQUFXO0FBQUEsRUFFWCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLRCxNQUFLLFFBQVFDLG1DQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLFNBQVMsYUFBYSxpQ0FBaUM7QUFBQSxJQUNqRTtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU07QUFBQSxFQUVOLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
