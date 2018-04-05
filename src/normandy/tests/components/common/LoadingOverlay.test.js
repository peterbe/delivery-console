import { Spin } from 'antd';
import React from 'react';

import LoadingOverlay, {
  SimpleLoadingOverlay,
} from 'normandy/components/common/LoadingOverlay';

describe('<SimpleLoadingOverlay>', () => {
  const props = {
    children: <div id="content">Hello world!</div>,
    isVisible: false,
  };

  test('should work', () => {
    const wrapper = () => shallow(<SimpleLoadingOverlay {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should display a Spin element while visible', () => {
    const wrapper = mount(<SimpleLoadingOverlay {...props} isVisible />);

    expect(wrapper.find(Spin).length).toBe(1);
    expect(wrapper.find('#content').length).toBe(1);
  });

  test('should display its children when NOT visible', () => {
    const wrapper = mount(
      <SimpleLoadingOverlay {...props} isVisible={false} />,
    );

    expect(wrapper.find(Spin).length).toBe(0);
    expect(wrapper.find('#content').length).toBe(1);
  });
});

describe('<LoadingOverlay>', () => {
  const { WrappedComponent: TestOverlay } = LoadingOverlay;

  const props = {
    children: <div id="content">Hello world!</div>,
    isLoading: false,
  };

  test('should work', () => {
    const wrapper = () => shallow(<TestOverlay {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should display a Spin element while loading', () => {
    const wrapper = mount(<TestOverlay {...props} isLoading />);

    expect(wrapper.find(Spin).length).toBe(1);
    expect(wrapper.find('#content').length).toBe(1);
  });

  test('should display its children when NOT loading', () => {
    const wrapper = mount(<TestOverlay {...props} isLoading={false} />);

    expect(wrapper.find(Spin).length).toBe(0);
    expect(wrapper.find('#content').length).toBe(1);
  });
});
