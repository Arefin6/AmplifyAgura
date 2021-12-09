import React from "react";
import "./App.css";
import {Auth,Hub} from 'aws-amplify';
import {Authenticator,AmplifyTheme}from 'aws-amplify-react';

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
    ):<div>App</div>;
  }
}
const theme ={
  ...AmplifyTheme
}

// export default withAuthenticator(App,true,[],null,theme);

export default App;
