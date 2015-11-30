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
  getDefaultProps() {
    return {
      ctxName: 'default',
    };
  },
  getChildContext() {
    const ctxName = this.props.ctxName;
    return {
      __providedContext: {
        [ctxName]: this.props.context,
      },
    };
  },
  render() {
    return React.Children.only(this.props.children);
  },
});
