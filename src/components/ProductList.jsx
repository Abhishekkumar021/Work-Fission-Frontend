// import { useState } from "react";



// export default function ProductList({ products, search }) {


//   const filtered = products.filter(product =>

//     product.name.toLowerCase().includes(search.toLowerCase()) ||
//     product.description.toLowerCase().includes(search.toLowerCase())

//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-12">

//       {filtered.map(product => (

//         <div key={product.id} className="w-full p-4 max-w-sm mx-auto bg-gray-200 dark:bg-slate-600 text-slate-800 dark:text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-101 hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)] hover:drop-shadow-2xl hover:text-blue-700 dark:hover:bg-gray-500 hover:bg-gray-300 cursor-pointer">

//           {product.image_urls &&
//             product.image_urls.map((image_url, index) => (
//               <img key={index} src={image_url} alt={product.name} className="w-full rounded-lg" />
//             ))
//             // <img src={product.image_url} alt={product.name} className="w-full rounded-lg" />
//           }

//           <div className="p-2">

//             <h2 className="text-xl font-bold text-justify">{product.name}</h2>
//             <div className="text-slate-700 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-200">

//               <p className="text-xl font-semibold">$ {product.price}</p>

//               <p className="mt-2 text-justify text-lg">{product.description.slice(0, 100)}</p>
//             </div>

//           </div>

//         </div>

//       ))}

//     </div>

//   );
// }



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


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

  // const goToPrevious = () => {
  //   setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  // };

  // const goToNext = () => {
  //   setCurrentIndex(prev => (prev + 1) % images.length);
  // };

  return (
    <div className="relative w-full h-full max-h-[500px] overflow-hidden rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full max-h-[500px] object-cotain rounded-lg transition-all duration-500"
      />

      {/* {hasMultipleImages && (
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
      )} */}
    </div>
  );
}

export default function ProductList({ products, search }) {
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Filtered : ", filtered)
  if (filtered.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 ">
          We couldn't find any products.
        </h1>
        <p className="text-lg font-semibold text-slate-700 dark:text-gray-400">
          Please add a product or try searching with different keywords.
        </p>
      </div>
    );
  }


  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-12">
      {filtered.map(product => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <div
            key={product.id}
            className="w-full h-screen max-h-[800px] p-2 max-w-sm mx-auto bg-gray-200 dark:bg-slate-600 text-slate-800 dark:text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-101 hover:shadow-[0_15px_35px_rgba(255,255,255,0.3)] hover:drop-shadow-2xl hover:text-blue-700 dark:hover:bg-gray-500 hover:bg-gray-300 cursor-pointer"
          >
            {product.image_urls && product.image_urls.length > 0 && (
              <Carousel images={product.image_urls} />
            )}

            <div className="p-2">
              <h2 className="text-xl font-bold text-justify" title={product.name}>{product.name.slice(0, 25).trim()}{product.name.length > 32 && "..."}</h2>
              <div className="text-slate-700 hover:text-gray-700 dark:text-slate-300 dark:hover:text-slate-200">
                <p className="text-xl font-semibold">$ {product.price}</p>
                <p className="mt-2 text-justify text-lg">
                  {product.description.slice(0, 100).trim()}{product.description.length > 100 && "..."}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}