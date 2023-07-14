<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader url="/my-epub-service" epubInitOptions={{ openAs: "epub" }} />
</div>
