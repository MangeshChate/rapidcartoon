import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleStyleChange = (e) => {
    setSelectedStyle(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!image) {
      setError('Please select an image');
      return;
    }

    if (!selectedStyle) {
      setError('Please select a cartoon style');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image, image.name); // Append the image with its name
    formData.append('type', selectedStyle);

    const options = {
      method: 'POST',
      url: 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation',
      headers: {
        'X-RapidAPI-Key': 'ea866fa16emsh097cbcda0b88f1bp1dc333jsn83f4fdf02b7b',
        'X-RapidAPI-Host': 'cartoon-yourself.p.rapidapi.com',
        'Content-Type': 'multipart/form-data', // Explicitly set Content-Type
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      setResponse(response.data);
    } catch (error) {
      setError('An error occurred while processing the request');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen text-white' style={{ backgroundImage: "url('https://25.media.tumblr.com/b946ffa61d51c8d4ced26d2887b1d328/tumblr_mj58ecDhxg1rv7cdvo1_500.gif')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h3 className='font-bold text-3xl pl-5  pt-3 text-white'>Cartoonizer
      <span className='text-lg ml-5'>Home</span>
      </h3>
      
    <div className='grid grid-cols-2 '>

    <div className="ml-[200px]  mx-auto p-4 flex flex-col w-[500px] mt-[100px] bg-transparent rounded-2xl ">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mb-4 p-2 border rounded text-white"
    />
    
    <select
      value={selectedStyle}
      onChange={handleStyleChange}
      className="mb-4 p-2 border rounded text-black"
    >
      <option value="">Select Cartoon Style</option>
      {/* <option value="Pixar">Pixar</option> */}
      <option value="pixar_plus">Pixar Plus</option>
      {/* Add more options based on your list */}
    </select>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <button
      onClick={handleButtonClick}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Make Cartoon
    </button>
   
  
  </div>
  <div className='pt-15'>
  {image && (
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        className="mb-4 w-[200px] mt-20 "
      />
    )}
<div className='mt-3'>

{loading && <p>Loading...</p>}
    {response && response.data && (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Result Image:</h2>
        <img
          src={response.data.image_url}
          alt="Result"
          className="max-w-full max-h-400"
        />
      </div>
    )}
</div>

  </div>
    </div>
    </div>
  );
};

export default App;
