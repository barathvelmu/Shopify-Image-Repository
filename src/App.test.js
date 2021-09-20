import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


test('should output 32 total pictures', () => {
  render(<App />); 

  let images = screen.getAllByRole('img');
  expect(images.length).toEqual(32);

});


test('searchbar test', () => {
  render(<App />); 

  const searchBar = screen.getByRole('textbox'); 
  userEvent.type(searchBar, 'img10');
  expect(searchBar).toHaveValue('img10')
});


test('gives total 5 buttons', () => {
  render(<App />); 
  
  let images = screen.getAllByRole('button');
  expect(images.length).toEqual(5);
});


