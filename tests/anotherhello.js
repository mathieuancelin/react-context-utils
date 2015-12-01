import React from 'react';
import mapContextWith from '../src/enhance';

const Hello = React.createClass({
  propTypes: {
    helloService: React.PropTypes.func.isRequired,
    uppercaseService: React.PropTypes.func.isRequired,
    who: React.PropTypes.string.isRequired,
  },
  render() {
    return <span>{this.props.uppercaseService(this.props.helloService(this.props.who))}</span>;
  },
});

function mapperDefault(context) {
  return {
    helloService: context.helloService,
  };
}

function mapperSecondary(context) {
  return {
    uppercaseService: context.uppercaseService,
  };
}

export default mapContextWith([
  { mapper: mapperDefault, name: 'default' },
  { mapper: mapperSecondary, name: 'secondary' },
])(Hello);
