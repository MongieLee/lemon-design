import React from 'react';
import './button.scss';
import classes from '../utils/classes';

export interface LdButtonProps {
  handleClick?: React.MouseEventHandler;
  disabled?: boolean;
  className?: string | string[];
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default' | 'danger';
  style?: React.CSSProperties;
}

class Button extends React.Component<LdButtonProps> {
  static displayName = 'LdButton';
  public static defaultProps = {
    type: 'default',
    disabled: false,
  };

  public render() {
    const { type, disabled, className, handleClick, ...rest } = this.props;
    return (
      <button
        onClick={handleClick}
        className={classes('ld-button', type, className, { disabled })}
        {...rest}
      >
        按钮
      </button>
    );
  }
}
export default Button;
