/* eslint react/no-multi-comp: 0 */
import React from 'react';

// creates an higher order component that can map parts of the context on subcomponent props
export default function enhance(mapper = a => a, name = 'default') {
  if (Object.prototype.toString.call(mapper) === '[object Array]') {
    return (Component) => {
      return React.createClass({
        contextTypes: {
          __providedContext: React.PropTypes.object,
        },
        render() {
          let props = { ...this.props };
          for (const item in mapper) {
            if ({}.hasOwnProperty.call(mapper, item)) {
              const value = mapper[item];
              props = { ...props, ...value.mapper(this.context.__providedContext[value.name]) };
            }
          }
          return <Component {...props} />;
        },
      });
    };
  }
  return (Component) => {
    return React.createClass({
      contextTypes: {
        __providedContext: React.PropTypes.object,
      },
      render() {
        return (
          <Component { ...this.props } { ...mapper(this.context.__providedContext[name]) } />
        );
      },
    });
  };
}
