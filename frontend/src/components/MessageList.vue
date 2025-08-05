<template>
  <div class="flex flex-col gap-4 w-full">
    <div
      v-for="msg in messages"
      :key="msg.id"
      :class="[
        'max-w-full sm:max-w-xl px-4 py-2 rounded break-words whitespace-pre-wrap',
        msg.from === 'user'
          ? ' bg-teal-400 self-start mr-auto'
          : 'bg-blue-400 self-end ml-auto',
      ]"
    >
      {{ msg.text }}
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "@/stores/chat";

const chatStore = useChatStore();
const messages = chatStore.messages;
</script>
