# Svelte Reader - an easy way to embed a ePub into your webapp
An vue-reader for svelte powered by EpubJS


## Basic usage

```bash
npm install svelte-reader --save
```

And in your svelte-component...

```svelte
<script>
  import { SvelteReader} from "svelte-reader";
</script>
<div style='height: 100vh'>
    <SvelteReader url='/files/啼笑因缘.epub'/>
</div>
```



