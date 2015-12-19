/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0 */

import React from 'react';
import chai, { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

import ContextProvider from '../src/ContextProvider';
import mapContextWith from '../src/enhance';
import EventBusShape from '../src/eventBusShape';

describe('react-context-utils', () => {
  it('should provide an eventBus', () => {
    const Emitter = mapContextWith()(React.createClass({
      propTypes: {
        eventBus: EventBusShape,
      },
      emit() {
        this.props.eventBus.dispatch('events', 'Hello World');
      },
      render() {
        return (
          <button type="button" onClick={this.emit}>Emit</button>
        );
      },
    }));

    const Receiver = mapContextWith()(React.createClass({
      propTypes: {
        eventBus: EventBusShape,
      },
      getInitialState() {
        return {
          message: 'void',
          messageall: 'void',
        };
      },
      componentDidMount() {
        this.unsubscribe = this.props.eventBus.subscribe('events', payload => this.setState({ message: payload }));
        this.unsubscribeall = this.props.eventBus.subscribe(payload => this.setState({ messageall: payload }));
      },
      componentWillUnmout() {
        this.unsubscribe();
        this.unsubscribeall();
      },
      render() {
        return (
          <div>
            <span>{this.state.message}</span>
            <p>{this.state.messageall}</p>
          </div>
        );
      },
    }));

    const App = React.createClass({
      render() {
        return (
          <div>
            <Emitter />
            <Receiver />
          </div>
        );
      },
    });

    const app = ReactTestUtils.renderIntoDocument(<ContextProvider context={{}}><App /></ContextProvider>);
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'span');
    const p = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'p');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'button');
    expect(span.textContent).to.be.equal('void');
    expect(p.textContent).to.be.equal('void');
    ReactTestUtils.Simulate.click(button);
    expect(span.textContent).to.be.equal('Hello World');
    expect(p.textContent).to.be.equal('Hello World');
  });
});
