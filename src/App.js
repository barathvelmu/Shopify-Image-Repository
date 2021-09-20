import React, { useState, useEffect } from 'react';
import './App.css';
import { SRLWrapper } from 'simple-react-lightbox';
import images from './data';
import Search from './search';


// optional: for lightbox setting configurations if needed
const customization = {
  settings: {

  },
  buttons: {
    iconColor: 'white'
  }
};


// search logic
const searchBarImages = (images, query) => {
  if (!query) {
      return images;
  }
  return images.filter((image) => {
      const name = image.nameOfImage.toLowerCase();
      const tag = image.tag.toLowerCase();
      return (name.includes(query) || tag.includes(query));
  });
};


function App() {
  // states 
  const [tag, setTag] = useState('all'); // default will be all pictures
  const [categoryImage, setCategoryImages] = useState([]); // useState to manage tags

  // obtain the search query (asked item) 
  const { search } = window.location;
  const query = new URLSearchParams(search).get('image');

  // set
  const searchedResults = searchBarImages(images, query);

  useEffect( () => {
    tag === 'all' ? setCategoryImages(images) : setCategoryImages(images.filter( image => image.tag === tag))
  }, [tag])

  return (
      <div className="App">

	<div className="tags">
		<TagButton name="all" currentTags={tag === 'all' ? true : false} setTagValue={setTag} /> /
		<TagButton name="earth" currentTags={tag === 'earth' ? true : false} setTagValue={setTag} /> /
		<TagButton name="water" currentTags={tag === 'water' ? true : false} setTagValue={setTag} /> /
		<TagButton name="building" currentTags={tag === 'building' ? true : false} setTagValue={setTag} />
	</div>

      <Search />

      <div><h1>Search Result(s):</h1></div>

      <SRLWrapper customization = {customization} >
      <div className="container">  
          { searchedResults.map( image => (
            <div key={image.id} className="image-card"> 
              <img className = "image" src={`/images/${image.nameOfImage}`} alt=""/>
            </div>
          ))} 
        </div>


        <div><hr class="dotted"></hr></div>


        <div><h1>All Pictures:</h1></div>

        <div className="container">  
          { categoryImage.map( image => (
            <div key={image.id} className="image-card"> 
              <img className = "image" src={`/images/${image.nameOfImage}`} alt=""/>
            </div>
          ))} 
        </div>
      </SRLWrapper>

    </div>
  );
}

const TagButton = ( {name, setTagValue, currentTags} ) => {
  return <button className = {`tag ${ currentTags ? 'current' : null}`} onClick={ () => setTagValue(name)}>
            { name.toUpperCase()}
         </button>
}

export default App;
