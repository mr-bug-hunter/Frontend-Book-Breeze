import { Link } from "react-router-dom"
import Category from "../components/Category"
import useFetch from "../Hooks/useFetch"
import { useState } from "react"

const Home = () => {

    const {loading, error} = useFetch(
        "https://backend-book-breeze-mu.vercel.app/books"
    )

    if(loading){
        return (
            <div className="container text-center py-5">
                <h4>Loading welcome to Book breeze...</h4>
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
        <>
        <div style={{backgroundColor: "#EFE9E3"}}>

        <Category/>

       <div className="position-relative text-white text-center">
        
        <img src="https://images.unsplash.com/photo-1690439132747-0e80f32d9c9c?q=80&w=1197&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Book"
        className="object-fit-cover img-fluid rounded"
        style={{height: "500px", width: "100%"}}
        />
        <div className="position-absolute top-50 start-50 translate-middle ">
            <h1 className="fw-bold display-5" style={{color: "#A47251"}}>Welcome to </h1>
            <h1 className="fw-bold display-2" style={{color: "#EFE9E3"}}>Book-Breeze</h1>
        </div>
        </div>
        

        {/* Upcoming Book */}
        <div className="row justify-content-center g-4 py-4 mx-auto" style={{maxWidth: "1200px"}}>

        {/* Horror Books */}
        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
        <Link to={"horror"}>
        <div className="position-relative">
            <img src="https://images.unsplash.com/photo-1677104166179-0c83fa768b3a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Horror Book"
            className="object-fit-cover img-fluid  rounded"
            style={{height: "400px", width: "100%", maxWidth: "350px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white">Horror Section</h3>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
        <Link to="/products">
        <div className="position-relative">
            <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="All Books"
            className="object-fit-cover img-fluid rounded"
            style={{height: "400px", width: "100%", maxWidth: "350px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white mb-3">Explore</h3>
                <h3 className="fw-light text-white">All Books</h3>
            </div>
        </div>
        </Link>
        </div>

        

        {/* Romance Section */}
        <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
        <Link to={"romance"}>
        <div className="position-relative">
            <img src="https://images.unsplash.com/photo-1708981000709-b72e758611bc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Romance Book"
            className="object-fit-cover img-fluid rounded"
            style={{height: "400px", width: "100%", maxWidth: "350px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h4 className="fw-light text-white">Romance Section </h4>
            </div>
        </div>
        </Link>
        </div>


        
        </div>
        </div>
        </>
    )
}

export default Home