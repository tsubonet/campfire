import * as React from 'react'
import Button from '../../../components/atoms/button'
import * as renderer from 'react-test-renderer'

test('render test', () => {
  const component = renderer.create(<Button>Test</Button>)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
