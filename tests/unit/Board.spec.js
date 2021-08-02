import { render, screen } from '@testing-library/vue'
import Board from '../../src/components/Board'
jest.mock('../../src/components/Board')

describe('Board Component', () => {
   it('should render Board page', () => {
     render(Board)
     expect(Board).toMatchSnapshot()
   })
})
