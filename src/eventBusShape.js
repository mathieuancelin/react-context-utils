import { PropTypes } from 'react';

export default PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  subscribeOnce: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchAsync: PropTypes.func.isRequired,
});
