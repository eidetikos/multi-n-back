import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../app/Header';

describe('Header', () => {
  it('shows Header component', () => {

    const wrapper = shallow(
      <Header />
    );
    expect(wrapper).toMatchSnapshot();
  });
});