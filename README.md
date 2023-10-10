# Svelte Reader - an easy way to embed a ePub into your webapp
An svelte-reader for svelte powered by EpubJS

## Document
[document](https://jinhuan138.github.io/svelte-reader/docs/)

## Basic usage

```bash
npm install svelte-reader --save
```

And in your svelte-component...

```svelte
<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader url="/files/啼笑因缘.epub" />
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
  import { SvelteReader } from "svelte-reader";

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

<style>
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

## Change font-size

Hooking into epubJS rendition object is the key for this also.

```svelte
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
  <SvelteReader url="/files/啼笑因缘.epub" {getRendition} />
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
```

## Hightlight selection in epub

This shows how to hook into epubJS annotations object and let the user highlight selection and store this in a list where user can go to a selection or delete it.

```svelte
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
    rendition.off("selected", setRenderSelection);
  });
</script>

<div style="height: 100vh">
  <SvelteReader url="/files/啼笑因缘.epub" {getRendition} />
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
```

## Handling missing mime-types on server

EpubJS will try to parse the epub-file you pass to it, but if the server send wrong mine-types or the file does not contain `.epub` you can use the epubInitOptions prop to force reading it right.

```svelte
<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader url="/my-epub-service" epubInitOptions={{ openAs: "epub" }} />
</div>
```

## Display a scrolled epub-view

Pass options for this into epubJS in the prop `epubOptions`

```svelte
<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader
    url="/files/啼笑因缘.epub"
    epubOptions={{
      flow: "scrolled",
      manager: "continuous",
    }}
  />
</div>
```

## Enable opening links / running scripts inside epubjs iframe

Epubjs is rendering the epub-content inside and iframe which defaults to `sandbox="allow-same-origin"`, to enable opening links or running javascript in an epub, you will need to pass some extra params in the `epubOptions` prop.

```svelte
<script>
  import { SvelteReader } from "svelte-reader";
</script>

<div style="height: 100vh">
  <SvelteReader
    url="/files/啼笑因缘.epub"
    epubOptions={{
      allowPopups: true, // Adds `allow-popups` to sandbox-attribute
      allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
    }}
  />
</div>
```

## Get book information

```svelte
    <SvelteReader url='/files/啼笑因缘.epub' getRendition={getRendition}>
    </SvelteReader>

    {#if information}
    <div style='color: #000'>
        <img src={information.cover} alt={information.title} style="width: 100px">
        <p>标题:{information.title }</p>
        <p>作者:{ information.creator }</p>
        <p>出版社:{information.publisher }</p>
        <p>语言:{ information.language }</p>
        <p>出版日期:{ information.pubdate }</p>
        <p>修改日期:{ information.modified_date }</p>
        <p>介绍:{ information.description }</p>
    </div>
{/if}
    
<script>
import { SvelteReader } from "svelte-reader";
let information = null
const getRendition = (rendition) => {
    const book = rendition.book
    book.ready.then(() => {
        book.loaded.metadata.then(async (metadata) => {
            const cover = await book.coverUrl()
            information = { ...metadata, cover }
        })
    })
}
</script>
```

## Import file

```svelte
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
```

## Current progress

```svelte
<script>
  import { SvelteReader } from "svelte-reader";

  let current = 0;
  let rendition, book, displayed;

  const getRendition = (val) => {
    rendition = val;
    book = rendition.book;
    displayed = rendition.display();
    book.ready
      .then(() => {
        return book.locations.generate(1600);
      })
      .then((locations) => {
        // Wait for book to be rendered to get current page
        displayed.then(function () {
          // Get the current CFI
          var currentLocation = rendition.currentLocation();
          // Get the Percentage (or location) from that CFI
          const currentPage = book.locations.percentageFromCfi(
            currentLocation.start.cfi
          );
          current = currentPage;
        });
        rendition.on("relocated", (location) => {
          const percent = book.locations.percentageFromCfi(location.start.cfi);
          const percentage = Math.floor(percent * 100);
          current = percentage;
        });
      });
  };

  const change = (e) => {
    const value = e.target.value;
    current= value;
    var cfi = book.locations.cfiFromPercentage(value / 100);
    rendition.display(cfi);
  };
</script>

<div style="position: relative">
  <div style="height: 100vh">
    <SvelteReader
      getRendition={getRendition}
      url="/files/啼笑因缘.epub"
    />
  </div>
  <div class="progress">
    <input
      type="number"
      value={current}
      min={0}
      max={100}
      on:change={change}
    />%
    <input
      type="range"
      value={current}
      min={0}
      max={100}
      step={1}
      on:change={change}
    />
  </div>
</div>

<style>
  .progress {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    z-index: 1;
    color: #000;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .progress > input[type="number"] {
    text-align: center;
  }

  .progress > input[type="range"] {
    width: 100%;
  }
</style>
```

## Search in the book

```svelte
<script>
  import { SvelteReader } from "svelte-reader";
  let rendition = null;
  let searchText = "只在捻花一笑中";
  let searchResults = [];

  const search = async () => {
    if (!searchText) return (searchResults = []);
    const res = await doSearch(searchText);
    searchResults = res.slice(0, 5);
  };

  const doSearch = (value) => {
    const { book } = rendition;
    return Promise.all(
      book.spine.spineItems.map((item) => {
        return item.load(book.load.bind(book)).then((doc) => {
          const res = item.find(value);
          item.unload();
          return Promise.resolve(res);
        });
      })
    ).then((res) => Promise.resolve([].concat.apply([], res)));
  };

  const go = (href, e) => {
    rendition.display(href);
    e.stopPropagation();
    e.preventDefault();
  };
</script>

<div style="position: relative">
  <div style="height: 100vh">
    <SvelteReader
      url="/files/啼笑因缘.epub"
      getRendition={(val) => (rendition = val)}
    />
  </div>
  <div class="search">
    <input
      value={searchText}
      on:input={(e) => (searchText = e.target.value)}
      type="text"
      placeholder="search"
      on:keyup={(e) => e.key === "Enter" && search()}
    />
    <div class="searchResults">
      {#each searchResults as item, index}
        <div class="item" on:click={(e) => go(item.cfi, e)}>
            {@html item.excerpt.trim().replace(searchText, `<span style="color: orange">${searchText}</span>`)}
        </div>
      {/each}
      {#if !searchResults.length}
        <div>Empty</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .search {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    text-align: center;
    z-index: 1;
    color: #000;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search .searchResults {
    width: 200px;
  }

  .search .searchResults .item {
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #000;
  }

  .search .searchResults .item:hover {
    background: rgba(0, 0, 0, 0.05);
  }
</style>
```