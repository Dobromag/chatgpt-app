import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
  const messages = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  async function sendMessage(text) {
    messages.value.push({ id: Date.now(), from: "user", text });
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error("Ошибка ответа от сервера");
      }

      messages.value.push({
        id: Date.now() + 1,
        from: "bot",
        text: data.reply,
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      errorMessage.value = "Произошла ошибка при обращении к серверу.";
    } finally {
      isLoading.value = false;
    }
  }

  return { messages, sendMessage, isLoading, errorMessage };
});
