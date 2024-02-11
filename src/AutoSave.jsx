import React from 'react'
import { FormSpy } from 'react-final-form'
import equal from 'fast-deep-equal'

class AutoSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = { values: props.values, submitting: false }
  }

  componentWillReceiveProps() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(this.save, this.props.debounce)
  }

  save = async () => {
    if (this.promise) {
      await this.promise
    }
    const { values, save, valid } = this.props

    const equals = equal(this.state.values, values)
    if (!equals && valid) {
      // values have changed
      this.setState({ submitting: true, values })
      this.promise = save(values)
      await this.promise
      delete this.promise
      this.setState({ submitting: false })
    }
  }

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return null
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
export default props => <FormSpy {...props} subscription={{ values: true, valid: true }} component={AutoSave} />
