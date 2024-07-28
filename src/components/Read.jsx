import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import {Link} from "react-router-dom";

const Read = () => {

  const dispatch = useDispatch();
  const { users, loading,searchData } = useSelector((state) => state.app);

  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  
  const [radioData, setRadioData] = useState("");

  useEffect(() => {
    dispatch(showUser());
  }, []);


  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data </h2>

      <input className="form-check-input" name="gender" checked={radioData === ""} type="radio" onChange={(e) => setRadioData("")}/> 
      <label className="form-check-label">All</label>      

      <input className="form-check-input" name="gender" value="Male" type="radio"  
          checked={radioData === "Male"} onChange={(e) => setRadioData(e.target.value)} />
      <label className="form-check-label">Male</label>

      <input className="form-check-input" name="gender" value="Female" type="radio"  
        checked={radioData === "Female"} onChange={(e)   => setRadioData(e.target.value)}/>
      <label className="form-check-label">Female</label>

      <div>
        {users &&
          users.filter((ele)=>{
            if(searchData.trim().length === 0){
              return ele
            }else{
              return ele.name.toLowerCase().includes(searchData.trim().toLowerCase());
            }          
          }).filter((ele)=>{
            if(radioData === "Male"){
              return ele.gender === radioData
            }else if(radioData === "Female"){
              return ele.gender === radioData
            }else{
              return ele
            }
          })
          .map((ele) => {
            return (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                  <button
                    href="#"
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link  to={`/update/${ele.id}`}  className="card-link">
                    Edit
                  </Link>
                  <Link href="" className="card-link" onClick={()=>dispatch(deleteUser(ele.id))}>
                    Delete
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Read;





