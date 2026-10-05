import { Link } from "react-router-dom"

const Category = ()=>{

    return (
        <>
        <div className="container-fluid p-4">

            <div className="d-flex flex-warp justify-content-center gap-3 gap-md-5">
            
            {/* Image 1 SCI-Fi Category */}

            <Link to="/category/Sci-Fi"
            className="text-decoration-none"
            >
        <div className="position-relative">
            <img src="https://images.unsplash.com/photo-1637158540039-083d777ac352?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="sci-fiCategory"
            className="object-fit-cover img-fluid rounded"
            style={{height: "120px", width: "160px" }}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white mb-0" style={{color: "#EFE9E3"}} >SCI-FI</h3>
            </div>
        </div>
        </Link>

        {/* Image 2 NOVAL Category */}
        <Link to="/category/Novel"
        className="text-decoration-none"
        >
        <div className=" position-relative">
            <img src= "https://plus.unsplash.com/premium_photo-1755782063707-8d57fc7f17ac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="NovalCategory"
            className="object-fit-cover img-fluid rounded"
            style={{height: "120px", width: "160px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white mb-0" style={{color: "#EFE9E3"}}>NOVEL</h3>
            </div>
        </div>
        </Link>

        {/* Image 3 AUTOBIOGRAPHY Category */}
        <Link to="/category/Autobiography"
        className="text-decoration-none">
        <div className=" position-relative">
            <img src= "https://plus.unsplash.com/premium_photo-1755782061392-aeffede0a7c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AutoBiographyCategory"
            className="object-fit-cover img-fluid rounded"
            style={{height: "120px", width: "160px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white mb-0" style={{color: "#EFE9E3"}}>AUTO <br /> BIOGRAPHY</h3>
            </div>
        </div>
        </Link>


        {/* Image 4 Political Fiction Category */}
        <Link to="/category/Political Fiction"
        className="text-decoration-none">
        <div className=" position-relative">
            <img src= "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Political-FictionCategory"
            className="object-fit-cover img-fluid rounded"
            style={{height: "120px", width: "160px"}}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                <h3 className="fw-light text-white mb-0" style={{color: "#EFE9E3"}}>Political Fiction</h3>
            </div>
        </div>
        </Link>

        
        </div>
        </div>
        
        </>
    )
}

export default Category