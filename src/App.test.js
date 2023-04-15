import { render, screen } from '@testing-library/react';
import REUNavbar from './ui/Navbar/Navbar.jsx';
import DetailedListing from "./pages/DetailedListing/DetailedListing.jsx";
import DetailedShowing from "./pages/DetailedShowing/DetailedShowing.jsx";
import Forms from "./pages/Forms/Forms.jsx";
import Home from "./pages/Home/Home.jsx";
import PropertyListing from "./pages/PropertyListing/PropertyListing.jsx";
import ShowingsListing from "./pages/ShowingsListing/ShowingsListing.jsx";

test('Render Property Listing', () => {
    render(<PropertyListing />)   
});

test('Render Showings Listing', () => {
    render(<ShowingsListing />)
});

test('Render Forms Page', () => {
    render(<Forms />)
});

test('Render Hoem Page', () => {
    render(<Home />)
});

test('Render Detailed Showing', () => {
    render(<DetailedShowing />)
});

test('Render Detailed Listing', () => {
    render(<DetailedListing />)
});