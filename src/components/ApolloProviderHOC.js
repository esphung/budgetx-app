import React, {Component} from 'react'
import {Rehydrated} from 'aws-appsync-react'
import { ApolloProvider } from 'react-apollo'

// import Client from 'aws-appsync'
import AWSAppSyncClient from 'aws-appsync'
import appSyncConfig from 'main/aws-exports';

// Amplify imports and config
import Amplify from 'aws-amplify'; // '@aws-amplify/core';
import awsConfig from 'main/aws-exports';

import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  uri: Amplify.aws_appsync_graphqlEndpoint,
  // region: awsConfig.aws_appsync_region,
  // auth: {
  //   type: awsConfig.aws_appsync_authenticationType,
  //   jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  // }
});

// console.log(client);


// const appSyncClient = new AWSAppSyncClient({
//     url: appSyncConfig.graphqlEndpoint,
//     region: appSyncConfig.region,
//     auth: { type: appSyncConfig.authenticationType, apiKey: appSyncConfig.apiKey }
// });

export default function apolloProviderHOC(WrappedComponent) {
    return class PP extends Component {
        render() {
            return (
                <ApolloProvider client={client}>
                    {/*<Rehydrated>*/}
                        <WrappedComponent {...this.props} />
                    {/*</Rehydrated>*/}
                </ApolloProvider>
            );
        }
    }
}

