import React from "react";
import TodoStore from "../store/TodoStore";
import { Provider } from "mobx-react";

export default function TodoStoreProvider({ children }) {
  return <Provider TodoStore={TodoStore}>{children}</Provider>;
}
