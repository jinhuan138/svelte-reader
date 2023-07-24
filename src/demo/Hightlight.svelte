<script>
  import { onDestroy } from "svelte";
  import { SvelteReader } from "svelte-reader";

  let rendition = null;
  let selections =[]

  const setRenderSelection = (cfiRange, contents) => {
    selections = [...selections,{text: rendition.getRange(cfiRange).toString(),cfiRange}];
    rendition.annotations.add("highlight", cfiRange, {}, null, "hl", {
      fill: "red",
      "fill-opacity": "0.5",
      "mix-blend-mode": "multiply",
    });
    contents.window.getSelection().removeAllRanges();
  };

  const getRendition = (val) => {
    rendition = val;
    rendition.themes.default({
      "::selection": {
        background: "orange",
      },
    });
    rendition.on("selected", setRenderSelection);
  };

  const remove = (cfiRange, index) => {
    rendition.annotations.remove(cfiRange, "highlight");
    selections = selections.filter((item, j) => j !== index);
  };

  onDestroy(() => {
    console.log(rendition)
    rendition.off("selected", setRenderSelection);
  });
</script>

<div style="height: 100vh">
  <SvelteReader url="/svelte-reader/files/啼笑因缘.epub" {getRendition} />
</div>
<div class="selection">
  Selection:
  <ul>
    {#each selections as { text, cfiRange }, index}
      <li>
        {text || ""}
        <button on:click={() => rendition.display(cfiRange)}>show</button>
        <button on:click={() => remove(cfiRange, index)}>x</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .selection {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    z-index: 1;
    background-color: white;
    color: #000;
  }
</style>
