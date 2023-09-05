<script setup>
const { refresh } = useAuth();
const router = useRouter();

// Just fetch the current user since the cookie will be sent with the request
await refresh();
router.push("/dashboard");
</script>
<template>

</template>