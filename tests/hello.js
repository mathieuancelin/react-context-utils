import React from 'react';
import mapContextWith from '../src/enhance';

const Hello = React.createClass({
  propTypes: {
    service: React.PropTypes.func.isRequired,
    who: React.PropTypes.string.isRequired,
  },
  render() {
    return <span>{this.props.service(this.props.who)}</span>;
  },
});

function mapper(context) {
  return {
    service: context.helloService,
  };
}

export default mapContextWith(mapper)(Hello);
