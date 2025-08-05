<template>
  <div class="mb-6 flex flex-col gap-6">
    <div
      class="inline-flex items-center justify-center w-14 h-14 p-3 bg-white/10 rounded-lg mb-4"
    >
      <ChatIcon />
    </div>
    <h2 class="text-white font-semibold text-4xl mb-2">Hi there!</h2>
    <h1 class="text-white font-extrabold text-5xl mb-2">
      What would you like to know?
    </h1>
    <p class="text-white/60 text-xl max-w-lg">
      Use one of the most common prompts below<br />
      or ask your own question
    </p>
  </div>
</template>

<script setup>
import ChatIcon from "@/components/icons/ChatIcon.vue";
</script>
