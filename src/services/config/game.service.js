import { ApolloClient, InMemoryCache } from '@apollo/client';

const triviaBackendServer = 'http://161.35.189.119:4000'

const client = new ApolloClient({
    uri: `${triviaBackendServer}/graphql`,
    cache: new InMemoryCache()
});

export {
    client
}