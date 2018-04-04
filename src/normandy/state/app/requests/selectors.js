import { DEFAULT_REQUEST } from 'normandy/state/constants';

export function getRequest(state, id, defaultsTo = DEFAULT_REQUEST) {
  return state.requests.get(id, defaultsTo);
}

export function isRequestInProgress(state, id) {
  const request = getRequest(state, id);
  return request.get('inProgress', false);
}

export function areAnyRequestsInProgress(state) {
  const { requests } = state;

  if (requests.size === 0) {
    return false;
  } else if (requests.size === 1) {
    return requests.first().get('inProgress', false);
  }

  return requests
    .reduce((reduced, value) =>
      reduced.set(
        'inProgress',
        reduced.get('inProgress') || value.get('inProgress'),
      ),
    )
    .get('inProgress', false);
}
