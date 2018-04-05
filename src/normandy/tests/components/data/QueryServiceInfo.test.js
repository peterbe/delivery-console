import React from 'react';

import TestComponent from 'normandy/components/data/QueryServiceInfo';

const { WrappedComponent: QueryServiceInfo } = TestComponent;

describe('<QueryServiceInfo>', () => {
  const props = {
    fetchServiceInfo: () => {},
  };

  test('should work', () => {
    const wrapper = () => shallow(<QueryServiceInfo {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should call fetchServiceInfo on mount', () => {
    let called = false;
    shallow(
      <QueryServiceInfo
        fetchServiceInfo={() => {
          called = true;
        }}
      />,
    );

    expect(called).toBe(true);
  });

  test('should call fetchServiceInfo once if container props change', () => {
    let callCount = 0;
    const wrapper = mount(
      <Stub fakeProp={1}>
        <QueryServiceInfo
          fetchServiceInfo={() => {
            callCount += 1;
          }}
        />
      </Stub>,
    );

    wrapper.setProps({ fakeProp: 2 });
    wrapper.setProps({ fakeProp: 3 });
    wrapper.setProps({ fakeProp: 4 });

    expect(callCount).toBe(1);
  });

  test('should not render anything', () => {
    const wrapper = shallow(<QueryServiceInfo {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
});
