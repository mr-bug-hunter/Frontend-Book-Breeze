import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useCartContext from "../context/CartContext"
import useWishlistContext from "../context/WishlistContext"
import useFetch from "../Hooks/useFetch"

const RomanceSection = ({search = ""})=>{


    const {addToCart} = useCartContext()
    const {addToWishlist} = useWishlistContext()

    const [price, setPrice] = useState(Number(sessionStorage.getItem("romance_price")) || 3000)
    const [rating, setRating] = useState(Number(sessionStorage.getItem("romance_rating")) || 0)
    const [sort, setSort] = useState(sessionStorage.getItem("romance_sort") || "")
    const [category, setCategory] = useState(["Romance"])

    const {data, loading, error} = useFetch(
        "https://backend-book-breeze-mu.vercel.app/books", {allBook: []}
    )

    useEffect(()=>{
        sessionStorage.setItem("romance_price", price)
        sessionStorage.setItem("romance_rating", rating)
        sessionStorage.setItem("romance_sort", sort)
    }, [price, rating, sort])

    if(loading){
        return(
            <div className="container text-center py-5">
            <h4>Loading Book... please wait</h4>
        </div>
        )
        
    }

    if(error){
        return(
            <div className="container text-center py-5">
                <h4>Something went wrong</h4>
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
            filteredBooks = [...filteredBooks].sort((a,b)=> a.price - b.price)
        }
        if(sort === "high"){
            filteredBooks = [...filteredBooks].sort((a,b)=> b.price - a.price)
        }

    return(
        <div style={{background : "#FFE2E2"}}>
            <div className="container py-4">
                <h1 className="mb-4" style={{color : "#972828"}}>
                    Romance Books
                    </h1>
                    <div className="row g-4">
                        <div className="col-12 col-md-3">
                            <div className="card p-3 shadow" >
                                <div className="d-flex justify-content-between">
                                    <h5>Filter</h5>
                                    <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={()=>{
                                        setPrice(3000)
                                        setRating(0)
                                        setSort("")
                                        setCategory(["Romance"])
                                        sessionStorage.removeItem("romance_price")
                                        sessionStorage.removeItem("romance_rating")
                                        sessionStorage.removeItem("romance_sort")
                                    }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <hr />

                                <div>
                                    <h6 style={{color : "#972828"}}>Price: ${price}</h6>
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
                                    <h6 style={{color: "#972828"}}>Category</h6>
                                    {["Sci-Fi", "Novel", "Autobiography", "Political Fiction", "Horror", "Romance"].map((cat)=>(
                                        <div key={cat}>
                                            <input 
                                                type="checkbox" 
                                                name="categorySwitch"
                                                checked={category.includes(cat)}
                                                onChange={(e)=> {
                                                    if(e.target.checked){
                                                        setCategory([...category, cat])
                                                    }else{
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
                                    <h6 style={{color: "#972828"}}>Rating:</h6>
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
                                    <h6 style={{color : "#972828"}} >Sort By</h6>
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

                        <div className="col-12 col-md-9 h-100 ">
                            { filteredBooks.length === 0 ? (
                                <div className="text-center py-5">
                                    <h4>No books found in Romance Section</h4>
                                    <p>Try Changing filters</p>
                                </div>
                            ): (
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
                                                    className="card-img-top "
                                                    style={{height: "300px", objectFit: "contain"}}
                                                    />
                                                </Link>
                                                <div className="card-body shadow" style={{background: "#FBEFEF"}}>
                                                    <h5 className="card-title" style={{minHeight: "48px", fontSize: "1.2rem"}} >
                                                        <Link to={`/product/${book._id}`}
                                                        style={{color: "#500073"}}
                                                        className="text-decoration-none"
                                                        >{book.title}</Link> 
                                                        </h5>
                                                        <p className="card-text small">
                                                           Author: {book.author}
                                                        </p>
                                                        <p>
                                                            Rating: ⭐{book.rating}
                                                        </p>
                                                        <p className="fw-bold mb-3">
                                                           Price: ${book.price}
                                                        </p>

                                                        <button className="w-100 py-2 m-0 text-center rounded" 
                                                        style={{background: "#F5CBCB"}}
                                                        onClick={()=> addToCart(book._id)}
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

export default RomanceSection