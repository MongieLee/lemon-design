import * as React from "react";
import "./scroll.scss";
import getScrollbarWidth from "./scrollWidth";
import { UIEventHandler } from "react";

interface State {
  barHeight: number;
  barTop: number;
}

interface LdScrollProps extends React.HTMLAttributes<HTMLDivElement> {}

class Scroll extends React.Component<LdScrollProps, State> {
  public state: State = {
    barHeight: 0,
    barTop: 0,
  };
  public containerRef = React.createRef<HTMLDivElement>();
  public componentDidMount = () => {
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const barHeight = (viewHeight * viewHeight) / scrollHeight;
    this.setState({ barHeight });
  };
  public onScroll: UIEventHandler = () => {
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop = current!.scrollTop;
    const barTop = (scrollTop * viewHeight) / scrollHeight;
    this.setState({ barTop });
  };

  render() {
    const { children, ...rest } = this.props;
    const { barHeight, barTop } = this.state;
    return (
      <div className="ld-scroll" {...rest}>
        <div
          className="ld-scroll-inner"
          style={{ right: -getScrollbarWidth() }}
          onScroll={this.onScroll}
          ref={this.containerRef}
        >
          {children}
        </div>
        <div className="ld-scroll-track">
          <div
            className="ld-scroll-bar"
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Scroll;
