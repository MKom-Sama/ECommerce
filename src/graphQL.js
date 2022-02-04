import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// Functions

// Get All Products
const getProducts = async () => {
  let { data } = await client.query({
    query: gql`
      query GetRates {
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
  console.log(data.category.products)
  return data.category.products;
};

getProducts();

export { getProducts };
