import React, {useState} from "react";
import Card from "./Card"
import axios from "axios"
const Main = () => {
  const [search, setSearch]=useState("");
  const [bookData,setData]=useState([]);
  const [sort, setSort] = useState("relevance");
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&orderBy=' + (sort === 'oldest' ? 'newest' : sort) + '&key=AIzaSyDAoWOwdOxgeHxW9-kN8nIF_wEjuBSKD5M' + "&maxResults=40")
        .then(res => {
          let data = res.data.items;
          if (sort === 'oldest') {
            data.reverse();
          }
          setData(data);
        })
        .catch(err => console.log(err))
    }  
  }
  return (
    <>
      <div className="header">
        <div className="row1">
          <h1>Just ANOTHER Book project built in REACT</h1>
        </div>
        <div className="row2">
          <h2>BUILT DIFFERENT</h2>
          <div className="searchbar">
            <input type="text" placeholder="anything you like?" 
            value={search} onChange={e => setSearch(e.target.value)}
            onKeyPress={searchBook}/>
                 <select value={sort} onChange={e => setSort(e.target.value)}>
                     <option value="relevance">Relevance</option>
                     <option value="newest">Newest</option>
                     <option value="oldest">Oldest</option>
                </select>

               <button><i className="fas fa-search"></i></button>
             </div>

          <img src='https://cdn.digg.com/submitted-links/160x160/1689679254-W9z9gdyds6.jpg'></img>
        </div>
      </div>
      <div className="container">
        {
          <Card book={bookData}/>
        }  
      </div>
    </>
  );
};

export default Main;



