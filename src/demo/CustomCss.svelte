<script>
  import { SvelteReader } from "svelte-reader";

  const getRendition = (rendition) => {
    rendition.themes.register("custom", {
      "*": {
        color: "#fff",
        "background-color": "#252525",
      },
      image: {
        border: "1px solid red",
      },
      p: {
        "font-family": "Helvetica, sans-serif",
        "font-weight": "400",
        "font-size": "20px",
        border: "1px solid green",
      },
    });
    rendition.themes.select("custom");
  };
</script>

<div style="height: 100vh">
  <SvelteReader url="/svelte-reader/files/啼笑因缘.epub" {getRendition} />
</div>
