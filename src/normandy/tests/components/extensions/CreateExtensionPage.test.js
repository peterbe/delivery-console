import React from 'react';

import TestComponent from 'normandy/components/extensions/CreateExtensionPage';

const { WrappedComponent: CreateExtensionPage } = TestComponent;

describe('<CreateExtensionPage>', () => {
  const props = {
    createExtension: () => Promise.resolve(123),
    push: () => {},
  };

  test('should work', () => {
    const wrapper = () => shallow(<CreateExtensionPage {...props} />);

    expect(wrapper).not.toThrow();
  });
});
