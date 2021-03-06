import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import CardDrink from '../components/CardDrink';
import { searchDrink } from '../services/TheCockTailDBAPI';
import CategoryBtns from '../components/CategoryBtns';

function Drinks() {
  const { data, setData } = useContext(MyContext);
  const doze = 12;

  const handleDrink = async () => {
    if (!data.searchResult.length || data.typePage !== 'drinks') {
      const { drinks } = await searchDrink('search', 's', '');
      setData({ searchResult: [...drinks], typePage: 'drinks' });
    }
  };

  useEffect(() => {
    handleDrink();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main_container">
      <Header title="Drinks" existeButton="true" />
      <CategoryBtns page="drinks" />
      <div className="drink_container">
        {
          data.searchResult.map((element, i) => (
            (i < doze) && (
              <CardDrink element={ element } i={ i } key={ element.idDrink } />
            )
          ))
        }
      </div>
      <Footer existeFooter="true" />
    </div>
  );
}

export default Drinks;
