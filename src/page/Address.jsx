import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../Hooks/useFetch"
import {toast} from 'react-toastify'



const Address = ()=>{

    const navigate = useNavigate()
    const {data, loading, error} = useFetch("https://backend-book-breeze-mu.vercel.app/addresses", {addresses: []})
    console.log("Address Data:", data)

    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [editAddress, setEditAddress] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state:"",
        pincode: ""
    })

    useEffect(()=>{
        setAddresses(data?.addresses || [])
    }, [data])

    //Add Address
    function handleChange(event){
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    async function handleAddAddress(event){
        event.preventDefault()
        try{

            let response, data

            if(editAddress){
                response = await fetch(
                    `https://backend-book-breeze-mu.vercel.app/addresses/${editAddress._id}`,
                    {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(formData)
                    }
                )
                data = await response.json()
                console.log("Updated:", data)

                if(response.ok){
                    setAddresses(
                        addresses.map((addr)=>
                            addr._id === editAddress._id ? data.address :addr
                        )
                    )
                    toast.success("Address updated successfully")
                }
            }else{

                response = await fetch("https://backend-book-breeze-mu.vercel.app/addresses",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
         data = await response.json()
        console.log(data)
        if(response.ok){
            setAddresses([
                ...addresses,
                data.address
            ])
            toast.success("Address added Successfully")
            }
        }

            setFormData({
                name: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                pincode:""
            })
            setEditAddress(null)
        } catch(error){
            console.log(error)
            toast.error("Someting went wrong")
        }
 }
    

    //Edit Address
    function handleEdit(address){
        setEditAddress(address)
        setFormData({
            name: address.name,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            pincode: address.pincode
        })
    }

    // Delete Address

    async function handleDelete(addressId){
        try{
            const response = await fetch(
                `https://backend-book-breeze-mu.vercel.app/addresses/${addressId}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json()
            console.log(data)
            if(response.ok){
                setAddresses(addresses.filter((address)=> address._id !== addressId))
                if(selectedAddress?._id === addressId)
                    setSelectedAddress(null)
                toast.success("Address deleted Successfully")
            }
        }catch(error){
            console.log(error)
        }
    }

    function handleContinue(){
        if(!selectedAddress){
            toast.error("please select Address")
            return
        }
        localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress))
        navigate("/checkout")
    }

    if(loading){
        return(
            <div className="container text-center py-5">
                <h4>Loading Addresses...</h4>
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
        
        <div style={{backgroundColor: "#EfE9E3"}} className="min-vh-100">
            <div className="container py-5">
                <h2 className="mb-4">Confirm your Address before your Order</h2>
                
                {/* add address */}
                <div className="card shadow-sm mb-5">
                    <div className="card-body">
                        <h4 className="mb-4">Add New Address</h4>
                <form onSubmit={handleAddAddress}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                className="form-control" 
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required  />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Phone Number
                            </label>
                            <input 
                                type="text" 
                                name="phone" 
                                placeholder="Enter 10-digit phone number"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                                minLength={10}
                                required
                                />
                        </div>

                        <div className="col-12">
                            <label className="form-label">
                                Address
                            </label>

                            <textarea 
                                name="address" 
                                className="form-control"
                                rows="3"
                                placeholder="Enter your full Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                ></textarea>
                        </div>

                            <div className="col-md-4">
                                <label className="form-label">
                                    City
                                </label>

                                <input 
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required 
                                    />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">
                                    State
                                </label>

                                <input 
                                    type="text" 
                                    name="state" 
                                    className="form-control"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">
                                    Pincode
                                </label>

                                <input 
                                    type="text" 
                                    name="pincode" 
                                    className="form-control"
                                    placeholder="Enter 6-digit Pincode"
                                    value={formData.pincode}
                                    maxLength="6"
                                    onChange={handleChange}
                                    maxLength={6}
                                    minLength={6}
                                    required
                                    />
                            </div>
                    </div>

                    <button 
                        type="submit" className="btn mt-4 shadow" style={{backgroundColor: "#C9B59C"}} >
                            {editAddress ? "Update Address" : "Add Address"}
                    </button>
                </form>

                    </div>
                </div>
                <hr />

                <div className="row g-4">
                    {addresses.map((address)=>(
                        <div className="card mb-2 p-2 col-md-6" key={address?._id}>
                            
                            <div className="d-flex align-items-start">
                            <input 
                                type="radio" 
                                name="selectedAddress" 
                                className="form-check-input me-2"
                                checked={selectedAddress?._id === address._id}
                                onChange={() => setSelectedAddress(address)}
                                /> 
                                <div >
                                    <h5>{address?.name}</h5>
                                    <p className="mb-1">
                                        <strong>Phone:</strong>{address?.phone}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Address:</strong>{address?.address}
                                    </p>
                                    <p className="mb-1">
                                        <strong>City:</strong>{address?.city}
                                    </p>
                                    <p className="mb-1">
                                        <strong>State:</strong>{address?.state}
                                    </p>
                                    <p className="mb-3">
                                        <strong>Pincode:</strong>{address?.pincode}
                                    </p>

                                    <button 
                                        className="btn btn-primary me-2 shadow btn-dark"
                                        onClick={()=> handleEdit(address)}
                                        >
                                        Edit
                                    </button>

                                    <button 
                                        className="btn btn-danger shadow"
                                        onClick={()=> handleDelete(address._id)}
                                        >
                                        Delete
                                    </button>
                                </div>

                            </div>

                        </div>
                    ))}

                </div><br />
                <button
                    className="btn col-md-12 shadow"
                    onClick={handleContinue}
                    style={{backgroundColor: "#C9B59C"}}
                >
                    Continue
                </button>

            </div>

        </div>
    )
}

export default Address