import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/Footer';

test('Footer renders correctly', () => {
  const component = renderer.create(<Footer />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

})
