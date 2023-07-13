# Svelte Reader - an easy way to embed a ePub into your webapp
An svelte-reader for svelte powered by EpubJS

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

## SvelteReader Attributes

| **Name** | **Description**         | **Type**               | **Default** |
| -------- | ----------------------- | ---------------------- | ----------- |
| url      | book url or arrayBuffer | `string`/`ArrayBuffer` |— |
| title    | the title of the book   | `string`               | —           |
| showToc  | whether to show the toc | `boolean`              | true        |

## SvelteReader Slots

| **Name** | **Description**                                              |
| -------- | ------------------------------------------------------------ |
| title    | You have access to title by [slot](https://svelte.dev/docs/special-elements) |

## SvelteReader props passed to inner EpubView

## EpubView Attributes

| **Name**           | **Description**                                              | **Type**                      | **Default** |
| ------------------ | ------------------------------------------------------------ | ----------------------------- | ----------- |
| url                | the path or arrayBuffer of the book                          | `string`/`ArrayBuffer`        | —           |
| location           | set / update location of the epub                            | `string`/`number`             | —           |
| tocChanged         | when the reader has parsed the book you will receive an array of the chapters | `function(toc)`               | —           |
| handleKeyPress     | when press the key                                           | `function(event)`             |             |
| handleTextSelected | when select text                                             | `function(cfiRange,contents)` |             |
| epubInitOptions    | pass custom properties to the epub init function, see [epub.js](http://epubjs.org/documentation/0.3/#epub) | `object`                      | —           |
| epubOptions        | pass custom properties to the epub rendition, see [epub.js's book.renderTo function](http://epubjs.org/documentation/0.3/#rendition) | `object`                      | —           |
| getRendition       | when epubjs has rendered the epub-file you can get access to the epubjs-rendition object here | `function(rendition)`         | —           |

## EpubView Events

| **Name**        | **Description**                                              | **Parameters**       |
| --------------- | ------------------------------------------------------------ | -------------------- |
| update:location | a function that receives the current location while user is reading. This function is called everytime the page changes, and also when it first renders. | the updated location |

## EpubView  Slots

| **Name**    | **Description**       |
| ----------- | --------------------- |
| loadingView | epub view loadingView |

## EpubView Exposes

| **Name**    | **Description**        | **Type**         |
| ----------- | ---------------------- | ---------------- |
| nextPage    | display  next page     | `function`       |
| prevPage    | display  previous page | `function`       |
| setLocation | Set the page           | `function(href)` |

## Recipes and tips

## Save and retrieve progress from storage

Saving the current page on storage is pretty simple, but we need to keep in mind that `locationChanged` also gets called on the very first render of our app.

```svelte
<script>
  import { SvelteReader} from "svelte-reader";
  let location = localStorage.getItem("book-progress") || null;
  let firstRenderDone = false;
  const locationChange = (e) => {
    const epubcifi = e.detail;
    // Since this function is also called on initial rendering, we are using custom state
    // logic to check if this is the initial render.
    // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

    if (!firstRenderDone) {
      location = localStorage.getItem("book-progress");
      return (firstRenderDone = true);
    }
    // This is the code that runs everytime the page changes, after the initial render.
    // Saving the current epubcifi on storage...
    localStorage.setItem("book-progress", epubcifi);
    // And then rendering it.
    location = epubcifi; // Or setLocation(localStorage.getItem("book-progress"))
  };
</script>

<div style="height: 100vh">
  <SvelteReader
    url="/files/啼笑因缘.epub"
    {location}
    on:update:location={locationChange}
  />
</div>
```

## Display page number for current chapter

We store the epubjs rendition in a ref, and get the page numbers in the callback when location is changed. Note that in this example we also find them name of the current chapter from the toc. Also see limitation for pagination for the whole book.

```svelte
<script>
  import { SvelteReader } from "svelte-reader";

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
    url="/files/啼笑因缘.epub"
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
```