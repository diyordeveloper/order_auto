import i18n from 'i18n-js';
import en from "./en"
import ru from "./ru"
import store from "../redux/index";
i18n.fallbacks = true;
i18n.translation = {
  ru,
  en,
};
i18n.locale = store.getState().auth.lang;
export default i18n;