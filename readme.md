# react-context-utils

[![build status][1]][2]

Utility lib to manipulate React context easily and use props as much as possible.

```
npm install react-context-utils
```

or

```html
<script src="https://npmcdn.com/react-context-utils/dist/react-context-utils.js"></script>
```

## Provide a context

You just need to use the `ContextProvider` component to provide a context to you whole component tree.
The context is a good way to provide some global services or actions to your components. It also make testing easier, if you
put the provider at the root of the tree, so you can easily provide a `test context` to your components without changing them.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from 'react-context-utils';

const context = {
  helloService: (who = 'World') => `Hello ${who}!`,
};

const App = React.createClass({
  render() {
    return (
      <h1>
        Hello Dude!
      </h1>
    );
  },
});

ReactDOM.render(
  <ContextProvider context={context}>
    <App />
  </ContextProvider>
  , document.getElementById('app')
);
```

## Map context to components props

Now, if you want to use services from inside the context, you just need to map those services to you component props by
using the `higher order components` pattern. You can define you component like

```javascript
import React from 'react';
import { mapContextWith } from 'react-context-utils';

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
```

and then use it in your app

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from 'react-context-utils';

const context = {
  helloService: (who = 'World') => `Hello ${who}!`,
};

const App = React.createClass({
  render() {
    return (
      <h1>
        <HelloComponent who="Dude" />
      </h1>
    );
  },
});

ReactDOM.render(
  <ContextProvider context={context}>
    <App />
  </ContextProvider>
  , document.getElementById('app')
);
```

## Multiple contexts

It is possible to deeply nest contexts with different names

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider, mapContextWith } from 'react-context-utils';

const contextA = { ... };
const contextB = { ... };

const Component = mapContextWith(c => ({ ... }), 'B')(...);
const OtherComponent = mapContextWith(c => ({ ... }), 'A')(...);

const App = React.createClass({
  render() {
    <ContextProvider context={contextA} ctxName="A">
      <div>
        <ContextProvider context={contextB} ctxName="B">
          <Component />
        </ContextProvider>
        <AnotherComponent />
        <OtherComponent />
      </div>
    </ContextProvider>
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
```

you can also consume multiple contexts in one component by using

```javascript
import { mapContextWith } from 'react-context-utils';

const Component = React.createClass(...);

export default mapContextWith([
  { mapper: c => c, name: 'default' },
  { mapper: c => c, name: 'secondary' },
])(Component);
```

## Out of the box event bus

`react-context-utils` provides a simple event bus for the wrapped component tree.

It's pretty easy to use

```javascript
import React from 'react';

import {
  ContextProvider,
  EventBusShape,
  mapContextWith
} from 'react-context-utils';

const Emitter = mapContextWith()(React.createClass({
  propTypes: {
    eventBus: EventBusShape,
  },
  emit() {
    this.props.eventBus.dispatch('events', 'Hello World');
  },
  render() {
    return (
      <button type="button" onClick={this.emit}>Emit</button>
    );
  },
}));

const Receiver = mapContextWith()(React.createClass({
  propTypes: {
    eventBus: EventBusShape,
  },
  getInitialState() {
    return {
      message: 'void',
    };
  },
  componentDidMount() {
    this.unsubscribe = this.props.eventBus.subscribe('events', payload => this.setState({ message: payload }));
  },
  componentWillUnmout() {
    this.unsubscribe();
  },
  render() {
    return (
      <div>
        <span>{this.state.message}</span>
      </div>
    );
  },
}));

const App = React.createClass({
  render() {
    return (
      <div>
        <Emitter />
        <Receiver />
      </div>
    );
  },
});

ReactDOM.render(
  <ContextProvider context={context}>
    <App />
  </ContextProvider>
  , document.getElementById('app')
);
```

[1]: https://api.travis-ci.org/mathieuancelin/react-context-utils.svg
[2]: https://api.travis-ci.org/mathieuancelin/react-context-utils
