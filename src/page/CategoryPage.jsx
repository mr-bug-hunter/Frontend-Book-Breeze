import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import useWishlistContext from "../context/WishlistContext"
import useCartContext from "../context/CartContext"
import useFetch from "../Hooks/useFetch"



const CategoryPage = ({search = ""})=>{


    
    const {categoryName}= useParams()
    const {addToWishlist} = useWishlistContext()
    const {addToCart} = useCartContext()

    const [price, setPrice] = useState(Number(sessionStorage.getItem("category_price"))|| 3000)
    const [rating, setRating] = useState(Number(sessionStorage.getItem("category_rating")) || 0)
    const [sort, setSort] = useState(sessionStorage.getItem("category_sort") || "")
    const [category, setCategory] = useState([categoryName]) // this set current sate category default
    
    const {data, loading, error} = useFetch(
        `https://backend-book-breeze-mu.vercel.app/books`, {allBooks: []}
    )

    useEffect(()=>{
        sessionStorage.setItem("category_price", price)
        sessionStorage.setItem("category_rating", rating)
        sessionStorage.setItem("category_sort", sort)
    }, [price, rating, sort])

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

    let filteredBooks = (data.allBooks || [])
            .filter((book)=> book.title?.toLowerCase().includes(search.toLowerCase()))
            .filter((book)=> book.price <= price)
            .filter((book)=> book.rating >= rating)
            .filter((book)=> category.length === 0 ? true : category.includes(book.categories))

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
                                    setCategory([categoryName]) //current category
                                    setSort("")
                                    sessionStorage.removeItem("category_price")
                                    sessionStorage.removeItem("category_rating")
                                    sessionStorage.removeItem("category_sort")
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
                                className="form-range"
                                min="0"
                                max="3000"
                                value={price}
                                onChange={(e)=> setPrice(Number(e.target.value))}
                                />
                            </div>
                            <hr />


                            {/* Category Filter */}
                            <div>
                                <h6>Category</h6>
                                {["Sci-Fi", "Novel", "Autobiography", "Political Fiction", "Horror", "Romance"].map((cat)=> (
                                    <div key={cat}>
                                        <input 
                                            type="checkbox" 
                                            name="categorySwitch" 
                                            checked={category.includes(cat)}
                                            onChange={(e) => {
                                                if(e.target.checked){
                                                    setCategory([...category, cat])
                                                } else{
                                                    setCategory(category.filter((c)=> c !== cat))
                                                }
                                            }}
                                            />
                                            <label className="ms-2">{cat}</label>
                                    </div>
                                ))}
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
                    { filteredBooks.length === 0 ? (
                        <div className="text-center py-5">
                            <h4 className="text-muted" >No books found in this category</h4>
                            <p className="text-muted">Try changing filters</p>
                        </div>
                    ):(
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
                                <h5 className="card-title" style={{ minHeight: "48px", fontSize: "1.2rem"}}>
                                    <Link
                                        to={`/product/${book._id}`}
                                        className="text-decoration-none"
                                        style={{color: "#4A4A4A"}}
                                        >
                                        {book.title}
                                    </Link>
                                </h5>
                            
                                <p className="card-text small">
                                   Author: {book.author}
                                </p>

                                <p>
                                   Rating: ⭐{book.rating}
                                </p>

                                <p className="fw-bold">
                                    Price: ${book.price}
                                </p>

                                    <button
                                    className="w-100 py-2 m-0 text-center rounded shadow"
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
        </>
    )
}

export default CategoryPage