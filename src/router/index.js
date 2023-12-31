
import { wrap } from 'svelte-spa-router/wrap'

export default {
    '/': wrap({ asyncComponent: () => import('@/demo/index.svelte') }),
    '/basic-usage': wrap({ asyncComponent: () => import('@/demo/BasicUsage.svelte') }),
    '/save-progress': wrap({ asyncComponent: () => import('@/demo/SaveProgress.svelte') }),
    '/display-page': wrap({ asyncComponent: () => import('@/demo/DisplayPage.svelte') }),
    '/change-font-size': wrap({ asyncComponent: () => import('@/demo/ChangeFontSize.svelte') }),
    '/custom-css': wrap({ asyncComponent: () => import('@/demo/CustomCss.svelte') }),
    '/hightlight': wrap({ asyncComponent: () => import('@/demo/Hightlight.svelte') }),
    '/display-scrolled': wrap({ asyncComponent: () => import('@/demo/DisplayScrolled.svelte') }),
    '/enable-opening-links': wrap({ asyncComponent: () => import('@/demo/EnableOpeningLinks.svelte') }),
    '/speak-text': wrap({ asyncComponent: () => import('@/demo/SpeakText.svelte') }),
    '/get-information': wrap({ asyncComponent: () => import('@/demo/GetInformation.svelte') }),
    '/import-file': wrap({ asyncComponent: () => import('@/demo/ImportFile.svelte') }),
    '/current-progress': wrap({ asyncComponent: () => import('@/demo/CurrentProgress.svelte') }),
    '/search-book': wrap({ asyncComponent: () => import('@/demo/Search.svelte') }),
}