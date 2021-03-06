import React from "react";
import "./App.css";
import { Auth, Hub, graphqlOperation, API } from 'aws-amplify';
import {Authenticator,AmplifyTheme}from 'aws-amplify-react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import MarketPage from './pages/MarketPage';
import Navbar from './components/Navbar';
import { getUser } from "./graphql/queries";
import { registerUser } from "./graphql/mutations";


export const UserContext = React.createContext()

class App extends React.Component {
  state = {
    user:null,
    userAttributes: null
  };

  componentDidMount(){
     this.getUserData();
     Hub.listen('auth',this,'onHubCapsule')
    
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user
      ? this.setState({ user }, () => this.getUserAttributes(this.state.user))
      : this.setState({ user: null });
  };

  getUserAttributes = async authUserData => {
    const attributesArr = await Auth.userAttributes(authUserData);
    const attributesObj = Auth.attributesToObject(attributesArr);
    this.setState({ userAttributes: attributesObj });
  };

  handleSignOut =  async () =>{
    try {
      await Auth.signOut();
      window.location.href ='/';
    } catch (error) {
      console.log(error)
    } 
   
 }
  onHubCapsule = capsule =>{

    switch(capsule.payload.event){
      case "signIn":
        console.log('sigined in')
        this.getUserData()
        this.registerNewUSer(capsule.payload.data)
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

  registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    };
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput));
    // if we can't get a user (meaning the user hasn't been registered before), then we execute registerUser
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        };
        const newUser = await API.graphql(
          graphqlOperation(registerUser, { input: registerUserInput })
        );
        console.log({ newUser });
      } catch (err) {
        console.error("Error registering new user", err);
      }
    }
  };

  render() {
    const {user,userAttributes} = this.state

    return !user ?(
       <Authenticator theme={theme}/>   
    ):(
      <UserContext.Provider value={{user,userAttributes}} >
      <Router>
        <>
         {/* navigation */}
          <Navbar user={user} handleSignOut={this.handleSignOut} />
        {/* {Routes} */}
         <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route  path="/profile" component={ProfilePage} />
            <Route exact path="/markets/:marketId" component={({match})=><MarketPage user={user}
            userAttributes={userAttributes}
            marketId = {match.params.marketId}/>} />
         </div>
        </>
      </Router>
      </UserContext.Provider>
    )
  }
}
const theme ={
  ...AmplifyTheme
}

// export default withAuthenticator(App,true,[],null,theme);

export default App;
