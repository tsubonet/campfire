import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class GlobalNav extends React.Component {
  test(e) {
    e.preventDefault();
    this.props.history.push("/ee/ww/ss");
  }
  render() {
    console.log("this.props", this.props);
    return (
      <div>
        <a onClick={this.test.bind(this)} href="/">
          あああ
        </a>
        <div>
          {this.props.rooms.map((room, i) => {
            return (
              <Link key={i} to={`/rooms/${room.id}`}>
                {room.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GlobalNav)
);
