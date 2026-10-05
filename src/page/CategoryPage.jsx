import { useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import useWishlistContext from "../context/WishlistContext"
import useCartContext from "../context/CartContext"
import useFetch from "../Hooks/useFetch"


const CategoryPage = ({search = ""})=>{


    const {categoryName}= useParams()
    const {addToWishlist} = useWishlistContext()
    const {addToCart} = useCartContext()

    const [price, setPrice] = useState(3000)
    const [rating, setRating] = useState(0)
    const [sort, setSort] = useState("")
    
    const {data, loading, error} = useFetch(
        `https://backend-book-breeze-mu.vercel.app/books/category/${categoryName}`, {books: []}
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

    let filteredBooks = data.books
            .filter((book)=> book.title?.toLowerCase().includes(search.toLowerCase()))
            .filter((book)=> book.price <= price)
            .filter((book)=> book.rating >= rating)

        if(sort === "low"){
            filteredBooks = [...filteredBooks].sort((a,b) => a.price - b.price)
        }
        if(sort === "high"){
            filteredBooks = [...filteredBooks].sort((a,b)=> b.price - a.price)
        }

    return(
        <>
        <div style={{backgroundColor: "#EFE9E3"}} >
        <div className="container py-4">
            <h1 className="mb-4">
                {categoryName} Books
            </h1>
            <div className="row g-4">
                <div className="col-12 col-md-3 ">
                    <div className="card p-3" >
                        <div>
                            <div className="d-flex justify-content-between">
                                <h5>Filters</h5>
                                <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={()=>{
                                    setPrice(3000)
                                    setRating(0)
                                    setSort("")
                                }}
                                >
                                    Clear
                                </button>
                            </div>
                            <hr />

                            {/* Price */}
                            <div>
                                <h6>Price: ${price}</h6>
                                <input 
                                type="range"
                                min="0"
                                max="3000"
                                value={price}
                                onChange={(e)=> setPrice(Number(e.target.value))}
                                />
                                <div className="d-flex justify-content-between">
                                    <span>0</span>
                                    <span>1500</span>
                                    <span>3000</span>
                                </div>
                            </div>
                            <hr />

                            {/* Rating */}
                            <div>
                                <h6>Rating</h6>
                                {[4,3,2,1].map((star)=>(
                                    <div key={star}>
                                        <input 
                                        type="radio" 
                                        name="rating"
                                        checked={rating === star}
                                        onChange={()=> setRating(star)}
                                        />
                                        <label className="ms-2">{star} Star & above</label>
                                    </div>
                                ))}
                            </div>
                            <hr />

                            {/* Sort */}
                            <div>
                                <h6>Sort By</h6>
                                <div>
                                    <input 
                                    type="radio" 
                                    name="sort"
                                    checked={sort === "low"}
                                    onChange={()=> setSort("low")}
                                    />
                                    <label className="ms-2">Price - Low to High</label>
                                </div>
                                <div>
                                    <input 
                                    type="radio" 
                                    name="sort" 
                                    checked={sort === "high"}
                                    onChange={()=> setSort("high")}
                                    />
                                    <label className="ms-2">Price - High to Low</label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-12 col-md-9" >
                    <div className="row g-4" >
                {filteredBooks.map((book)=>(
                    <div className="col-12 col-sm-6 col-md-4 "
                        key={book._id}
                    >
                        
                        <div className="card h-100">
                            <Link to={`/product/${book._id}`}
                                        className="text-decoration-none"
                                        >
                            <img 
                            src={book.image}
                            className="card-img-top" 
                            alt={book.title} 
                            style={{ height: "300px", objectFit: "contain"}}
                            />
                            
                            </Link>
                            <button
                            className="btn btn-light position-absolute top-0 end-0 m-2"
                            style={{ zIndex: 2}}
                            onClick={()=> addToWishlist(book._id)}
                            >
                                ♡
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link
                                        to={`/product/${book._id}`}
                                        className="text-decoration-none"
                                        style={{color: "#4A4A4A"}}
                                        >
                                        {book.title}
                                    </Link>
                                </h5>
                            
                                <p className="card-text">
                                    {book.author}
                                </p>

                                <p>
                                    ⭐{book.rating}
                                </p>

                                <p className="fw-bold">
                                    ${book.price}
                                </p>

                                    <button
                                    className="w-100 py-2 m-0 text-center"
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
        </>
    )
}

export default CategoryPage