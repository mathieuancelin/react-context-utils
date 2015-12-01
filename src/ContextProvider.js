import React from 'react';

function EventBus() {
  const listeners = [];

  function subscribe(topic, callback) {
    let slug = { topic, callback };
    if (!callback) {
      slug = { topic: '*', callback: topic };
    }
    listeners.push(slug);
    return () => {
      const index = listeners.indexOf(slug);
      listeners.splice(index, 1);
    };
  }

  function subscribeOnce(topic, callback) {
    let slug = { topic, originalCallback: callback };
    if (!callback) {
      slug = { topic: '*', originalCallback: topic };
    }
    slug.callback = (payload) => {
      slug.originalCallback(payload);
      const index = listeners.indexOf(slug);
      listeners.splice(index, 1);
    };
    listeners.push(slug);
  }

  function dispatch(topic, payload) {
    const ctx = { topic, payload };
    if (!payload) {
      ctx.payload = topic;
      ctx.topic = '*';
    }
    listeners.forEach(slug => {
      if (slug.topic === '*') {
        slug.callback(ctx.payload);
      } else if (slug.topic === ctx.topic) {
        slug.callback(ctx.payload);
      }
    });
  }

  function dispatchAsync(topic, payload) {
    setTimeout(() => dispatch(topic, payload), 0);
  }

  return {
    subscribe,
    subscribeOnce,
    dispatch,
    dispatchAsync,
  };
}

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
        [ctxName]: {...this.props.context, eventBus },
        __eventBus: eventBus,
      },
    };
  },
  render() {
    return React.Children.only(this.props.children);
  },
});
