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
      url="/svelte-reader/files/啼笑因缘.epub"
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
