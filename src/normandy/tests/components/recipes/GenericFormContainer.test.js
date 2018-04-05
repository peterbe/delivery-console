/* eslint-disable react/prop-types, react/display-name, jsx-a11y/no-static-element-interactions */
import React from 'react';

import GenericFormContainer from 'normandy/components/recipes/GenericFormContainer';

describe('<GenericFormContainer>', () => {
  const props = {
    form: () => <Stub />,
    formAction: async () => true,
    onFailure: () => {},
    onSuccess: () => {},
    formProps: {},
  };

  test('should work', () => {
    const wrapper = () => mount(<GenericFormContainer {...props} />);

    expect(wrapper).not.toThrow();
  });

  test('should nest the `form` prop as a child', () => {
    const CustomEl = () => <div id="test">Custom</div>;

    const wrapper = mount(<GenericFormContainer {...props} form={CustomEl} />);

    expect(wrapper.find('#test').length).toBe(1);
    expect(wrapper.find('#test').text()).toContain('Custom');
  });

  test('should fire the formAction on submission', () => {
    const CustomEl = ({ onSubmit }) => (
      <div id="test" onClick={onSubmit}>
        Test
      </div>
    );
    let fired = false;
    const wrapper = mount(
      <GenericFormContainer
        {...props}
        form={CustomEl}
        formAction={() => {
          fired = true;
        }}
      />,
    );

    wrapper.find('#test').simulate('click');
    expect(fired).toBe(true);
  });

  test('should handle the formAction failing', () => {
    const CustomEl = ({ onSubmit }) => (
      <div id="test" onClick={onSubmit}>
        Test
      </div>
    );
    let failed = false;
    const wrapper = mount(
      <GenericFormContainer
        {...props}
        form={CustomEl}
        onFailure={() => {
          failed = true;
        }}
        formAction={() => {
          throw new Error('Form action failed');
        }}
      />,
    );

    wrapper.find('#test').simulate('click');
    expect(failed).toBe(true);
  });

  test('should handle the formAction succeeding', async () => {
    const CustomEl = ({ onSubmit }) => (
      <div id="test" onClick={onSubmit}>
        Test
      </div>
    );

    let resolve;
    const success = new Promise(r => {
      resolve = r;
    });

    const wrapper = mount(
      <GenericFormContainer
        {...props}
        form={CustomEl}
        onSuccess={() => {
          resolve(true);
        }}
      />,
    );

    wrapper.find('#test').simulate('click');
    expect(await success).toBe(true);
  });

  test('should pass the formProps object to the form element', () => {
    const CustomEl = custProps => (
      <div id="test" {...custProps}>
        Custom
      </div>
    );
    const testProps = { test: 1, woo: 'hoo' };
    const wrapper = mount(
      <GenericFormContainer {...props} form={CustomEl} formProps={testProps} />,
    );

    expect(wrapper.find('#test').props().test).toBe(1);
    expect(wrapper.find('#test').props().woo).toBe('hoo');
  });
});
