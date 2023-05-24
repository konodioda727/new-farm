import { Component, PropsWithChildren } from 'react'
import './styles/index.scss'

class App extends Component<PropsWithChildren> {

  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
