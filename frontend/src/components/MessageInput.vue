<script setup>
import MicrophoneIcon from "@/components/icons/MicrophoneIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";
import { useSpeechRecognition } from "@/composables/useSpeechRecognition.js";
import { useChatStore } from "@/stores/chat";
import { nextTick, ref, watch } from "vue";

const text = ref("");
const chatStore = useChatStore();
const textareaRef = ref(null);

const { toggleListening, isListening } = useSpeechRecognition((result) => {
  text.value = result;
});

function submit() {
  if (text.value.trim()) {
    chatStore.sendMessage(text.value.trim());
    text.value = "";
  }
}

function handleEnter(event) {
  if (!event.shiftKey) {
    event.preventDefault();
    submit();
  }
}

// Автоматическая подстройка высоты textarea
watch(text, async () => {
  await nextTick();
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
});
</script>

<template>
  <div class="w-full my-2 mt-8">
    <div
      class="relative flex items-center w-full bg-white/5 border-2 border-white/20 rounded-xl pl-4 pr-0 py-3 backdrop-blur-md"
    >
      <!-- Кнопка микрофона -->
      <button
        @click="toggleListening"
        :class="[
          'transition cursor-pointer p-2 rounded-full',
          isListening
            ? 'animate-pulse bg-[#687fa5]/40 text-[#fff]'
            : 'text-white/60 hover:text-white hover:scale-110',
        ]"
      >
        <MicrophoneIcon />
      </button>

      <!-- Поля ввода -->
      <textarea
        ref="textareaRef"
        v-model="text"
        @keydown.enter="handleEnter"
        rows="1"
        placeholder="Ask whatever you want"
        class="flex-1 w-full min-w-0 bg-transparent pl-2 pr-16 text-white placeholder-white/50 focus:outline-none resize-none overflow-hidden"
      ></textarea>

      <!-- Кнопка отправки -->
      <button
        @click="submit"
        class="flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 h-14 w-14 bg-[#1D4D9B] hover:bg-white/20 text-white p-2 rounded-xl transition cursor-pointer"
      >
        <RightArrowIcon />
      </button>
    </div>
  </div>
</template>
