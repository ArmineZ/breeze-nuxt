
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  tailwindcss: {
    configPath: "./tailwind.config.js",
  },
  runtimeConfig: {
    public: {
      backendUrl: "http://localhost:8000",
      frontendUrl: "http://localhost:3000",
      GOOGLE_AUTH_URL: '/auth/google/redirect',
    },
  },
  ssr: false,
  imports: {
    dirs: ["./utils"],
  },
});
