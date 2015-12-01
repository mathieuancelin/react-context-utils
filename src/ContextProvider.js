import React from 'react';

// wrapper components and provide a context
export default React.createClass({
  propTypes: {
    ctxName: React.PropTypes.string,
    children: React.PropTypes.element.isRequired,
    context: React.PropTypes.object.isRequired,
  },
  childContextTypes: {
    __providedContext: React.PropTypes.object,
  },
  contextTypes: {
    __providedContext: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      ctxName: 'default',
    };
  },
  getChildContext() {
    const parentContext = this.context.__providedContext || {};
    const ctxName = this.props.ctxName;
    return {
      __providedContext: {
        ...parentContext,
        [ctxName]: this.props.context,
      },
    };
  },
  render() {
    return React.Children.only(this.props.children);
  },
});
