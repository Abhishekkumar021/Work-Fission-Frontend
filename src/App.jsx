import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import { backendUrl } from "./utils";
import axios from "axios";
import Loader from "./components/Loader";




export default function App() {
    const [tab, setTab] = useState("view");
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);


    const fetchProducts = async () => {
        setLoading(true);
        await axios.get(`${backendUrl}/api/products/all`).then((response) => {
            console.log("response : ", response.data.products);
            setProducts(response.data.products);
        }).catch((error) => {
            console.error("Error fetching products:", error);
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
                <Loader text="Loading..." />
        );
    }

    return (
        <div className="w-full md:p-4 p-2">

            {tab === 'view' ? (
                <div className="fixed top-0 left-0 w-full z-100 flex justify-center items-center gap-4 shadow-md">
                    <button
                        onClick={() => setTab('submit')}
                        // className="flex mx-auto fixed bottom-4 right-4 w-full max-w-1/6 h-12 text-xl dark:bg-slate-700 text-white bg-zinc-500 hover:bg-blue-700 font-medium rounded-lg items-center justify-center opacity-85 hover:opacity-100 cursor-pointer "
                        className="flex mx-auto fixed bottom-4 right-4 xs:w-60 w-40 h-12 text-xl dark:bg-slate-700 text-white bg-zinc-500 hover:bg-blue-700 font-medium rounded-lg items-center justify-center opacity-85 hover:opacity-100 cursor-pointer "
                    >
                        Add Product
                    </button>
                    <div className="py-4 px-4 mx-auto flex w-full text-center dark:bg-slate-700 bg-zinc-300 dark:text-white text-black rounded-lg items-center justify-center gap-12 opacity-85 hover:opacity-100 ">

                        <button
                            onClick={() => setTab('view')}
                            className="w-full text-xl text-left font-medium rounded-lg items-center justify-center dark:opacity-85 dark:hover:opacity-100 cursor-pointer"
                        >
                            List all the Registered Products
                        </button>

                        <SearchBar search={search} setSearch={setSearch} />

                    </div>
                </div>
            ) : (
                <div className="fixed top-0 left-0 w-full z-100 flex justify-center items-center gap-4 shadow-md text-slate-200">
                    <button
                        onClick={() => setTab('view')}
                        className="flex mx-auto fixed bottom-4 right-4 xs:w-80 xss:w-74 w-60 xss:h-12 h-18 text-xl bg-slate-800 hover:bg-green-400 font-medium rounded-lg items-center justify-center opacity-85 hover:opacity-100 cursor-pointer xs:p-4 p-2"
                    >
                        List all the Registered Products
                    </button>

                    <div className="py-4 flex w-full text-center bg-slate-800  rounded-lg items-center justify-center gap-12 opacity-85 hover:opacity-100 ">

                        <button
                            onClick={() => setTab('submit')}
                            className="w-full h-12 text-xl font-medium rounded-lg items-center justify-center opacity-85 hover:opacity-100 cursor-pointer"
                        >
                            Add Product
                        </button>

                    </div>
                </div>
            )}


            {tab === 'submit' ? (
                <ProductForm onSubmit={fetchProducts} />
            ) : (
                <>
                    <ProductList products={products} search={search} />
                </>
            )}
        </div>
    );
}