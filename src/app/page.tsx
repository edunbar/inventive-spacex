"use client";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import * as React from "react";
import { LaunchExplorer } from "./scenes/LaunchExplorer";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <LaunchExplorer />
    </ApolloProvider>
  );
}
