import { createI18n } from 'vue-i18n'

import hk from "./hk"
import cn from "./cn"
import en from "./en"

const i18n = createI18n({
    locale: localStorage.getItem('language') || 'hk',
    messages:{
        hk,
        cn,
        en,
    }
});
export default i18n;