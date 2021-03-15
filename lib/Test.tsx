import * as React from "react";
import Button from "./button/Button";
import Scroll from "./scroll/ScrollExample";

class Test extends React.Component {
  render() {
    return (
      <div>
        <Button handleClick={() => console.log(111)} />
        <Scroll />
      </div>
    );
  }
}

export default Test;
