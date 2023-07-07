import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const CreateTable = ({ editTableData, restaurantId, onCloseModal }) => {
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const history = useHistory();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${restaurantId}`);
      setMenus(response.data.menus);
      //console.log(response.data.menus);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [num, setNum] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (editTableData) {
      // Fill the form fields with the old information
      setNum(editTableData.numTable || "");
      setSize(editTableData.size || "");
      setSelectedMenus(editTableData.id_menus || []);
    } else {
      // Reset the form fields
      setNum("");
      setSize("");
      setSelectedMenus([]);
    }
    //console.log("selecet menu", selectedMenus)
  }, [editTableData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTableData) {
     
      try {
        const response = await axios.put(`http://localhost:5000/api/table/update/${editTableData.id}`, {
          size: size,
          numTable: num,
          id_menus: selectedMenus? selectedMenus : [],
          id_restaurant: restaurantId,
        });
        console.log("Table updated successfully");
        toast.success("Table modifiée ✅ !", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        fetchData();
      } catch (error) {
        // if (error.response?.status === 401) {
        //   history.push('/login');
        // } else {
        //   history.push('/error500');
        // }
        console.error("Error updating table:", error);
        // Handle error, e.g., show an error message
      }
    } else {
      const id = uuidv4();
      console.log("select menu : ",selectedMenus);

      try {
        const response = await axios.post("http://localhost:5000/api/table/add", {
          id: id,
          size: size,
          numTable: num,
          id_menus: selectedMenus? selectedMenus : [],
          id_restaurant: restaurantId,
        });
        console.log("Table saved successfully");
        fetchData();
        // Handle success, e.g., show a success message or redirect to another page
      } catch (error) {
        // if (error.response?.status === 401) {
        //   history.push('/login');
        // } else {
        //   history.push('/error500');
        // }
        console.error("Error saving table:", error);
       
      }

      // Handle form submission
      console.log("Submit", { num, size, selectedMenus });
    }
    onCloseModal();
  };

  const handleMenuChange = (e, menuId) => {
      
    console.log(typeof selectedMenus)
    if(selectedMenus.length >0){
 
      if (JSON.parse(selectedMenus).includes(menuId)) {
        console.log("includes")
        setSelectedMenus(() => JSON.stringify( JSON.parse(selectedMenus).filter((checkedItem) => checkedItem !== menuId)));
      } else {
        setSelectedMenus(JSON.stringify([...JSON.parse(selectedMenus), menuId]));
      }
    }
    else{
      setSelectedMenus(JSON.stringify([menuId]))
    }

   

    // const isChecked = e.target.checked;
    // console.log("chwck", isChecked, "id : ", menuId)
    
    // if (isChecked) {
    //   setSelectedMenus((prevSelectedMenus) => [...prevSelectedMenus, menuId]);
    // } else {
    //   setSelectedMenus((prevSelectedMenus) => {
    //     console.log("prev:", prevSelectedMenus); // prev: ["61b2030c-4a23-48d0-a877-6fabc6769dd8", "bc8f2acb-8ebd-42c9-a801-0f73a5a0211e"]
    //     const arr = prevSelectedMenus;
    //     const filteredMenus = prevSelectedMenus.filter((menu) => menu !== menuId);
    //     return filteredMenus;      });
    // }
  };
  
  useEffect(() =>{
    console.log("effect menuse",selectedMenus)
    console.log("effect menuse type",typeof selectedMenus)

  },[selectedMenus])
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="num">Numero de la table</label>
        <input
          type="number"
          className="form-control"
          id="num"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="size">Nombre de personnes</label>
        <input
          type="number"
          className="form-control"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Menus</label>
        <ul>
        {menus.map((menu,index) => (
          <li key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`menu-${menu.id}`}
              value={menu.name}
              checked={selectedMenus.includes(`${menu.id}`)}
              onChange={(e) => handleMenuChange(e, menu.id)}
            />
            <label className="form-check-label" htmlFor={`menu-${menu.id}`}>
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:5000/images/${menu.image}`}
                  alt={menu.name}
                  className="menu-image"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span className="menu-name">{menu.name}</span>
              </div>
            </label>
          </li>
        ))}
        </ul>
      </div>

      <button type="submit" className="btn btn-outline-primary">
    
        {editTableData ? "Modifier" : "Ajouter"}
      </button>
      <ToastContainer
                           position="top-right"
                           autoClose={5000}
                           hideProgressBar={false}
                           newestOnTop
                           closeOnClick
                           rtl={false}
                           pauseOnFocusLoss
                           draggable
                           pauseOnHover
                        />
    </form>
  );
};

export default CreateTable;
