import React from 'react';

// creates an higher order component that can map parts of the context on subcomponent props
export default function enhance(mapper, name = 'default') {
  return (Component) => {
    return React.createClass({
      contextTypes: {
        __providedContext: React.PropTypes.object,
      },
      render() {
        return (
          <Component
            {...this.props}
            {...mapper(this.context.__providedContext[name])} />
        );
      },
    });
  };
}
