import { render, screen } from '@testing-library/react'
import DetailedShowing from '../../pages/DetailedShowing/DetailedShowing'


test('test', () => {
    render(<DetailedShowing/>);
    const detailedshowingElement = screen.getByTestId('todo-1');
    expect(detailedshowingElement).toBeInTheDocument();

})