import React from 'react';
import AnthemsModal from './AnthemsModal';
import IndexesModal from './IndexesModal';
import HistoryModal from './HistoryModal';
import FavoritesModal from './FavoritesModal';
import MenuModal from './MenuModal';

const Modals = () => {
  return (
    <React.Fragment>
      <MenuModal />
      <AnthemsModal />
      <IndexesModal />
      <HistoryModal />
      <FavoritesModal />
    </React.Fragment>
  );
};

export default Modals;
