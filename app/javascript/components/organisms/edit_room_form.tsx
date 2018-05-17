import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RenderField from '../molecules/render_field'

const EditRoomForm = props => {
  const { invalid, error, handleSubmit, pristine, reset, submitting } = props
  return (
    <Root>
      <form onSubmit={handleSubmit}>
        {error && <strong>{error}</strong>}
        <Field name="name" type="text" component={RenderField} label="name" />

        <button type="submit" disabled={invalid || submitting}>
          Submit
        </button>
      </form>
    </Root>
  )
}

export const validate = values => {
  const errors: { name? } = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 8) {
    errors.name = 'Must be 8 characters or less'
  }
  return errors
}

export default reduxForm({
  form: 'editRoom',
  enableReinitialize: true,
  validate,
})(EditRoomForm)

const Root = styled.div`
  padding: 20px;
`
