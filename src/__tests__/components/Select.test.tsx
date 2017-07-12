import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Select from '../../components/Select'

let nothing = (value) => {};
let options = [
  { value: "1", name: "a" },
  { value: "2", name: "b" },
]

describe('<Select />', () => {
	it('renders', () => {

		const tree = renderer.create(<Select data={ options } onChange={ nothing } />).toJSON()
		expect(tree).toMatchSnapshot()
	})

  it('renders the correct number of <option /> tags', () => {

    const wrapper = shallow(<Select data={ options } onChange={ nothing } />);
    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper.find('option').first().text()).toBe("a");
  });

  it('renders 1 additinal <option/> tag when defaultText is given', () => {

		const tree = renderer.create(<Select defaultText="Default Option" data={ options } onChange={ nothing } />).toJSON()
    const wrapper = shallow(<Select defaultText="Default Option" data={ options } onChange={ nothing } />);

    expect(wrapper.find('option')).toHaveLength(3);
    expect(wrapper.find('option').first().text()).toBe("Default Option");
		expect(tree).toMatchSnapshot()
  });

  it('uses valueKey and valueName to create options from the given data', () => {
    let weirdOptions = [
      { bob: 1, jill: "a", wat: 3 }
      { bob: 2, jill: "b", wat: 3 }
    ];

    const wrapper = shallow(<Select valueKey="bob" nameKey="jill" data={ weirdOptions } onChange={ nothing } />);

    expect(wrapper.find('option')).toHaveLength(2);
    expect(wrapper.find('option').first().text()).toBe("a");
  });

})

