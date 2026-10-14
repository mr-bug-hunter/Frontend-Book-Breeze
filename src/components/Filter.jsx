const Filter = ({price, setPrice, rating, setRating, category, setCategory, sort, setSort})=>{
    return (
       <div>
        <div className="d-flex justify-content-between">
            <h5>Filters</h5>
            <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={()=>{
                setPrice(3000)
                setRating(0)
                setCategory([])
                setSort("")
                sessionStorage.removeItem("filter_price")
                sessionStorage.removeItem("filter_rating")
                sessionStorage.removeItem("filter_category")
                sessionStorage.removeItem("filter_sort")
            }}
            >
                Clear
            </button>
        </div>
        <hr />

        {/* price */}
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
        
        {/* Category */}
        <div>
            <h6>Category</h6>
            {["Sci-Fi", "Novel", "Autobiography", "Political Fiction", "Horror", "Romance"].map((cat)=>(
                <div key={cat}>
                    <input 
                        type="checkbox" 
                        checked={category.includes(cat)}
                        onChange={(e) => {
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
            <h6>Rating: {rating} ★ & above </h6>
                <div>
                    <input 
                    type="range"
                    className="form-range"
                    min="0"
                    max="4"
                    step="1"
                    value={rating}
                    onChange={(e)=> setRating(Number(e.target.value))}
                    />
                    <div className="d-flex justify-content-between">
                        <span>0</span>
                        <span>4</span>
                    </div>
                </div>
            
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
    )
}

export default Filter