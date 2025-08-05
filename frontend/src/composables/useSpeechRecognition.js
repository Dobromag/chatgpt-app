import { ref } from "vue";

export function useSpeechRecognition(onResult) {
  const isListening = ref(false);
  let recognition = null;

  if ("webkitSpeechRecognition" in window) {
    const SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      if (typeof onResult === "function") {
        onResult(result);
      }
    };

    recognition.onend = () => {
      isListening.value = false;
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      isListening.value = false;
    };
  } else {
    console.warn("SpeechRecognition не поддерживается в этом браузере");
  }

  function toggleListening() {
    if (!recognition) return;
    if (isListening.value) {
      recognition.stop();
    } else {
      recognition.start();
      isListening.value = true;
    }
  }

  return {
    isListening,
    toggleListening,
  };
}
