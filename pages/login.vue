<script setup>
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login, redirectToGoogle, } = useAuth();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset) : ""
);

const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(
  () => {
    status.value = "";
    return login(data);
  },
  {
    onSuccess: () => router.push("/dashboard"),
  }
);
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <!-- Session Status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <form @submit.prevent="submit">
      <!-- Email Address -->
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" class="block mt-1 w-full" v-model="data.email" :errors="errors.email?.[0]" required
          autoFocus />
      </div>

      <!-- Password -->
      <div class="mt-4">
        <Label for="password">Password</Label>
        <Input id="password" type="password" class="block mt-1 w-full" v-model="data.password" :errors="errors.password"
          required autoComplete="current-password" />
      </div>

      <!-- Remember Me -->
      <div class="block mt-4">
        <label for="remember" class="inline-flex items-center">
          <input id="remember" type="checkbox" name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember" />
          <span class="ml-2 text-sm text-gray-600"> Remember me </span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink href="/forgot-password" class="underline text-sm text-gray-600 hover:text-gray-900">
          Forgot your password?
        </NuxtLink>

        <Button class="ml-3" :disabled="inProgress">Login</Button>
      </div>
    </form>
    <div>
      <div class="relative mt-10">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-200" />
        </div>
        <div class="relative flex justify-center text-sm font-medium leading-6">
          <span class="bg-white px-6 text-gray-900">Or continue with</span>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-4">
        <button @click="redirectToGoogle" type="button"
          class="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] border-gray-500 border-solid border hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" class="h-5 w-5">
            <rect x="0" y="0" width="128" height="128" fill="none" stroke="none" />
            <path fill="#fff"
              d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z" />
            <path fill="#e33629"
              d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z" />
            <path fill="#f8bd00"
              d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z" />
            <path fill="#587dbd"
              d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z" />
            <path fill="#319f43"
              d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z" />
          </svg>
          <span class="text-sm font-semibold leading-6">Google</span>
        </button>
      </div>
    </div>
  </AuthCard>
</template>
