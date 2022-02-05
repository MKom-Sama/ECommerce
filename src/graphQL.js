import {
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// Functions

const getProducts = async () => {
  let { data } = await client.query({
    query: gql`
      query GetProducts {
        category {
          products {
            id
            # category,
            name
            gallery
            prices {
              amount
              currency {
                label
              }
            }
          }
        }
      }
    `,
  });
  return data.category.products;
};

const getProductByID = async (p_id) => {
  let { data } = await client.query({
    query: gql`
      query GetProductByID($pid: String!) {
        product(id: $pid) {
          id
          name
          gallery
          prices {
            amount
            currency {
              label
            }
          }
        }
      }
    `,
    variables: {
      pid: p_id,
    },
  });
  return data.product;
};

export { getProducts, getProductByID };
