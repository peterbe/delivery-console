import TestComponent from 'console/components/data/QueryMultipleExtensions';

const { WrappedComponent: QueryMultipleExtensions } = TestComponent;

describe('<QueryMultipleExtensions>', () => {
  const props = {
    fetchExtensionsPage: () => {},
    pageNumber: 1,
  };

  it('should work', () => {
    const wrapper = () => shallow(<QueryMultipleExtensions {...props} />);

    expect(wrapper).not.toThrow();
  });

  it('should call fetchExtensionsPage on mount', () => {
    let called = false;
    mount(
      <QueryMultipleExtensions
        {...props}
        fetchExtensionsPage={() => {
          called = true;
        }}
      />,
    );

    expect(called).toBe(true);
  });

  it('should call fetchExtensionsPage if the `pageNumber` changes', () => {
    let callCount = 0;
    const wrapper = shallow(
      <QueryMultipleExtensions
        {...props}
        fetchExtensionsPage={() => {
          callCount += 1;
        }}
      />,
    );
    expect(callCount).toBe(1);

    wrapper.setProps({ pageNumber: 2 });
    expect(callCount).toBe(2);

    wrapper.setProps({ irrelevant: true });
    expect(callCount).toBe(2);

    wrapper.setProps({ pageNumber: 2 });
    expect(callCount).toBe(2);

    wrapper.setProps({ pageNumber: 3 });
    expect(callCount).toBe(3);
  });

  it('should call fetchExtensionsPage once if container props change', () => {
    let callCount = 0;
    const wrapper = mount(
      <div fakeprop={1}>
        <QueryMultipleExtensions
          {...props}
          fetchExtensionsPage={() => {
            callCount += 1;
          }}
        />
      </div>,
    );
    expect(callCount).toBe(1);

    wrapper.setProps({ fakeprop: 2 });
    wrapper.setProps({ fakeprop: 3 });
    wrapper.setProps({ fakeprop: 4 });

    expect(callCount).toBe(1);
  });

  it('should not render anything', () => {
    const wrapper = shallow(<QueryMultipleExtensions {...props} />);
    expect(wrapper.children().length).toBe(0);
  });
});
