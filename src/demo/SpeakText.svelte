<script>
  import { SvelteReader } from "svelte-reader";

  let isAudioOn = false,
    text = "",
    rendition = null;
  let isReading = false;
  const locationChange = () => {
    const range = rendition.getRange(rendition.currentLocation().start.cfi);
    const endRange = rendition.getRange(rendition.currentLocation().end.cfi);
    range.setEnd(endRange.startContainer, endRange.startOffset);

    text = range
      .toString()
      .replace(/\s\s/g, "")
      .replace(/\r/g, "")
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .replace(/\f/g, "");
  };

  const speak = (type) => {
    if (type === "click") isReading = !isReading;
    if (isReading) {
      voice(text);
    } else {
      isAudioOn = false;
      window.speechSynthesis.cancel();
    }
  };

  const voice = (text, rate = 1) => {
    isAudioOn = true;
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.voice = window.speechSynthesis.getVoices()[0];
    msg.rate = rate;
    window.speechSynthesis.speak(msg);
    msg.onerror = (err) => {
      console.log(err);
    };
    msg.onend = async (event) => {
      if (!isReading && !isAudioOn) return;
      rendition.next();
      speak();
    };
  };
</script>

<div style="position: relative">
  <div style="height: 100vh">
    <SvelteReader
      url="/svelte-reader/files/啼笑因缘.epub"
      getRendition={(val) => (rendition = val)}
      on:update:location={locationChange}
    />
  </div>
  <div class="speak">
    <button class="reader-button" on:click={() => speak("click")}>
      {isReading ? "cancel" : "speak"}
    </button>
  </div>
</div>

<style>
  .speak {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    z-index: 1;
    text-align: center;
  }
</style>
