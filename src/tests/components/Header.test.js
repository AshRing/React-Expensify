import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../components/Header';

test('should render Header correctly', () => {
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot(); 
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot(); //toJSON extracts the meaningful rendered output from the wrapper
    // expect(wrapper.find('h1').text()).toBe('Expensify');   //pass in selector to .find (similar to querySelector) so we can make assertions about a specific part of it
});
