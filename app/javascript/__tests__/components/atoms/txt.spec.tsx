import * as React from 'react'
import Txt from '../../../components/atoms/txt'
import * as renderer from 'react-test-renderer'

test('render test', () => {
  const component = renderer.create(<Txt>Test</Txt>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
