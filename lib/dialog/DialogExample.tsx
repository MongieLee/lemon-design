import * as React from 'react';
import Dialog from './Dialog';

class DialogExample extends React.Component {
  state = {
    x: false,
  };
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ x: !this.state.x })}>点我切换</button>
        <Dialog buttons={[<button>1</button>, <button>2</button>]} visible={this.state.x}>
          <strong>jkljkljkl</strong>
        </Dialog>
      </div>
    );
  }
}

export default DialogExample;
