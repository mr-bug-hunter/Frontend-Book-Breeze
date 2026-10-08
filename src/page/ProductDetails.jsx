import useFetch from "../Hooks/useFetch"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import useCartContext from "../context/CartContext"
import useWishlistContext from "../context/WishlistContext"



const ProductDetails = ()=>{

    const navigate = useNavigate()

    const {productId} = useParams()
    const [book, setBooks] = useState(null)
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const {addToCart} = useCartContext()
    const {addToWishlist} = useWishlistContext()
    const [quantity, setQuantity] = useState(1)
    
    const {loading, error} = useFetch(
        "https://backend-book-breeze-mu.vercel.app/books"
    )

    

    useEffect(()=>{
        async function fetchBook(){
            try{
                const response = await fetch(`https://backend-book-breeze-mu.vercel.app/books/${productId}`)
                const data = await  response.json()
                setBooks(data.book)
            }catch(error){
                console.log(error)
            }
        }
        fetchBook()
    }, [productId])

    useEffect(() => {

    if (!book?.categories) return

    async function fetchRecommendedBooks() {

        try {

            const response = await fetch(
                `https://backend-book-breeze-mu.vercel.app/books/category/${book.categories}`
            )

            const data = await response.json()

            const filteredBooks = (data.books || []).filter(
                (item) => item._id !== book._id
            )

            setRecommendedBooks(filteredBooks)

        } catch (error) {
            console.log(error)
        }
    }

    fetchRecommendedBooks()

}, [book])

if(loading){
        return (
            <div className="container text-center py-5">
                <h4>Loading Book Details page...</h4>
            </div>
        )
    }

    if(error){
        return (
            <div className="container text-center py-5">
                <h4>Something went Wrong...</h4>
                <p>{error}</p>
            </div>
        )
    }

    return(
        <div style={{backgroundColor: "#EFE9E3"}} className="min-vh-100">
            <div className="container py-5">
                <button
                    className="btn btn-outline-dark mb-3"
                    onClick={() => navigate(-1)}
                    >
                        Back
                </button>

                <div className="row g-5">
                    {/* Book Image */}
                    <div className="col-12 col-md-4">
                        <div className="p-4 position-relative">
                            <button 
                            className="btn btn-light position-absolute top-0 end-0 m-1"
                            onClick={()=> addToWishlist(book?._id)}
                            >
                                ♡
                            </button>
                        <img 
                        src={book?.image} 
                        alt={book?.title}
                        className="img-fluid"
                        style={{height: "400px", objectFit: "contain"}}
                        />
                    </div>
                    </div>

                    {/* Book Information */}
                    <div className="col-12 col-md-7">
                        <div className="pt-md-3">
                            <h2 className="fw-bold">{book?.title}</h2>
                            
                            <p className="text-muted mb-2" ><strong>Author By</strong> {book?.author} </p>
                            <p className="mb-3" ><strong>Rating:</strong> ⭐ {book?.rating}</p> <hr />
                            <h3 className="fw-bold" > Price: ${book?.price}</h3>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <span className="fw-bold"> Quantity: </span>
                                <div className="d-flex align-items-center rounded">
                                    <button
                                        className="btn btn-light"
                                        onClick={()=> setQuantity(Math.max(1, quantity -1))}
                                        disabled={quantity <= 1}
                                        >
                                        -
                                    </button>
                                    <span className="px-3 fw-bold">{quantity}</span>
                                    <button
                                        className="btn btn-light"
                                        onClick={() => setQuantity(quantity +1)}
                                        >
                                        +
                                    </button>

                                </div>
                            </div>
                            <p className="text-muted" >Category: {book?.categories}</p> <hr />
                            <div className="d-flex gap-3">
                                <button 
                                className="btn btn-lg w-50" 
                                style={{backgroundColor: "#C9B59C"}}
                                onClick={()=> {addToCart(book?._id, true, quantity)}}
                                >
                                    Add to Cart
                                </button>
                                
                                <button 
                                    className="btn btn-lg btn-dark w-50"
                                    onClick={async()=>{
                                        await addToCart(book?._id, false, quantity)
                                        navigate("/addresses")
                                    }}
                                    >
                                    Buy Now
                                </button>
                                
                                
                            </div>
                            <hr />
                            <div>
                                <img src="https://hastyakala.com/cdn/shop/files/Free_Shipping_3.png?v=1757220225" 
                                alt="shipping photo"
                                style={{maxWidth: "100%"}}
                                className="rounded img-fluid"
                                />
                            </div>
                            <hr />
                            <div className="mt-4">
                                <h5 className="fw-bold">Description</h5>
                                <p>{book?.description}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <h3>More items you may like in Books:</h3>
                    <div className="row g-4 mt-2">

    {recommendedBooks.slice(0, 4).map((item) => (

        <div
            className="col-12 col-sm-6 col-md-3"
            key={item._id}
        >

            <div className="card h-100">
                <Link to={`/product/${item._id}`}
                className="text-decoration-none"
                >
                    <button 
                            className="btn btn-light position-absolute top-0 end-0 m-1"
                            onClick={()=> addToWishlist(item?._id)}
                            >
                                ♡
                            </button>
                <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top"
                    style={{
                        height: "250px",
                        objectFit: "contain"
                    }}
                />
                </Link>
                <div className="card-body">

                    <Link to={`/product/${item._id}`}
                className="text-decoration-none" style={{color: "black"}}>
                    <h6 className="card-title">
                        {item.title}
                    </h6>
                    </Link>

                    <p className="mb-2">
                       Rating: ⭐ {item.rating}
                    </p>

                    <p className="fw-bold">
                        Price: ₹{item.price}
                    </p>

                    <button
                        className="btn w-100 shadow"
                        style={{
                            backgroundColor: "#C9B59C"
                        }}
                        onClick={()=> addToCart(item?._id)}
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
            
    )
}

export default ProductDetails