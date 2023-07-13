
import { wrap } from 'svelte-spa-router/wrap'

export default {
    '/': wrap({ asyncComponent: () => import('@/demo/index.svelte') }),
    '/basic-usage': wrap({ asyncComponent: () => import('@/demo/BasicUsage.svelte') }),
    '/save-progress': wrap({ asyncComponent: () => import('@/demo/SaveProgress.svelte') }),
    '/display-page': wrap({ asyncComponent: () => import('@/demo/DisplayPage.svelte') }),
}