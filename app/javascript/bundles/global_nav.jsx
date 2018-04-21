import React from "react";
import { Link } from "react-router-dom";

export default class GlobalNav extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.rooms.map((room, i) => {
            return (
              <a key={i} href={`/rooms/${room.id}`}>
                {room.name}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
