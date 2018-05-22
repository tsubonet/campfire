import * as React from 'react'
import Time from '../../../components/atoms/time'
import * as renderer from 'react-test-renderer'

test('render test', () => {
  const component = renderer.create(<Time>2018-05-18T11:52:29.241Z</Time>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
