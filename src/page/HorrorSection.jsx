import { useState } from "react"
import { Link } from "react-router-dom"
import useCartContext from "../context/CartContext"
import useWishlistContext from "../context/WishlistContext"
import useFetch from "../Hooks/useFetch"

const HorrorSection = ({search = ""})=>{

    const {addToCart} = useCartContext()
    const {addToWishlist} = useWishlistContext()

    const [price, setPrice] = useState(3000)
    const [rating, setRating] = useState(0)
    const [sort, setSort] = useState("")

    const {data, loading, error}= useFetch(
        "https://backend-book-breeze-mu.vercel.app/books/category/Horror", {books: []}
    )

    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading Horror Books... </h4>
            </div>
        )
    }

    if(error){
        return(
            <div className="container text-center py-5">
                <h4>Something went Wrong...</h4>
                <p>{error}</p>
            </div>
        )
    }

    let filteredBooks = data.books
        .filter((book)=> book.title?.toLowerCase().includes(search.toLowerCase()))
        .filter((book)=> book.price <= price)
        .filter((book)=> book.rating >= rating)

        if(sort === "low"){
            filteredBooks = [...filteredBooks].sort((a, b)=> a.price - b.price)
        }
        if(sort === "high"){
            filteredBooks = [...filteredBooks].sort((a, b)=> b.price - a.price)
        }
    return (
        <>
        <div style={{background: "#0F0F0F"}} >
        <div className="container py-4">
            <h1 className="mb-4" style={{ color : "#972828"}}> 
                <strong>Horror Books</strong> 
                </h1>
                <div className="row g-4">
                    <div className="col-12 col-md-3">
                        <div className="card p-3">
                            <div className="d-flex justify-content-between">
                                <h5 style={{ color : "#972828"}}>Filter</h5>
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
                                <h6 style={{ color : "#972828"}}>Price: ${price}</h6>
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
                                <h6 style={{ color : "#972828"}}>Rating</h6>
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
                                <h6 style={{ color : "#972828"}}>Sort By</h6>
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

                

                <div className="col-12 col-md-9">
                    <div className="row g-4">
                        {filteredBooks.map((book)=>(
                            <div className="col-12 col-sm-6 col-md-4" key={book._id}>
                                <div className="card h-100">
                                    <button
                                        className="btn btn-light position-absolute top-0 end-0 m-1"
                                        onClick={()=> addToWishlist(book?._id)}
                                        >
                                            ♡
                                        </button>
                                    <Link to={`/product/${book._id}`}
                                    className="text-decoration-none"
                                    >
                                        <img 
                                        src={book.image} 
                                        alt={book.title}
                                        className="card-img-top"
                                        style={{height: "300px", objectFit: "contain"}}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title" >
                                            <Link to={`/product/${book._id}`} 
                                            style={{color: "#500073"}}
                                            className="text-decoration-none"
                                            >{book.title}</Link> 
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

                                        <button className="w-100 py-2 m-0 text-center rounded text-light" 
                                        style={{background: "#464858"}}
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

export default HorrorSection