import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {getWindowSize} from 'STORE/responsive/actions'

class App extends Component {

  componentWillMount() {
    const {dispatch} = this.props
    dispatch(getWindowSize())
  }

  componentDidMount() {
    this.setListenerResponsive()
  }

  setListenerResponsive(){
    const {dispatch} = this.props
    window.onresize = () => {
      dispatch(getWindowSize())
    }
  }

  render() {
    const {children} = this.props
    return (
      <div className="wrapper">
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  dispatch: PropTypes.function
}

function mapStateToProps(state) {
  
  return {}
}

export default connect(mapStateToProps)(App)
