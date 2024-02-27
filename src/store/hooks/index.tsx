import {ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from '../';
import {anthemActions} from '../slices/anthemSlice';
import {configActions} from '../slices/configSlice';
import {navigationActions} from '../slices/navigationSlice';
import {IAnthem, normalize} from '../../utils';
import lodash from 'lodash';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useNavigationHooks = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppSelector(state => state.navigation);

  return {
    getState: () => {
      return navigation;
    },
    navigateTo: (screen: string, params: any) => {
      dispatch(
        navigationActions.navigateTo({
          name: screen,
          params,
        }),
      );
    },
    navigateBack: () => {
      dispatch(navigationActions.navigateBack());
    },
    navigateReset: () => {
      dispatch(navigationActions.navigateReset());
    },
    isScreenOpen: (screen: string) => {
      return navigation.screens.current?.name === screen;
    },
    currentScreen: () => {
      return navigation.screens.current;
    },
    canGoBack: () => {
      return navigation.screens.history.length > 1;
    },
    setScreenParams: (params: any) => {
      dispatch(navigationActions.setScreenParams(params));
    },
    openModal: (modal: string, params?: any) => {
      dispatch(navigationActions.modalOpen({name: modal, params}));
    },
    closeModal: () => {
      dispatch(navigationActions.modalBack());
    },
    clearModals: () => {
      dispatch(navigationActions.modalReset());
    },
    isModalOpen: (modal: string) => {
      return navigation.modals.current?.name === modal;
    },
    currentModal: () => {
      return navigation.modals.current;
    },
    canGoModalBack: () => {
      return navigation.modals.history.length > 1;
    },
    setModalParams: (params: any) => {
      dispatch(navigationActions.setModalParams(params));
    },
    isKeyboardVisible: () => {
      return navigation.isKeyboardVisible;
    },
    getSearchParams: () => {
      return navigation.search;
    },
    setSearchQuery: (query: string) => {
      dispatch(navigationActions.setSearchQuery(query));
    },
    setSearchVisible: (visible: boolean) => {
      dispatch(navigationActions.setSearchVisible(visible));
    },
    setSearchTyping: (typing: boolean) => {
      dispatch(navigationActions.setSearchTyping(typing));
    },
    searchReset: () => {
      dispatch(navigationActions.searchReset());
    },
  };
};

export const useConfigHooks = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector(state => state.config);

  return {
    getState: () => {
      return config;
    },
    setFontSize: (size: number) => {
      dispatch(configActions.setFontSize(size));
    },
    getFontSize: () => {
      return {
        current: config.fontSize,
        min: config.minFontSize,
        max: config.maxFontSize,
      };
    },
  };
};

export const useAnthemHooks = () => {
  const dispatch = useAppDispatch();
  const anthem = useAppSelector(state => state.anthem);
  const first = lodash.minBy(anthem.anthems, 'number');
  const last = lodash.maxBy(anthem.anthems, 'number');
  const isFavorite = anthem.favorites.includes(anthem.current?.number || 0);
  const searchQuery = useAppSelector(state => state.navigation.search.query);
  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return {
    getState: () => {
      return anthem;
    },
    removeCurrent: () => {
      dispatch(anthemActions.removeCurrentAnthem());
    },
    setCurrent: (number: number) => {
      const newAnthem = anthem.anthems.find(a => a.number === number);
      dispatch(anthemActions.setCurrentAnthem(newAnthem));
    },
    getCurrent: () => {
      return anthem.current;
    },
    setRandom: () => {
      const random = lodash.sample(anthem.anthems);
      dispatch(anthemActions.setCurrentAnthem(random));
    },
    getAll: () => {
      return anthem.anthems;
    },
    find: (number: number) => {
      return anthem.anthems.find(a => a.number === number);
    },
    findAll: (numbers: number[]) => {
      return anthem.anthems.filter(a => numbers.includes(a.number));
    },
    toggleFavorite: () => {
      if (!anthem.current) {
        return;
      }

      showToast(
        isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      );
      dispatch(anthemActions.toggleFavorite());
    },
    getFavorites: () => {
      return lodash.orderBy(
        anthem.favorites.map(id => anthem.anthems.find(a => a.number === id)),
        ['number'],
        ['asc'],
      ) as IAnthem[];
    },
    currentIsFavorite: () => {
      return anthem.current
        ? anthem.favorites.includes(anthem.current.number)
        : false;
    },
    currentIsFirst: () => {
      return anthem.current ? anthem.current.number === first?.number : false;
    },
    currentIsLast: () => {
      return anthem.current ? anthem.current.number === last?.number : false;
    },
    currentAudioURL: () => {
      const currentNumber = anthem.current?.number.toString();
      if (!currentNumber) {
        return null;
      }
      return `https://harpa.nyc3.digitaloceanspaces.com/${lodash.padStart(
        currentNumber,
        3,
        '0',
      )}.mp3`;
    },
    next: () => {
      const next = anthem.current ? anthem.current.number + 1 : first?.number;

      dispatch(
        anthemActions.setCurrentAnthem(
          anthem.anthems.find(a => a.number === next) || first,
        ),
      );
    },
    previous: () => {
      const previous = anthem.current
        ? anthem.current.number - 1
        : last?.number;

      dispatch(
        anthemActions.setCurrentAnthem(
          anthem.anthems.find(a => a.number === previous) || last,
        ),
      );
    },
    getHistory: () => {
      return lodash.orderBy(
        anthem.history.map(({id}) => anthem.anthems.find(a => a.number === id)),
        ['at'],
        ['desc'],
      ) as IAnthem[];
    },
    getSearchResults: () => {
      let results = anthem.anthems;
      const normalizedQuery = normalize(searchQuery);
      if (normalizedQuery.length > 0) {
        results = results.filter(({number, title}) => {
          return (
            number === parseInt(normalizedQuery, 10) ||
            number.toString().includes(normalizedQuery) ||
            normalize(title)
              .toLowerCase()
              .includes(normalizedQuery.toLowerCase())
          );
        });
      }
      return results;
    },
  };
};
