<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import EpubView from "../EpubView/EpubView.svelte";

  const dispatch = createEventDispatcher();

  export let showToc = true;
  export let url = "";
  export let title = "";

  let bookName = "",
    tocChanged,
    getRendition;
  let expandedToc = false;
  let currentLocation = null;
  let epubRef = null;
  let toc = [];

  const onGetRendition = (rendition) => {
    getRendition && getRendition(rendition);
    rendition.on("relocated", (location) => {
      currentLocation = location;
    });
    const book = rendition.book;
    book.ready.then(() => {
      const meta = book.package.metadata;
      bookName = meta.title;
    });
  };

  const toggleToc = () => {
    expandedToc = !expandedToc;
  };

  const setLocation = (href: string | number) => {
    epubRef?.setLocation(href);
    expandedToc = false;
  };

  const pre = () => {
    epubRef.prevPage();
  };

  const next = () => {
    epubRef.nextPage();
  };

  const onTocChange = (_toc) => {
    toc = _toc.map((i) => ({ ...i, expansion: false }));
    tocChanged && tocChanged(_toc);
  };
</script>

<div class="container">
  <div class="readerArea" class:containerExpanded={expandedToc}>
    <!--展开目录 -->
    {#if showToc}
      <button
        class="tocButton"
        class:tocButtonExpanded={expandedToc}
        type="button"
        on:click={toggleToc}
      >
        <span class="tocButtonBar" style="top: 35%" />
        <span class="tocButtonBar" style="top: 66%" />
      </button>
    {/if}

    <!-- 书名 -->
    <slot name="title">
      <div class="titleArea">{title || bookName}</div>
    </slot>
    <!-- 阅读 -->
    <EpubView
      bind:this={epubRef}
      {url}
      tocChanged={onTocChange}
      getRendition={onGetRendition}
      {...$$props}
      on:update:location={(e) => dispatch("update:location", e.detail)}
    >
      <slot name="loadingView" />
    </EpubView>
    <!-- 翻页 -->
    <button
      class="arrow pre"
      on:click={pre}
      disabled={currentLocation?.atStart}
    >
      ‹
    </button>
    <button
      class="arrow next"
      on:click={next}
      disabled={currentLocation?.atEnd}
    >
      ›
    </button>
  </div>
  <!-- 目录 -->
  {#if showToc}
    <div class="tocArea">
      {#each toc as item, index}
        <div>
          <button
            type="button"
            on:click={() => setLocation(item.href)}
            class="tocAreaButton"
            class:active={currentLocation &&
              item.href.includes(currentLocation.start.href)}
          >
            {item.label}
            <!-- 展开 -->
            {#if item.subitems && item.subitems.length > 0}
              <div
                class="expansion"
                style="transform: {item.expansion
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)'} "
                on:click|stopPropagation={(e) =>
                  (item.expansion = !item.expansion)}
              />
            {/if}
          </button>
          <!-- 二级目录 -->
          {#if item.subitems && item.subitems.length > 0}
            <div style="display:{item.expansion ? 'none' : ''}">
              {#each item.subitems as subitem, index}
                <button
                  type="button"
                  class="tocAreaButton"
                  on:click={() => setLocation(subitem["href"])}
                  class:active={currentLocation &&
                    subitem["href"].includes(currentLocation.start.href)}
                >
                  {" ".repeat(4) + subitem["label"]}
                </button>{/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    {#if expandedToc}
      <div class="tocBackground" on:click={toggleToc} />
    {/if}
  {/if}
</div>

<style>
  /* container */
  .container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .containerExpanded {
    transform: translateX(256px);
  }

  .readerArea {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    background-color: #fff;
    transition: all 0.3s ease;
  }

  .titleArea {
    position: absolute;
    top: 20px;
    left: 50px;
    right: 50px;
    text-align: center;
    color: #999;
  }

  /* toc */
  .tocBackground {
    position: absolute;
    left: 256px;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .tocArea {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    width: 256px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #f2f2f2;
    padding: 10px 0;
  }

  /* 滚动条 */
  .tocArea::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .tocArea::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }

  .tocArea .tocAreaButton {
    user-select: none;
    appearance: none;
    background: none;
    border: none;
    display: block;
    font-family: sans-serif;
    width: 100%;
    font-size: 0.9em;
    text-align: left;
    padding: 0.9em 1em;
    border-bottom: 1px solid #ddd;
    color: #aaa;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    position: relative;
  }

  .tocArea .tocAreaButton:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .tocArea .tocAreaButton:active {
    background: rgba(0, 0, 0, 0.1);
  }

  .tocArea .active {
    color: #1565c0;
    border-bottom: 2px solid #1565c0;
  }

  /* 二级目录 */
  .tocArea .tocAreaButton .expansion {
    position: absolute;
    cursor: pointer;
    right: 12px;
    top: 50%;
    margin-top: -12px;
  }

  .tocArea .tocAreaButton .expansion::after {
    border-style: solid;
    border-width: 0 2px 2px 0;
    content: "";
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    vertical-align: middle;
  }

  /* tocButton */
  .tocButton {
    background: none;
    border: none;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .tocButtonBar {
    position: absolute;
    width: 60%;
    background: #ccc;
    height: 2px;
    left: 50%;
    margin: -1px -30%;
    top: 50%;
    transition: all 0.5s ease;
  }

  .tocButtonExpanded {
    background: #f2f2f2;
  }

  /* 翻页 */
  .arrow {
    outline: none;
    border: none;
    background: none;
    position: absolute;
    top: 50%;
    margin-top: -32px;
    font-size: 64px;
    padding: 0 10px;
    color: #e2e2e2;
    font-family: arial, sans-serif;
    cursor: pointer;
    user-select: none;
    appearance: none;
    font-weight: normal;
  }

  .arrow:hover {
    color: #777;
  }

  .arrow:disabled {
    cursor: not-allowed;
    color: #e2e2e2;
  }

  .pre {
    left: 1px;
  }

  .next {
    right: 1px;
  }

  /* loading */
  .loadingView {
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    color: #ccc;
    text-align: center;
    margin-top: -0.5em;
  }
</style>
