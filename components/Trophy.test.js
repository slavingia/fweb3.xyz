import { render, screen } from '@testing-library/react'
import Trophy from './Trophy'

const renderComponent = (props) => <Trophy {...props}/> 

describe('<Trophy />', () => {
  it('renders without crashing', () => {
    renderComponent()
  })
})
