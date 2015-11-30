/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0 */

import React from 'react';
import chai, {expect} from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

import ContextProvider from '../src/ContextProvider';
import HelloComponent from './hello';

describe('App', () => {
  it('should be aware of context', () => {
    const context = {
      helloService: (who = 'World') => `Hello ${who}!`,
    };
    const App = React.createClass({
      render() {
        return (
          <h1>
            <HelloComponent who="Dude" />
          </h1>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<ContextProvider context={context}><App /></ContextProvider>);
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'span');
    expect(span.textContent).to.be.equal('Hello Dude!');
  });
  it('should be multi layers', () => {
    const context = {
      helloService: (who = 'World') => `Hello ${who}!`,
    };
    const Wrapper = React.createClass({
      propTypes: {
        children: React.PropTypes.element.isRequired,
      },
      render() {
        return this.props.children;
      },
    });
    const App = React.createClass({
      render() {
        return (
          <h1>
            <Wrapper>
              <HelloComponent who="Dude" />
            </Wrapper>
          </h1>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<ContextProvider context={context}><App /></ContextProvider>);
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'span');
    expect(span.textContent).to.be.equal('Hello Dude!');
  });
  it('should handle props updates', () => {
    const context = {
      helloService: (who = 'World') => `Hello ${who}!`,
    };
    const App = React.createClass({
      getInitialState() {
        return {
          who: 'Dude',
        };
      },
      click() {
        this.setState({ who: 'Man' });
      },
      render() {
        return (
          <div>
            <button onClick={this.click} type="button">Click me</button>
            <h1>
              <HelloComponent who={this.state.who} />
            </h1>
          </div>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<ContextProvider context={context}><App /></ContextProvider>);
    const span = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'span');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'button');
    expect(span.textContent).to.be.equal('Hello Dude!');
    ReactTestUtils.Simulate.click(button);
    expect(span.textContent).to.be.equal('Hello Man!');
  });
});
