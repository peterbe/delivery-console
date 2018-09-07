import { List, Map } from 'immutable';
import { render } from 'react-testing-library';
import fetchMock from 'fetch-mock';
// import TestComponent from 'console/workflows/recipes/pages/RecipeDetailPage';
import { wrapMockStore, rootReducer, mockStore } from 'console/tests/mockStore';
// import reducer from 'state/recipes/reducers';
import recipesReducer from 'console/state/recipes/reducers';
import RecipeDetailPage from 'console/workflows/recipes/pages/RecipeDetailPage';
import { NORMANDY_ADMIN_API_ROOT_URL } from 'console/settings';

import { LOCATION_CHANGE } from 'connected-react-router/lib/actions';
// const { WrappedComponent: RecipeDetailPage } = TestComponent;

// XXX
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
function renderWithRedux(
  ui,
  { initialState, store = createStore(recipesReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

describe('<RecipeDetailPage>', () => {
  const props = {
    history: new List(),
    recipeId: 123,
    revision: new Map().set('identicon_seed', 'foobar'),
    revisionId: 123,
  };

  it('should work', () => {
    fetchMock.getOnce(`${NORMANDY_ADMIN_API_ROOT_URL}v2/recipe/123/`, {
      action: {
        name: 'console-log',
      },
      arguments: {
        message: 'Hi there!',
      },
      filter_expression: 'true === true',
    });
    fetchMock.getOnce(`${NORMANDY_ADMIN_API_ROOT_URL}v2/recipe/123/history/`, []);

    // const store = createStore(() => props);
    // const store = {
    //   initialState: props,
    // };

    // const rendered = renderWithRedux(<RecipeDetailPage {...props} />, store);
    // const rendered = render(<RecipeDetailPage {...props} />);

    // let STATE = rootReducer(undefined, {
    //   type: LOCATION_CHANGE,
    //   payload: {
    //     location: {
    //       pathname: '/recipe/123/',
    //       search: '',
    //       hash: '',
    //       key: '',
    //     },
    //     action: 'PUSH',
    //   },
    // });
    // mockStore.dipatch(STATE);

    // const initialState = {};
    // const store = mockStore(initialState);
    mockStore.dispatch({
      type: LOCATION_CHANGE,
      payload: {
        location: {
          pathname: '/recipe/123/',
          search: '',
          hash: '',
          key: '',
        },
        action: 'PUSH',
      },
    });

    console.log('**( mockStore **');
    console.log(mockStore);
    console.log(mockStore.getState());
    console.log('---');

    // const rendered = render(wrapMockStore(<RecipeDetailPage {...props} />));
    // const rendered = render(wrapMockStore(<RecipeDetailPage />));
    const rendered = renderWithRedux(<RecipeDetailPage {...props} />, mockStore);
    rendered.debug();
    expect(1).toEqual(2);
  });
});
