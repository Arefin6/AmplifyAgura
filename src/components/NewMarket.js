/* eslint-disable no-template-curly-in-string */
import React from "react";
// prettier-ignore
 import { Form, Button, Dialog, Input, Notification, Select } from 'element-react';
 import {API,graphqlOperation} from 'aws-amplify';
import { createMarket } from '../graphql/mutations';
import { UserContext } from "../App";

class NewMarket extends React.Component {
  state = {
    name:"",
    tags:["Sports","Arts","Technology","Web dev"],
    selectedTags:[],
    options:[],
    addMarketDialog:false
  };
  handleFilterTags = query =>{
     const options = this.state.tags
       .map(tag => ({value:tag,label:tag}))
       .filter(tag => tag.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
       this.setState({options})
  }

  handleAddToMarket = async (user) =>{
    try{
    this.setState({addMarketDialog:false})
    const input ={
      name:this.state.name,
      owner:user.username,
      tags:this.state.selectedTags
    }
    const result = await API.graphql(graphqlOperation(createMarket,{input}));
    console.info(`Created market: id ${result.data.createMarket.id}`)
    console.log(result)
    this.setState({name : "", selectedTags:[] });
  }
   catch(err){
    console.log(err) 
    Notification.error({
      title:"Error",
      message:`${err.message || "Error Adding TO market"}`
    })
   }
  }

  render() {
    return (
      <UserContext.Consumer>
      {({user}) =><> 
       <div className="market-header">
         <h1 className="market-title">
           Create Your Market Place 
           <Button
            type="text" icon="edit"
            onClick={()=>this.setState({addMarketDialog:true})}
            className="market-title-button"
           /> 
          
         </h1>
       </div>
       
       <Dialog
        title="Create New Market"
        visible={this.state.addMarketDialog}
        onCancel={()=>this.setState({addMarketDialog:false})}
        size="large"
        customClass="dialog"
       >
        <Dialog.Body>
          <Form labelPosition="top">
            <Form.Item label="Add Market Name">
               <Input
                placeholder="Market Name"
                trim={true}
                value={this.state.name}
                onChange={name => this.setState({name})}
               />
            </Form.Item>
            <Form.Item label="Add Tags">
               <Select
                multiple={true}
                placeholder="Select Tags"
                filterable={true}
                onChange={selectedTags => this.setState({selectedTags})}
                remoteMethod={this.handleFilterTags}
                remote={true}
               >
               {this.state.options.map(option =>(
                 <Select.Option
                 key={option.value}
                 option={option.label}
                 value={option.value}
                 />
               ))}
              </Select> 
            </Form.Item>
          </Form>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={()=> this.setState({addMarketDialog:false})}>
            Cancel
          </Button>
          <Button
           type="primary"
           disabled={!this.state.name}
           onClick={() =>this.handleAddToMarket(user)}
          >
            Add
          </Button>
        </Dialog.Footer>        
       </Dialog>
       </>}
      </UserContext.Consumer>
    )
  }
}

export default NewMarket;
