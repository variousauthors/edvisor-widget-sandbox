import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import IntegerRangeInput from '../../components/IntegerRangeInput';

let nothing = (value) => {};
let boundsOptions = [
  { value: 'lte', name: 'less than' },
  { value: 'gte', name: 'greater than' },
  { value: 'any', name: 'any' },
]

let vocab = {
  value: "bob", bounds: "jill"
}

describe('<IntegerRangeInput />', () => {
  it('renders', () => {

    const tree = renderer.create(<IntegerRangeInput boundsOptions={ boundsOptions } onChange={ nothing } />).toJSON()
    expect(tree).toMatchSnapshot()
  });

  it('uses the correct constructs the bounds object onChange', ()=> {

    let onChange = (value) => { expect(value.bounds).toBe(1); };
    const wrapper = shallow(<IntegerRangeInput boundsOptions={ boundsOptions } onChange={ onChange } />);

    wrapper.find('Select').simulate('change', 1);
  });

  it('correctly maps based on the provided vocabulary', ()=> {

    let onChange = (value) => { expect(value.jill).toBe(1); };
    const wrapper = shallow(<IntegerRangeInput vocab={ vocab } boundsOptions={ boundsOptions } onChange={ onChange } />);

    wrapper.find('Select').simulate('change', 1);
  });
});
