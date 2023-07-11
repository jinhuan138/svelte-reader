<script lang="ts">
  import { onMount } from "svelte";
  import ePub, { Book, Rendition, Contents } from "epubjs";
  import {
    clickListener,
    swipListener,
    wheelListener,
    keyListener,
  } from "../utils/listener/listener";

  export let url = "";
  export let getRendition;
  export let location;
  export let tocChanged;
  export let handleTextSelected;
  export let handleKeyPress;
  export let epubInitOptions = {};
  export let epubOptions = {};

  let book: null | Book = null,
    rendition: null | Rendition = null,
    viewer = null;

  let isLoaded = false;
  let toc = [];

  const initBook = () => {
    if (book) book.destroy();
    if (url) book = ePub(url, epubInitOptions);
    book!.loaded.navigation.then(({ toc: _toc }) => {
      isLoaded = true;
      toc = _toc;
      tocChanged && tocChanged(_toc);
      initReader();
    });
  };

  const initReader = () => {
    rendition = book!.renderTo(viewer as HTMLDivElement, {
      width: "100%",
      height: "100%",
      ...epubOptions,
    });
    registerEvents();
    getRendition && getRendition(rendition);
    if (typeof location === "string") {
      rendition.display(location);
    } else if (typeof location?.value === "number") {
      rendition.display(location.value);
    } else if (toc.length > 0 && toc[0]?.href) {
      rendition.display(toc[0].href);
    } else {
      rendition.display();
    }
  };

  const onLocationChange = (loc: Rendition["location"]) => {
    //监听翻页
    const newLocation = loc && loc.start;
    if (location?.value !== newLocation) {
      // emit("update:location", newLocation);
    }
  };

  const flipPage = (direction: string) => {
    if (direction === "next") nextPage();
    else if (direction === "prev") prevPage();
  };

  const registerEvents = () => {
    if (rendition) {
      rendition.on("rendered", (e: Event, iframe: any) => {
        iframe?.iframe?.contentWindow.focus();
        // clickListener(iframe?.document, rendition as Rendition, flipPage);
        // selectListener(iframe.document, rendition, toggleBuble);
        if (!epubOptions?.flow?.includes("scrolled"))
          wheelListener(iframe.document, flipPage);
        swipListener(iframe.document, flipPage);
        keyListener(iframe.document, flipPage);
      });
      rendition.on("locationChanged", onLocationChange);
      rendition.on("displayError", () => console.error("error rendering book"));
      if (handleTextSelected) {
        rendition.on("selected", handleTextSelected);
      }
      if (handleKeyPress) {
        rendition.on("selected", handleKeyPress);
      }
    }
  };

  export const nextPage = () => {
    rendition?.next();
  };

  export const prevPage = () => {
    rendition?.prev();
  };

  export const setLocation = (href: number | string) => {
    if (typeof href === "string") rendition!.display(href);
    if (typeof href === "number") rendition!.display(href);
  };

  $: {
    if (url) initBook();
  }

  onMount(() => {
    initBook();
  });
</script>

<div class="reader">
  <div class="viewHolder">
    <div
      bind:this={viewer}
      id="viewer"
      style="display:{isLoaded ? 'hidden' : ''}"
    />
    {#if isLoaded}
      <div>
        <slot name="loadingView" />
      </div>
    {/if}
  </div>
</div>

<style>
  .reader {
    position: absolute;
    inset: 50px 50px 20px;
  }

  .viewHolder {
    height: 100%;
    width: 100%;
    position: relative;
  }

  #viewer {
    height: 100%;
  }
</style>
