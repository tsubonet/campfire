import * as React from 'react'
import styled from 'styled-components'
import Input from '../atoms/input'

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <Root>
    {console.log(input)}
    <label>{label}</label>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </Root>
)
export default RenderField

const Root = styled.div`
  display: flex;

  & > *:first-child {
    width: 100px;
    text-align: right;
    padding: 12px;
    font-weight: bold;
  }
`
