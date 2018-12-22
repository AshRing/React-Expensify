import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
   const wrapper = shallow(<ExpenseForm />);
   wrapper.find('form').simulate('submit', {
       preventDefault: () => {}    //pass in this object to simulate preventDefault. Test will fail without it
   }); 
   expect(wrapper.state('error').length).toBeGreaterThan(0);
   expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'test';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {   //this object represents 'e'. set the target property to simulate something being passed in the description field
        target: {value}
    });  // wrapper.find('input').at(0) finds the input at index 0, which is the description input
    expect(wrapper.state('description')).toBe(value);
 });

 test('should set note on input change', () => {
    const value = 'test';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {   
        target: {value}
    }); 
    expect(wrapper.state('note')).toBe(value);
 });

 test('should set state.amount when valid amount entered', () => {
    const value = '123.45';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
 });

 test('should not change state when wrong amount entered', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
 });

test('should call onSubmit prop for valid form submission', () => {  //makes sure onSubmit is being called with the appropriate info passed in
    const onSubmitSpy = jest.fn(); //this function calls a new spy, a mocked function
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}   
    }); 
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({   
        description: expenses[1].description,
        note: expenses[1].note,
        amount: expenses[1].amount.toFixed(2),
        createdAt: expenses[1].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);   //when SingleDatePicker component fires prop onDateChange with now as its data
    expect(wrapper.state('createdAt')).toEqual(now); //expect the state to equal now
});

test('should set calenderFocused on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true}); 
    expect(wrapper.state('calenderFocused')).toEqual(true); 
});