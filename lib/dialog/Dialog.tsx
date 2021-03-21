import * as React from 'react';
import './dialog.scss';
import { scopedClassMaker } from '../utils/classes';
import { createPortal } from 'react-dom';

const scopedClass = scopedClassMaker('ld-dialog');
const sc = scopedClass;

class Props {
  visible: boolean;
  buttons: Array<React.ReactElement>;
}
class Dialog extends React.Component<Props> {
  render() {
    const { visible, children } = this.props;
    return visible
      ? createPortal(
          <>
            <div className={sc('mask')}></div>
            <div className={sc()}>
              <div className={sc('close')}>X</div>
              <header className={sc('header')}>提示</header>
              <main className={sc('main')}>{children}</main>
              <footer className={sc('footer')}>
                {this.props.buttons.map((button, index) => {
                  return React.cloneElement(button, { key: index });
                })}
              </footer>
            </div>
          </>,
          document.body
        )
      : null;
  }
}

export default Dialog;
