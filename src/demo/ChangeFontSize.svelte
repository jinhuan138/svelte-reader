<script>
  import { SvelteReader } from "svelte-reader";

  let rendition = null;
  let size = 100;
  const changeSize = (val) => {
    size = val;
    rendition.themes.fontSize(`${val}%`);
  };
  const getRendition = (val) => {
    rendition = val;
    rendition.themes.fontSize(`${size}%`);
  };
</script>

<div style="height: 100vh">
  <SvelteReader url="/svelte-reader/files/啼笑因缘.epub" {getRendition} />
</div>
<div class="size">
  <button on:click={() => changeSize(Math.max(80, size - 10))}>-</button>
  <span>Current size: {size}%</span>
  <button on:click={() => changeSize(Math.min(130, size + 10))}>+</button>
</div>

<style>
  .size {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    z-index: 1;
    text-align: center;
    color: #000;
  }
</style>
