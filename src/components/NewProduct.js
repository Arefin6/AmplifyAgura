import React from "react";
// prettier-ignore
 import { Form, Button, Input, Notification, Radio, Progress } from "element-react";
import { PhotoPicker } from "aws-amplify-react";

class NewProduct extends React.Component {
  state = {
    description:'',
    price:'',
    shipped:false
  };

  handleAddProduct= ()=>{
   console.log("Product Kintam");
  }

  render() {
    return (
    <div className="flex-center">
        <h2 className="header">Add New Product</h2>
        <div>
           <Form className="market-header">
              <Form.Item label="Add Product Description">
                 <Input
                  type="text"
                  icon="information"
                  placeholder="description"
                  onChange={description => this.setState({description})}
                 />
              </Form.Item>
              <Form.Item label="Set Product Price">
                 <Input
                  type="number"
                  icon="plus"
                  placeholder="price $"
                  onChange={price => this.setState({price})}
                 />
              </Form.Item>
              <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
              <div className="text-center">
                <Radio
                  value="true"
                  checked={this.state.shipped === true}
                  onChange={() => this.setState({ shipped: true })}
                >
                  Shipped
                </Radio>
                <Radio
                  value="false"
                  checked={this.state.shipped === false}
                  onChange={() => this.setState({ shipped: false })}
                >
                  Emailed
                </Radio>
              </div>
            </Form.Item>
            <Form.Item>
              <PhotoPicker/>
              <Button
                // disabled={!image || !description || !price || isUploading}
                type="primary"
                onClick={this.handleAddProduct}
                // loading={isUploading}
              >
                Add Product
              </Button>
            </Form.Item>
           </Form>
        </div>

    </div>)
  }
}

export default NewProduct;
