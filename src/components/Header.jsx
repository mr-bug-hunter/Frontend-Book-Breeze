import { Link } from "react-router-dom"
import useCartContext from "../context/CartContext"
import useWishlistContext from "../context/WishlistContext"



const Header = ({search, setSearch})=>{

  const {cartItems} = useCartContext()
  const {wishlistItems } = useWishlistContext()


  const cartCount = cartItems.filter(item => item.productId).length
  const wishlistCount = wishlistItems.length
    return (
        <div >
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
          <div className="container-fluid px-5">
            {/* Logo */}
    <Link className="navbar-brand me-4" to="/">
    <strong>Book-Breeze</strong>
    </Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" 
        id="navbarSupportedContent">
          {/* Navigation */}
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/products">Books</Link>
        </li>
      </ul>

      {/* Login */}
      <Link
        to="/profile" 
        className="btn" 
        style={{background: "#EFE9E3", marginRight: "15px"}}>
        User Profile
      </Link>
      
      {/* Search */}
      <div className="d-flex align-items-center gap-3">
      <form className="me-4" onSubmit={(e)=> e.preventDefault()}>
        <input 
        className="form-control" 
        type="search" 
        placeholder="search books.." 
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        style={{ height: "38px"}}
        />
        </form>
        {/* Wishlist */}
        <Link to="/wishlist" className="text-decoration-none text-primary text-center me-4" >
          <div className="fs-3" style={{color: "black"}}>
            ♡
            </div><span style={{color: "black"}}>({wishlistCount})</span>
        </Link>
        {/* Cart */}
        <Link to="/cart" className="text-decoration-none text-dark text-center me-4">
          🛒  
          <span style={{color: "black"}}>({cartCount})</span>
        </Link>
        
      
      </div>
    </div>
  </div>
</nav>

        </div>
    )
}

export default Header