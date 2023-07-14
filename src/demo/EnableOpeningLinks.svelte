<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader
    url="/svelte-reader/files/啼笑因缘.epub"
    epubOptions={{
      allowPopups: true, // Adds `allow-popups` to sandbox-attribute
      allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
    }}
  />
</div>
