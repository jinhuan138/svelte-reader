    <SvelteReader url='/svelte-reader/files/啼笑因缘.epub' getRendition={getRendition}>
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