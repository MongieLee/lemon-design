import * as React from 'react';
import './scroll.scss';
import getScrollbarWidth from './scrollWidth';
import { UIEventHandler, TouchEventHandler } from 'react';

interface State {
  barHeight: number;
  barTop: number;
  barVisible: boolean;
  translateY: number;
}

interface LdScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  onPull?: () => void;
}

class Scroll extends React.Component<LdScrollProps, State> {
  public state: State = {
    barHeight: 0,
    barTop: 0,
    barVisible: false,
    translateY: 0,
  };
  public dragging: boolean = false;
  public firstY: number = 0;
  public firstBarTop: number;
  public containerRef = React.createRef<HTMLDivElement>();
  public timeId: number;
  public lastY: number = 0;
  public moveCount: number = 0;
  public pulling: boolean = false;

  public componentDidMount = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('selectstart', this.onSelect);
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const barHeight = (viewHeight * viewHeight) / scrollHeight;
    this.setState({ barHeight });
  };

  public componentWillUnmount = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('selectstart', this.onSelect);
  };

  public onScroll: UIEventHandler = () => {
    this.setState({ barVisible: true });
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const scrollTop = current!.scrollTop;
    const barTop = (scrollTop * viewHeight) / scrollHeight;
    this.setState({ barTop });
    if (this.timeId) {
      window.clearTimeout(this.timeId);
    }
    this.timeId = window.setTimeout(() => {
      this.setState({ barVisible: false });
    }, 300);
  };

  public setBarTop = (scrollTop: number, fn: () => void) => {
    if (scrollTop < 0) return;
    const { current } = this.containerRef;
    const scrollHeight = current!.scrollHeight;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = ((scrollHeight - viewHeight) * viewHeight) / scrollHeight;
    if (scrollTop > maxBarTop) return;
    this.setState({ barTop: scrollTop }, fn);
  };

  public onMouseDown: React.MouseEventHandler = (e) => {
    this.dragging = true;
    this.firstY = e.clientY - this.firstY;
    this.firstBarTop = this.state.barTop;
  };

  public onMouseMove = (event: MouseEvent) => {
    if (this.dragging) {
      const delta = event.clientY - this.firstY;
      const newBarTop = this.firstBarTop + delta;
      this.setBarTop(newBarTop, () => {
        const { current } = this.containerRef;
        const scrollHeight = current!.scrollHeight;
        const viewHeight = current!.getBoundingClientRect().height;
        this.containerRef.current!.scrollTop = (newBarTop * scrollHeight) / viewHeight;
      });
    }
  };

  public onTouchStart: TouchEventHandler = (event) => {
    const scrollTop = this.containerRef.current?.scrollTop;
    if (scrollTop !== 0) {
      return;
    }
    this.pulling = true;
    this.moveCount = 0;
    this.lastY = event.touches[0].clientY;
  };

  public onTouchEnd: TouchEventHandler = (event) => {
    if (this.pulling === true) {
      this.setState({ translateY: 0 });
      this.props.onPull && this.props.onPull();
      this.pulling = false;
    }
  };
  public onTouchMove: TouchEventHandler = (event) => {
    this.moveCount += 1;
    const deltaY = event.touches[0].clientY - this.lastY;
    if (this.moveCount === 1 && deltaY < 0) {
      this.pulling = false;
      return;
    }
    if (!this.pulling) {
      return;
    }
    this.setTranslateY(this.state.translateY + deltaY);
    this.lastY = event.touches[0].clientY;
  };

  public setTranslateY = (y: number) => {
    if (y < 0) {
      y = 0;
    } else if (y > 120) {
      y = 120;
    }
    this.setState({ translateY: y });
  };
  public onMouseUp = () => {
    this.dragging = false;
  };

  public onSelect = (event: Event) => {
    if (this.dragging) {
      event.preventDefault();
    }
  };

  render() {
    const { children, onPull, ...rest } = this.props;
    const { barHeight, barTop, barVisible, translateY } = this.state;
    return (
      <div className='ld-scroll' {...rest}>
        <div
          className='ld-scroll-inner'
          style={{ right: -getScrollbarWidth(), transform: `translateY(${translateY}px)` }}
          onScroll={this.onScroll}
          ref={this.containerRef}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          {children}
        </div>
        {barVisible && (
          <div className='ld-scroll-track'>
            <div
              onMouseDown={this.onMouseDown}
              className='ld-scroll-bar'
              style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
            ></div>
          </div>
        )}
        <div style={{ height: translateY }} className='ld-scroll-pulling'>
          {translateY === 120 ? (
            <span className='ld-scroll-pulling-text'>释放手指刷新</span>
          ) : (
            <span className='ld-scroll-pulling-icon'>⬇️</span>
          )}
        </div>
      </div>
    );
  }
}

export default Scroll;
