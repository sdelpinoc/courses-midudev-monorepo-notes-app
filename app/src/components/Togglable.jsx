import { forwardRef, useImperativeHandle, useState } from 'react'

import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel = 'section' }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'} {buttonLabel}</button>
      {
        visible && children
      }
    </>
  )
})

Togglable.displayName = 'Togglable'

// Togglable.defaultProps = {
//   buttonLabel: 'section'
// }

Togglable.propTypes = {
  buttonLabel: PropTypes.string
}

export default Togglable
