import Vue from 'vue';
import { default as ApolloClient } from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: `${process.env.MIX_APP_URL}/graphql`,
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
  },
  credentials: 'include',
});

export default new VueApollo({
  defaultClient: apolloClient,
});