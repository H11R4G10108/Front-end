import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function SearchResult() {
    const [loading, setLoading] = useState(false);
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [products, setProduct] = useState([]);
    const {searchstring} = useParams();
    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const response = await axios.get(baseUrl + '/search-products/' + searchstring)
            setProduct(response.data);
            setLoading(false);
        };
        loadProduct();
    }, []);
    return (<div>
        <h3>Search Results</h3>
        {products &&
            products.map((product, index) => (
                <div id="product-list" className="hover:shadow-lg " key={index}>
                    <Link to={`/product/${product.productID}`}>
                        <img
                            src={product.image}
                            alt="Product Image"
                            className="w-full mb-2 "
                        />
                        <div id="product-content" className="p-2 leading-5">
                            <h2 className="font-bold mb-1">{product.name}</h2>
                            <p className="mb-2">${product.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
    </div>);
}

export default SearchResult;