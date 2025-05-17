import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils';
import Loader from './Loader';
// import { Carousel } from './ProductList';

function Carousel({ images, interval = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, hasMultipleImages, interval]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full md:h-[650px] h-screen overflow-hidden rounded-lg cursor-pointer">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-center rounded-lg transition-all duration-500"
      />

      {hasMultipleImages && (
        <>
          <button
            onClick={goToPrevious}
            className="flex justify-center items-center text-center absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500 text-3xl bg-opacity-50 text-white px-2 py-1 rounded-full cursor-pointer"
          >
            &#129056;
          </button>
          <button
            onClick={goToNext}
            className="flex justify-center items-center text-center absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white text-3xl px-2 py-1 rounded-full cursor-pointer"
          >
            &#129058;
          </button>
        </>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${backendUrl}/api/products/${id}`).then(res => {
      console.log("Product : ", res.data);
      const found = res.data.product[0];
      // console.log("Found : ", found[0]);
      // const found = res.data.find(p => p.id === parseInt(id));
      setProduct(found);
    });
    setLoading(false);
  }, [id]);

  if (!product || loading) return <Loader />;
  // if (!product || loading) return <div className="p-4 text-center">Loading...</div>;

  return (

    <div className="w-full max-h-full max-w-full mx-auto p-4 bg-white rounded-lg shadow">
      <div
        key={product.id}
        className="flex md:flex-row flex-col h-full gap-8 w-full p-2 max-w-full mx-auto bg-gray-200 dark:bg-slate-600 text-slate-800 dark:text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-101 hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)] hover:drop-shadow-2xl"
      >
        <div className='w-full mx-auto'>

          {product.image_urls && product.image_urls.length > 0 && (
            <Carousel images={product.image_urls} />
          )}
        </div>

        <div className="w-full p-2">
          <h2 className="text-xl font-bold text-justify ">{product.name}</h2>
          <p className="text-xl font-semibold text-justify">Price : $ {product.price}</p>
          <div className="text-slate-700 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-200 md:max-h-[580px] h-full md:overflow-y-auto overflow-hidden mt-8 md:pr-4" id="prod-detail-description">
            <p className="text-justify text-lg" >
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
