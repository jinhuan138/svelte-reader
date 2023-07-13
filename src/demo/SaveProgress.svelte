<script>
  import { SvelteReader } from "../modules/index";
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
    url="/svelte-reader/files/啼笑因缘.epub"
    {location}
    on:update:location={locationChange}
  />
</div>
