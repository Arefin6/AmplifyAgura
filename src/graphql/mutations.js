/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMarket = /* GraphQL */ `
  mutation CreateMarket(
    $input: CreateMarketInput!
    $condition: ModelMarketConditionInput
  ) {
    createMarket(input: $input, condition: $condition) {
      id
      name
      tags
      owner
      createdAt
      updatedAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateMarket = /* GraphQL */ `
  mutation UpdateMarket(
    $input: UpdateMarketInput!
    $condition: ModelMarketConditionInput
  ) {
    updateMarket(input: $input, condition: $condition) {
      id
      name
      tags
      owner
      createdAt
      updatedAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteMarket = /* GraphQL */ `
  mutation DeleteMarket(
    $input: DeleteMarketInput!
    $condition: ModelMarketConditionInput
  ) {
    deleteMarket(input: $input, condition: $condition) {
      id
      name
      tags
      owner
      createdAt
      updatedAt
      products {
        items {
          id
          description
          price
          shipped
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const registerUser = /* GraphQL */ `
  mutation RegisterUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    registerUser(input: $input, condition: $condition) {
      id
      username
      email
      registerd
      orders {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUSer = /* GraphQL */ `
  mutation UpdateUSer(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUSer(input: $input, condition: $condition) {
      id
      username
      email
      registerd
      orders {
        items {
          id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      user {
        id
        username
        email
        registerd
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      shippingAddress {
        city
        country
        address_line1
        address_state
        address_zip
      }
      createdAt
      updatedAt
      product {
        id
        description
        market {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        file {
          bucket
          region
          key
        }
        price
        shipped
        owner
        createdAt
        updatedAt
      }
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      description
      market {
        id
        name
        tags
        owner
        createdAt
        updatedAt
        products {
          nextToken
        }
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      description
      market {
        id
        name
        tags
        owner
        createdAt
        updatedAt
        products {
          nextToken
        }
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      description
      market {
        id
        name
        tags
        owner
        createdAt
        updatedAt
        products {
          nextToken
        }
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      updatedAt
    }
  }
`;
