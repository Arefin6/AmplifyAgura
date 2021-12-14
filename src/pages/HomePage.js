import React from "react";
import NewMarket from './../components/NewMarket';
import MarketList from './../components/MarketList';

class HomePage extends React.Component {
  state = {};

  render() {
    return (
      <>
       <NewMarket></NewMarket>
       <MarketList></MarketList>
      </>
    );
  }
}

export default HomePage;
