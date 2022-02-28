import React from "react";
import NewMarket from './../components/NewMarket';
import MarketList from './../components/MarketList';
import {API,graphqlOperation} from 'aws-amplify';
import {searchMarkets} from '../graphql/queries';

class HomePage extends React.Component {
  state = {
    searchTerm: "",
    searchResults:[],
    isSearching:false
  };

  handleSearchChange = searchTerm =>this.setState({searchTerm});

  handleClearSearch = () => this.setState({searchTerm:'',searchResults:[]});

  handleSearch = async(event) =>{
    try {
      event.preventDefault()
      this.setState({isSearching:true})

     const result =  await API.graphql(graphqlOperation(searchMarkets,{
        filter:{
          or: [
            {name:{match:this.state.searchTerm}},
            {owner:{match:this.state.searchTerm}},
            {tags:{match:this.state.searchTerm}},
            ],
        },
          sort:{
            field:"createdAt",
            direction:"desc"
          }
      }))

      this.setState({
        searchResults:result.data.searchMarkets.items,
        isSearching:false
      })
      console.log(result)
    
    
    } catch (error) {
      console.log(error)
    }
   
  }

  render() {
    return (
      <>
       <NewMarket
       searchTerm={this.state.searchTerm}
       isSearching={this.state.isSearching}
       handleSearchChange={this.handleSearchChange}
       handleClearSearch={this.handleClearSearch}
       handleSearch={this.handleSearch}
       ></NewMarket>
       <MarketList
       searchResults={this.state.searchResults}
       ></MarketList>
      </>
    );
  }
}

export default HomePage;
