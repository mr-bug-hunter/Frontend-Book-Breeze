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
            {/* <div>
                <input 
                type="checkbox"
                checked={category === "Sci-Fi"}
                onChange={(e)=> setCategory(e.target.checked ? "Sci-Fi" : "")}
                />
                <label className="ms-2">Sci-Fi</label>
            </div>

            <div>
                    <input
                        type="checkbox"
                        checked={category === "Novel"}
                        onChange={(e) => setCategory(e.target.checked ? "Novel" : "")}
                    />
                    <label className="ms-2">Novel</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={category === "Autobiography"}
                        onChange={(e) => setCategory(e.target.checked ? "Autobiography" : "")}
                    />
                    <label className="ms-2">Autobiography</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={category === "Political Fiction"}
                        onChange={(e) => setCategory(e.target.checked ? "Political Fiction" : "")}
                    />
                    <label className="ms-2">Political Fiction</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={category === "Horror"}
                        onChange={(e) => setCategory(e.target.checked ? "Horror" : "")}
                    />
                    <label className="ms-2">Horror</label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        checked={category === "Romance"}
                        onChange={(e) => setCategory(e.target.checked ? "Romance" : "")}
                    />
                    <label className="ms-2">Romance</label>
                </div> */}
        </div>
        <hr />

        {/* Rating */}
        <div>
            <h6>Rating</h6>
            {[4,3,2,1].map((star)=>(
                <div>
                    <input 
                    type="radio"
                    name="rating"
                    checked={rating === star}
                    onChange={()=> setRating(star)}
                    />
                    <label className="ms-2">{star} Stars & above</label>
                </div>
            ))}
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