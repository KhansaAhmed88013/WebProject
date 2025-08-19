import React from "react";
import {useState} from 'react';
function Practice() {
     const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Smartphone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
  { id: 4, name: "Keyboard", price: 60 },
  { id: 5, name: "Mouse", price: 40 },
  { id: 6, name: "Monitor", price: 300 },
  { id: 7, name: "Tablet", price: 500 },
  { id: 8, name: "Smartwatch", price: 200 },
  { id: 9, name: "Camera", price: 1000 },
  { id: 10, name: "Speaker", price: 180 },
  { id: 11, name: "Microphone", price: 120 },
  { id: 12, name: "Printer", price: 250 },
  { id: 13, name: "Desk Lamp", price: 45 },
  { id: 14, name: "External Hard Drive", price: 95 },
  { id: 15, name: "Router", price: 110 },
  { id: 16, name: "TV", price: 900 },
  { id: 17, name: "Gaming Console", price: 600 },
  { id: 18, name: "VR Headset", price: 700 },
  { id: 19, name: "Drone", price: 1500 },
  { id: 20, name: "Projector", price: 850 },
  { id: 21, name: "Charger", price: 25 },
  { id: 22, name: "USB Cable", price: 10 },
  { id: 23, name: "Power Bank", price: 65 },
  { id: 24, name: "Bluetooth Earbuds", price: 130 },
  { id: 25, name: "Smart Glasses", price: 400 },
  { id: 26, name: "Graphic Tablet", price: 350 },
  { id: 27, name: "Smart Bulb", price: 35 },
  { id: 28, name: "Washing Machine", price: 700 },
  { id: 29, name: "Refrigerator", price: 1200 },
  { id: 30, name: "Air Conditioner", price: 1400 },
  { id: 31, name: "Fan", price: 90 },
  { id: 32, name: "Heater", price: 150 },
  { id: 33, name: "Coffee Maker", price: 220 },
  { id: 34, name: "Toaster", price: 80 },
  { id: 35, name: "Blender", price: 160 },
  { id: 36, name: "Oven", price: 500 },
  { id: 37, name: "Dishwasher", price: 1000 },
  { id: 38, name: "Microwave", price: 350 },
  { id: 39, name: "Juicer", price: 140 },
  { id: 40, name: "Vacuum Cleaner", price: 400 },
  { id: 41, name: "Iron", price: 70 },
  { id: 42, name: "Hair Dryer", price: 90 },
  { id: 43, name: "Air Purifier", price: 450 },
  { id: 44, name: "Water Filter", price: 320 },
  { id: 45, name: "Ceiling Fan", price: 200 },
  { id: 46, name: "Smart Door Lock", price: 280 },
  { id: 47, name: "Security Camera", price: 260 },
  { id: 48, name: "Robot Vacuum", price: 750 },
  { id: 49, name: "Electric Kettle", price: 90 },
  { id: 50, name: "Induction Stove", price: 600 }
];

    const ItemPerPage=5;
  const [currentPage,setCurrrentPage]=useState(0)
  const data=products.slice(currentPage*ItemPerPage,(currentPage+1)*ItemPerPage)
  const noOfPages=Math.ceil(products.length/ItemPerPage)
  const newarray=Array.from({length:noOfPages},(_,index)=>index+1)
  function handlePageChange(pg){
    setCurrrentPage(pg)
  }
    return ( 
        <div className='App'>
    { data.map((item)=>( 
      <div key={item.id}> 
      <p><strong>Name : </strong> {item.name}</p> 
      </div> )) }
      <div>
        <button disabled={currentPage<1} onClick={()=>handlePageChange(currentPage-1)}>&lt;</button>
        {
          (newarray.slice(Math.max(0,currentPage-2),Math.min(currentPage+3,noOfPages))).map((page)=>(<button key={page} onClick={()=>handlePageChange(page-1)}>{page}</button>))
        }
        <button disabled={currentPage>=noOfPages-1} onClick={()=>handlePageChange(currentPage+1)}>&gt;</button>
      </div>
     </div>
     );
}

export default Practice;
