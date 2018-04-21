import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoom from "./chat_room";
import GlobalNav from "./global_nav";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <a href="/">テスト</a>
          </div>
          <GlobalNav {...this.props} />
          <Switch>
            <Route exact path="/" render={props => <ChatRoom {...props} />} />
            <Route
              exact
              path="/rooms/:id"
              render={() => <ChatRoom {...this.props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
