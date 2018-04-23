import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ChatRoom from "./chat_room";
import GlobalNav from "./global_nav";

export default class Router extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GlobalNav />
        <Switch>
          <Route exact path="/" component={ChatRoom} />
          <Route exact path="/rooms/:id" component={ChatRoom} />
        </Switch>
      </div>
    );
  }
}
