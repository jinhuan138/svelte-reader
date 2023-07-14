<script>
  import { SvelteReader } from "svelte-reader";

  let url = null;
  const onchange = (e) => {
    const file = e.target.files[0];
    if (window.FileReader) {
      var reader = new FileReader();
      reader.onloadend = (e) => (url = reader.result);
      reader.readAsArrayBuffer(file);
    }
  };
</script>

<div style="position: relative;height: 100vh;">
  {#if url}
    <div style="height: 100vh">
      <SvelteReader {url} />
    </div>
  {/if}
  <input
    type="file"
    multiple={false}
    accept=".epub"
    on:change={onchange}
    class="input"
  />
</div>

<style>
  .input {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    z-index: 1;
  }
</style>
