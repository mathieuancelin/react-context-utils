import React from 'react';
import EventBus from './eventBus';

// wrapper components and provide a context
export default React.createClass({
  propTypes: {
    ctxName: React.PropTypes.string,
    children: React.PropTypes.element.isRequired,
    context: React.PropTypes.object.isRequired,
  },
  contextTypes: {
    __providedContext: React.PropTypes.object,
  },
  childContextTypes: {
    __providedContext: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      ctxName: 'default',
    };
  },
  getChildContext() {
    const parentContext = this.context.__providedContext || {};
    const eventBus = parentContext.__eventBus || EventBus(); // eslint-disable-line
    const ctxName = this.props.ctxName;
    if (parentContext[ctxName]) {
      console.warn(`You are providing a '${ctxName}' while a parent context with the same name is already defined.` +
      `It will be overidden by this one.`);
    }
    return {
      __providedContext: {
        ...parentContext,
        [ctxName]: { ...this.props.context, eventBus },
        __eventBus: eventBus,
      },
    };
  },
  render() {
    return React.Children.only(this.props.children);
  },
});
