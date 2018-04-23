import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChatRoom from "./chat_room";
import GlobalNav from "./global_nav";

class Router extends React.Component {
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
          <GlobalNav />
          <Switch>
            <Route exact path="/" component={ChatRoom} />
            <Route exact path="/rooms/:id" component={ChatRoom} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router));
