import { useState, useEffect } from "react"


const useFetch = (url, initialData = {}) => { 
    const [data, setData] = useState(initialData)
    const [loading, SetLoading] = useState(true)
    const [error, SetError]= useState(null)

    useEffect(()=>{
        SetLoading(true)
        SetError(null)

        fetch(url)
        .then((res)=> res.json())
        .then((data)=>{
            setData(data)
        })
        .catch((error)=> SetError(error.message))
        .finally(()=> SetLoading(false))
    }, [url])
    return{data, loading, error}
}

export default useFetch