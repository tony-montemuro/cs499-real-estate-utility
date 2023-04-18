import { render, screen } from '@testing-library/react';
import REUNavbar from './ui/Navbar/Navbar.jsx';
import DetailedListing from "./pages/DetailedListing/DetailedListing.jsx";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing.jsx";
import Forms from "./pages/Forms/Forms.jsx";
import Home from "./pages/Home/Home.jsx";
import App from "./App";
import PropertyListing from "./pages/PropertyListing/PropertyListing.jsx";
import ShowingsListing from "./pages/ShowingsListing/ShowingsListing.jsx";
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


test('Render Home Page', () => {
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId("intro")).toBeTruthy();
});

//test('Render Forms Page', async () => {
  //  const { queryByTestId } = render(
  //      <MemoryRouter>
  //          <Forms />
  //      </MemoryRouter>
  //  );
  //  const sidebar = queryByTestId("sidebar");
 //   expect(within(sidebar).getByText('hello'));
//})

//test('Render Property Listings Page', async () => {
//    render(
 //       <MemoryRouter>
//           <PropertyListing />
//        </MemoryRouter>
//    )
//})

//test('Render Property Showings Page', async () => {
//    render(
//        <MemoryRouter>
//            <ShowingsListing />
//        </MemoryRouter>
//    )
//})






