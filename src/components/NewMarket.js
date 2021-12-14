import React from "react";
// prettier-ignore
 import { Form, Button, Dialog, Input, Select, Notification } from 'element-react';

class NewMarket extends React.Component {
  state = {
    name:"",
    addMarketDialog:false
  };

  handleAddToMarket = () =>{
    console.log(this.state.name);
  }

  render() {
    return (
      <>
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
                onChange={name => this.setState({name})}
               />
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
           onClick={this.handleAddToMarket}
          >
            Add
          </Button>
        </Dialog.Footer>        
       </Dialog>
      </>
    )
  }
}

export default NewMarket;
