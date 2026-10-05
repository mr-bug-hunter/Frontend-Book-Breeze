import { useEffect, useState } from "react";    
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import useWishlistContext from "../context/WishlistContext";
import useCartContext from "../context/CartContext";
import useFetch from "../Hooks/useFetch";

const AllBooks = ({search})=>{
    const {addToWishlist} = useWishlistContext()
    const {addToCart} = useCartContext()

    
    const [price, setPrice] = useState(3000)
    const [rating, setRating] = useState(0)
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("")

    const {data, loading, error} =useFetch(
        "https://backend-book-breeze-mu.vercel.app/books", {allBooks: []}
    )
    
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
                    <div className="col-12 col-md-9">
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
                                            <h5 className="card-title">
                                                <Link to={`/product/${book._id}`}
                                                style={{color: "#4A4A4A"}}
                                                className="text-decoration-none"
                                                >
                                                {book.title}
                                                </Link>
                                                
                                                </h5>
                                            <p>⭐{book.rating}</p>
                                            <p className="fw-bold">${book.price}</p>
                                            <button className="btn w-100" 
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
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AllBooks