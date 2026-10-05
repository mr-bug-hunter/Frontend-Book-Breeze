import useFetch from "../Hooks/useFetch"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import useCartContext from "../context/CartContext"
import useWishlistContext from "../context/WishlistContext"



const ProductDetails = ()=>{

    const {productId} = useParams()
    const [book, setBooks] = useState(null)
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const {addToCart} = useCartContext()
    const {addToWishlist} = useWishlistContext()
    
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

            const filteredBooks = data.books.filter(
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
                            
                            <p className="text-muted mb-2" >By {book?.author} </p>
                            <p className="mb-3" >⭐ {book?.rating}</p> <hr />
                            <h3 className="fw-bold" >${book?.price}</h3>
                            <p className="text-muted" >Category: {book?.categories}</p> <hr />
                            <div className="d-flex gap-3">
                                <Link 
                                className="btn btn-lg w-50" 
                                style={{backgroundColor: "#C9B59C"}}
                                onClick={()=> addToCart(book?._id)}
                                >
                                    Add to Cart
                                </Link>
                                
                                <Link to="/addresses" className="btn btn-lg btn-dark w-50">
                                    Buy Now
                                </Link>
                                
                                
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
                        ⭐ {item.rating}
                    </p>

                    <p className="fw-bold">
                        ₹{item.price}
                    </p>

                    <button
                        className="btn w-100"
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