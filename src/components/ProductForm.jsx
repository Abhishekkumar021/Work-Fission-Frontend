// import { useState } from 'react';
// import axios from 'axios';

// export default function ProductForm({ onSubmit }) {
//     const [form, setForm] = useState({ name: '', price: '', description: '', image_url: '' });

//     const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async e => {
//         e.preventDefault();
//         await fetch('http://localhost:5000/api/products/add', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(form),
//         });
//         onSubmit();
//         setForm({ name: '', price: '', description: '', image_url: '' });
//     };

//     return (
//         <div className="w-full flex flex-col items-center justify-center mx-auto p-4 bg-white shadow-md rounded-lg text-slate-600">
//             <h1 className="text-2xl font-bold mb-4">Product Submission</h1>

//             <form onSubmit={handleSubmit} className="w-full">
//                 {['Name', 'Price', 'Description', 'Image_url'].map(field => (
//                     <div key={field} className="w-full flex mb-4 gap-8">
//                         <label htmlFor={field} className='text-xl font-bold'>{field === 'Image_url' ? 'Image URL' : field} : </label>
//                         <input
//                             key={field}
//                             name={field}
//                             placeholder={field === 'Image_url' ? 'https://example.com/image.jpg' : field}
//                             value={form[field]}
//                             onChange={handleChange}
//                             className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             type={field === 'Price' ? 'number' : field === 'Description' ? 'textarea' : 'text'}
//                             required
//                         />
//                     </div>
//                 ))}
//                 <button className="bg-blue-500 px-4 py-2 text-white rounded-lg text-2xl" type="submit">Submit</button>
//             </form>

//         </div>
//     );
// }


import { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../utils';
import Loader from './Loader';



export default function ProductForm({ onSubmit }) {
    const [form, setForm] = useState({ name: '', price: '', description: '', image_urls: [] });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        if (e.target.name === 'image_url') {
            // const urls = e.target.value.split(',').map(url => url.trim());
            setForm({ ...form, image_urls: e.target.value.split(',').map(url => url.trim()) });
        } else {

            setForm({ ...form, [e.target.name.toLowerCase()]: e.target.value })
        }
    };

    const handleSubmit = async e => {
        setLoading(true);
        e.preventDefault();
        console.log("Form : ", form)
        await axios.post(`${backendUrl}/api/products/add`, form);
        onSubmit();
        setForm({ name: '', price: '', description: '', image_urls: [] });
        setLoading(false);
    };

    return (
        <div className="w-full md:max-w-7xl max-w-full mx-auto p-6 my-20 xs:mt-0 dark:bg-white bg-slate-700 shadow-[0px_3px_1px_rgba(105,105,105,_1),_0_3px_5px_rgba(47,79,79,_1)] rounded-lg dark:text-gray-800 text-slate-200">
            <h1 className="text-3xl font-bold mb-6 text-center dark:text-gray-800 text-slate-100 ">Product Submission</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {[
                    { label: 'Name', name: 'name', type: 'text' },
                    { label: 'Price', name: 'price', type: 'number' },
                    // { label: 'Image URL', name: 'image_url', type: 'text' },
                ].map(({ label, name, type }) => (

                    <div key={name} className="flex flex-col xs:flex-row xs:items-center items-start xs:text-center text-left gap-y-2">

                        <label htmlFor={name} className="w-40 text-lg font-semibold dark:text-gray-700 text-slate-100">{label} : </label>

                        <input
                            id={name}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            placeholder={label === 'Image URL' ? 'Enter comma separated image URL' : label}
                            type={type}
                            required
                            className="w-xl max-w-full h-12 flex-1 border dark:text-gray-700 text-slate-100 border-gray-300 dark:border-slate-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                ))}
                <div className="flex flex-col xs:flex-row xs:items-center items-start xs:text-center text-left gap-y-2">

                    <label htmlFor='Image URL' className="w-40 text-lg font-semibold dark:text-gray-700 text-slate-100">Image URL : </label>

                    <textarea
                        id='image_url'
                        name='image_url'
                        value={form['image_urls'].join(', ')}
                        onChange={handleChange}
                        placeholder='Enter comma separated image URL'
                        rows={3}
                        required
                        className="w-xl max-w-full flex-1 dark:text-gray-700 text-slate-100 min-h-20  border border-gray-300 dark:border-slate-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    />
                </div>
                <div className="flex flex-col xs:flex-row xs:items-center items-start xs:text-center text-left gap-y-2">

                    <label htmlFor='description' className="w-40 text-lg font-semibold dark:text-gray-700 text-slate-100">Description : </label>

                    <textarea
                        id='description'
                        name='description'
                        value={form['description']}
                        onChange={handleChange}
                        placeholder='Description'
                        rows={4}
                        required
                        className="w-xl max-w-full flex-1 dark:text-gray-700 text-slate-100 min-h-24 border border-gray-300 dark:border-slate-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    />
                </div>



                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-800 cursor-pointer transition duration-200 ease-in-out hover:shadow-lg shadow-[0px_3px_1px_rgba(105,105,105,_1),_0_3px_5px_rgba(47,79,79,_1)]"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}
