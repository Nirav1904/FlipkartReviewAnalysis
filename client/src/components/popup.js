import React from "react";
import Popup from "reactjs-popups";
import "reactjs-popup/dist/index.css";

function popup() {
  return (
    <div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Please Enter Valid URL</div>
      </Popup>
    </div>
  );
}

export default popup;
