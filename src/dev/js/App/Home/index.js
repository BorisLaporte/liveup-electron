import React, { Component } from 'react'
import {Link} from 'react-router'

import './home.scss'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/auth">Auth</Link>
      </div>
    )
  }
}
