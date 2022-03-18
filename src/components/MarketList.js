import React from "react";
 import { Loading, Card, Tag, Icon } from "element-react";
import {Connect} from 'aws-amplify-react';
import {API,graphqlOperation } from "aws-amplify";
import {listMarkets} from '../graphql/queries';
import {onCreateMarket} from '../graphql/subscriptions';
import  Error from './Error';
import { Link } from "react-router-dom";



const MarketList = ({searchResults}) => {

    //  const [marketList,setListMarket] = useState([]);

  
   const onNewMarket = (prevQuery,newData) =>{
     
    let updatedQuery = {...prevQuery};

    const updatedMarketList = [
      newData.onCreateMarket,
      ...prevQuery.listMarkets.items
    ]
    updatedQuery.listMarkets.item = updatedMarketList;
     
    return updatedQuery;
   }

 


   let fetchMarketList = async () => {
   
    const createdTodo = await API.graphql({
      query: listMarkets,
      authMode: 'API_KEY'
    });
    console.log(createdTodo)
   }

   fetchMarketList()

   

  return(
        <Connect 
          query={graphqlOperation(listMarkets)}
          subscription={graphqlOperation(onCreateMarket)}
          onSubscriptionMsg={onNewMarket}
        >
         {({data,loading,errors})=>{
           if(errors.length>0)return <Error errors={errors}/>
           if(loading || !data.listMarkets)return <Loading fullscreen={true}/>
           const markets = searchResults.length>0 ?searchResults : data.listMarkets.items;
           return(
            <> 
             {
               searchResults.length >0 ?(
                 <h2 className="text-green">
                   <Icon type="success" name="check" className="icon"/>
                   {searchResults.length} Results
                 </h2>):(
                    <h2 className="header">
                     <i className="fa fa-chart-mixed"></i>
                     Markets
                  </h2>
                 )
             }
            
  
            {markets.map(market =>(
                
                <div key={market.id} className="my-2">
                     <Card
                      bodyStyle={{
                         padding:'0.7rem',
                         display:'flex',
                         alignItems:'center',
                         justifyContent:'space-between'
                      }}
                     
                     >
                      <div>
                         
                         <span className="flex">
                           <Link className="link" to={`/markets/${market.id}`}>
                              {market.name}
                           </Link>
                           <span style={{color:'var(--darkAmazonOrange)'}}>
                             {market.products.items}
                           </span>
                           <i class="fas-fa fa-cart-circle-check"></i>
                            
                         </span>
                           <div style={{color:"var(--lightSquidInk)"}}>
                             {market.owner}
                           </div>
                           </div> 
                           <div>
                           {market.tags && market.tags.map(tag =>(
                              <Tag key={tag} type="danger" className="mx-1">
                                {tag}
                              </Tag>
                           ))}
                           </div>
                           
                     </Card>
                </div>     
             ))}
            </> 
           )
         }}
        </Connect>);
};

export default MarketList;
