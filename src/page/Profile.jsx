import useFetch from "../Hooks/useFetch"
import { Link } from "react-router-dom"



const Profile = () =>{


    const user = {
        name: "Arshad Ali",
        email: "arshad.ali@xyz.com",
        phone: "+91 9653481234"
    }

    //save adderss
    const {data, loading, error } = useFetch(
        "https://backend-book-breeze-mu.vercel.app/addresses",
        {addresses: []}
    )
    
    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading profile...</h4>
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

    return(
        <div style={{backgroundColor: "#EFE9E3"}} className="min-vh-100">
            <div className="container py-5">
                <h2 className="mb-4">My Profile</h2>

                {/* User info card */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            {/* Avatar */}
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-4"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    backgroundColor: "#C9B59C",
                                    fontSize: "32px"
                                }}
                            >
                                👤
                            </div>

                            {/* User Details */}
                            <div>
                                <h4 className="mb-1">{user.name}</h4>
                                <p className="mb-1 text-muted">{user.email}</p>
                                <p className="mb-0 text-muted">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-md-6">
                        <Link
                            to="/addresses"
                            className="card shadow-sm text-decoration-none h-100"
                            style={{color: "inherit"}}
                        >
                            <div className="card-body text-center py-4">
                                <div style={{fontSize: "32px"}}>📍</div>
                                    <h5 className="mt-2 mb-1">Add new Address</h5>
                                    <p className="text-muted mb-0 small">
                                        delivery address
                                    </p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-12 col-md-6">
                        <Link
                            to="/orders"
                            className="card shadow-sm text-decoration-none h-100"
                            style={{color: "inherit"}}
                        >
                            <div className="card-body text-center py-4">
                                <div style={{ fontSize:"32px"}}>📦</div>
                                    <h5 className="mt-2 mb-1">My Orders</h5>
                                    <p className="text-muted mb-0 small">Order History</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile