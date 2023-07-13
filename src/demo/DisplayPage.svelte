<script>
  import { SvelteReader } from "../modules/index";

  let rendition = null,
    toc = [];
  let page = "";
  const getRendition = (val) => (rendition = val);

  const getLabel = (toc, href) => {
    console.log(toc)
    let label = "n/a";
    toc.some((item) => {
      if (item.subitems.length > 0) {
        const subChapter = getLabel(item.subitems, href);
        if (subChapter !== "n/a") {
          label = subChapter;
          return true;
        }
      } else if (item.href.includes(href)) {
        label = item.label;
        return true;
      }
    });
    return label;
  };
  const locationChange = (e) => {
    console.log(e.detail)
    const epubcifi= e.detail
    if (epubcifi) {
      const { displayed, href } = rendition.location.start;
      if (href !== "titlepage.xhtml") {
        const label = getLabel(toc, href);
        page = `${displayed.page}/${displayed.total} ${label}`;
      }
    }
  };
</script>

<div style="height: 100vh">
  <SvelteReader
    url="/svelte-reader/files/啼笑因缘.epub"
    {getRendition}
    tocChanged={val=>toc = val}
    on:update:location={locationChange}
  />
</div>
<div class="page">
  { page }
</div>

<style scoped>
  .page {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: center;
    z-index: 1;
    color: #000;
  }
</style>
