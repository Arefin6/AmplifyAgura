import React from "react";
import "./App.css";
import {Auth,Hub} from 'aws-amplify';
import {Authenticator,AmplifyTheme}from 'aws-amplify-react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import Navbar from './components/Navbar';

class App extends React.Component {
  state = {
    user:null
  };

  componentDidMount(){
     this.getUserData();
     Hub.listen('auth',this,'onHubCapsule')
  }



  getUserData =  async () =>{
     const user = await Auth.currentAuthenticatedUser();
     user ? this.setState({user}) : this.setState({user:null}) 
  }

  handleSignOut =  async () =>{
     await Auth.signOut();
 }

  onHubCapsule = capsule =>{

    switch(capsule.payload.event){
      case "signIn":
        console.log('sigined in')
        this.getUserData()
        break;
      case "signUp":
        console.log('signed Up')
        break;
      case "signOut":
        console.log("signed Out")
        this.setState({user:null})
        break;
      default:
        return 

    }
  }

  render() {
    const {user} = this.state
    return !user ?(
       <Authenticator theme={theme}/>   
    ):(
      <Router>
        <>
         {/* navigation */}
          <Navbar user={user} handleSignOut={this.handleSignOut} />
        {/* {Routes} */}
         <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route  path="/profile" component={ProfilePage} />
            <Route exact path="/markets/:marketId" component={({match})=><MarketPage marketId = {match.params.marketId}/>} />
            
         </div>

        </>
      </Router>
    )
  }
}
const theme ={
  ...AmplifyTheme
}

// export default withAuthenticator(App,true,[],null,theme);

export default App;
