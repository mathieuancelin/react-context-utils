export default function EventBus() {
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
