<template>
  <div class="w-full h-screen flex flex-col bg-[#072E6A] text-white">
    <div
      class="flex flex-col h-screen overflow-y-auto px-4 pt-12 pb-2"
      ref="scrollContainer"
    >
      <div class="ml-0 lg:ml-[150px] max-w-3xl">
        <ChatHeader />
      </div>

      <div class="ml-0 lg:ml-[150px] max-w-2xl mt-6">
        <div
          v-if="chatStore.errorMessage"
          class="text-red-500 font-semibold mb-2"
        >
          {{ chatStore.errorMessage }}
        </div>

        <MessageList />

        <div v-if="chatStore.isLoading" class="text-white/80 text-sm my-2">
          Бот печатает...
        </div>
      </div>

      <div class="px-2 lg:px-4 pb-2 mt-auto mb-auto">
        <div class="ml-0 lg:ml-[150px] max-w-2xl w-full">
          <MessageInput />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
import MessageInput from "@/components/MessageInput.vue";
import MessageList from "@/components/MessageList.vue";
import { useChatStore } from "@/stores/chat";
import { nextTick, ref, watch } from "vue";

const chatStore = useChatStore();
const scrollContainer = ref(null);

watch(
  () => chatStore.messages.length,
  () => {
    nextTick(() => {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
      }
    });
  }
);
</script>
