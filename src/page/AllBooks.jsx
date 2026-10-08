import { useEffect, useState } from "react";    
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import useWishlistContext from "../context/WishlistContext";
import useCartContext from "../context/CartContext";
import useFetch from "../Hooks/useFetch";

const AllBooks = ({search})=>{
    const {addToWishlist} = useWishlistContext()
    const {addToCart} = useCartContext()

    
    const [price, setPrice] = useState(Number(sessionStorage.getItem("filter_price")) || (3000)) 
    const [rating, setRating] = useState(Number(sessionStorage.getItem("filter_rating"))|| 0) 
    const [category, setCategory] = useState(sessionStorage.getItem("filter_category") || "")
    const [sort, setSort] = useState(sessionStorage.getItem("filter_sort")|| "")

    const {data, loading, error} =useFetch(
        "https://backend-book-breeze-mu.vercel.app/books", {allBooks: []}
    )

    useEffect(()=>{
        sessionStorage.setItem("filter_price", price)
        sessionStorage.setItem("filter_rating", rating)
        sessionStorage.setItem("filter_category", category)
        sessionStorage.setItem("filter_sort", sort)
    }, [price, rating, category, sort])
    
    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading Books...</h4>
            </div>
        )
    }

    if(error){
        return(
            <div className="container text-center py-5">
                <h4>Something went Wrong</h4>
                <p>{error}</p>
            </div>
        )
    }

        let filteredBooks = data.allBooks
            .filter((book)=> book.title.toLowerCase().includes(search.toLowerCase()))
            .filter((book)=> book.price <= price)
            .filter((book)=> book.rating >= rating)
            .filter((book)=> (category ? book.categories === category : true))

        if(sort === "low"){
            filteredBooks = [...filteredBooks].sort((a,b) => a.price - b.price)
        }
        if(sort === "high"){
            filteredBooks = [...filteredBooks].sort((a,b)=> b.price - a.price)
        }

    return(
        <div style={{backgroundColor: "#EFE9E3"}} className=" min-vh-100">
            
            <div className="container py-4">
            <h1 className="mb-2">All Books</h1>
            </div>
            <div className="container">
                <div className="row g-4">
                    {/* Sidebar */}
                    <div className="col-12 col-md-3">
                        <div className="card p-3">
                            <Filter 
                            price={price} setPrice={setPrice}
                            rating={rating} setRating={setRating}
                            category={category} setCategory={setCategory}
                            sort={sort} setSort={setSort}
                            />
                        </div>
                    </div>

                    {/* Books*/}
                    <div className="col-12 col-md-9 mb-4">
                        { filteredBooks.length === 0 ? (
                            <div className="text-center py-5">
                                <h4 className="text-muted">No books found</h4>
                                <p className="text-muted">Try changing filters</p>
                            </div>
                        ):(
                            <div className="row g-4">
                            {filteredBooks.map((book)=>(
                                <div className="col-12 col-sm-6 col-md-4" key={book._id}>
                                    <div className="card h-100">
                                        <Link to={`/product/${book._id}`}
                                        className="text-decoration-none"
                                        >
                                        <img
                                        src={book.image} 
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{height : "300px", objectFit: "contain"}}
                                        />
                                        </Link>
                                        <button className="btn btn-light position-absolute top-0 end-0 m-1"
                                        
                                        onClick={()=> addToWishlist(book?._id)}
                                        >
                                                ♡
                                            </button>
                                        <div className="card-body">
                                            <Link to={`/product/${book._id}`}
                                                style={{color: "#4A4A4A"}}
                                                className="text-decoration-none"
                                                >
                                            <h5 className="card-title" style={{ minHeight: "48px", fontSize: "1.2rem" }} >
                                                {book.title}
                                                </h5>
                                                </Link>
                                                <p className="card-text small" >Author: {book.author}</p>
                                            <p className="mb-2">Rating: ⭐{book.rating}</p>
                                            <p className="fw-bold mb-3">Price: ${book.price}</p>
                                            <button className="btn w-100 shadow" 
                                            style={{background : "#C9B59C"}}
                                            onClick={()=> addToCart(book?._id)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                        
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AllBooks