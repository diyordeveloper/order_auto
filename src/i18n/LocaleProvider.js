import * as React from 'react';
import {useSelector} from 'react-redux';
import i18n from "i18n-js";
import { en, ru } from "./export";
import { getLanguage } from '../service';
import { useEffect } from 'react';
import { actionUser } from '../utils/constant';

i18n.fallbacks = true;
i18n.translations = {en, ru,};

export const LocalizationContext = React.createContext();

export const LocaleProvider = props => {
  const lc = useSelector(state => state?.auth?.lang);
  const [locale, setLocale] = React.useState(lc);
  useEffect(()=>{
    getLanguage().then(e => {
      setLocale(e)
      dispatch({
          type: actionUser.ACTION_AUTH_LANG,
          payload: e
      })
  })
  },[])
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),

    [locale],
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

export const useTheme = () => React.useContext(LocalizationContext);
