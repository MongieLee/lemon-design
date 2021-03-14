import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from './button/Button';

ReactDOM.render(
  <Button
    handleClick={() => console.log(111)}
  />,
  document.body.querySelector('#app')
);
