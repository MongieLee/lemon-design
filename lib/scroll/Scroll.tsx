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
  public dragging: boolean = false;
  public firstY: number = 0;
  public firstBarTop: number;
  public containerRef = React.createRef<HTMLDivElement>();

  public componentDidMount = () => {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);

    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const barHeight = (viewHeight * viewHeight) / scrollHeight;
    this.setState({ barHeight });
  };

  public componentWillUnmount = () => {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  };

  public onScroll: UIEventHandler = () => {
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop = current!.scrollTop;
    const barTop = (scrollTop * viewHeight) / scrollHeight;
    this.setState({ barTop });
  };

  public setBarTop = (scrollTop: number) => {
    if (scrollTop < 0) return;
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = ((scrollHeight - viewHeight) * viewHeight) / scrollHeight;
    if (scrollTop > maxBarTop) return;
    this.setState({ barTop: scrollTop });
  };

  public onMouseDown: React.MouseEventHandler = (e) => {
    this.dragging = true;
    this.firstY = e.clientY - this.firstY;
    this.firstBarTop = this.state.barTop;
  };
  public onMouseMove = (event: MouseEvent) => {
    if (this.dragging) {
      const delta = event.clientY - this.firstY;
      this.setBarTop(this.firstBarTop + delta);
    }
  };
  public onMouseUp = () => {
    this.dragging = false;
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
            onMouseDown={this.onMouseDown}
            className="ld-scroll-bar"
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Scroll;
