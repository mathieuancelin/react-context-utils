import React from 'react';
import mapContextWith from '../src/enhance';

const Hello = React.createClass({
  propTypes: {
    service: React.PropTypes.func.isRequired,
    message: React.PropTypes.string.isRequired,
  },
  render() {
    return <p>{this.props.service(this.props.message)}</p>;
  },
});

function mapper(context) {
  return {
    service: context.uppercaseService,
  };
}

export default mapContextWith(mapper, 'secondary')(Hello);
