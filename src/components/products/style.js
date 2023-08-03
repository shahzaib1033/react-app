import styled from "styled-components";

export const Style = styled.div`
.body{
    width :100%;
    height:100vh;
    display:flex;
    background-color: #4e657a !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color:white;
    gap:50px;
  
}
.mainbody{
    width :100%;
    display:flex;
    background-color: #4e657a !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:white;
      padding: 60px 0px;
    gap:50px;
}
.subdetails{
display:flex;
flex-deriction:row;
align-items: top;

gap:35px;
}
.table {
  display: flex; 
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: white;
  // width: 600px;
  padding: 20px 15px;
  background-color: #435c70;
  box-shadow: 1px 1px 5px 0 #455c71;
  
}
.row {
  display:flex;
  height: 35px;
  outline: none;
  border: none;
  color: white;
  padding: 5px 15px;
  gap:40px;
  flex-direction: row;
  align-items: center;
  background-color: #54657d;
  text-align:left;
}
.row>:nth child(2){
width:100px;
}
.datarow {
  display:flex;
  height: 35px;
  outline: none;
  border: none;
  color: white;
  padding: 5px 15px;
  gap:40px;
  align-items: center;
  background-color: #50697F;
}
.btn {
  border: none;
  outline: none;
  background-color: #f5a623;
  height: 35px;
  color:white;
  width: 100%;
}
/* Product Table Styles */

// .table {
//   width: 100%;
//   border-collapse: collapse;
// }
.name{
 width: 90px !important;
 
}
.bigname{
 width: 165px !important;
 
}
.column{
  width:55px ;
}

.datarow {
  border-bottom: 1px solid #ccc;
}

td,
th {
  padding: 8px;
  text-align: left;
}

/* Variant Modal Styles */
/* Variant Modal Styles */

.modal {
    display: flex; 
  justify-content: center;
  flex-direction:row;
  background-color: #4e657a;
  gap:35px;
  color: white;
   
  padding:10px ;
}
  .table-container {
    max-height: 300px; /* Adjust the height as needed */
    overflow-y: auto;
  }

.modal-container {
  position: fixed;
  z-index: 999; /* Set a higher value to place it above other elements */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4e657a !important;
    margin:0px 0px 20px,5px;

}

.modal-content .details{
  background-color: #4e657a !important;
  padding: 20px;

  border: 1px solid #888;
  width: 60%;
  max-width: 600px;
}

.close {
  margin-right:20px;
  margin-top:20px;
  position: relitive;
  float:right;
  top: 20px;
  left: 20px;
  font-size: 20px;
  font-weight: bolder;
  cursor: pointer;
  background-color:#4e657a;

}

.variant-table {
   background-color: #435c70;
  width: 100%;
  border-collapse: collapse;
}

.variant-table th,
.variant-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

/* Button Styles */

button {
  padding: 8px 8px;
   border: none;
   height:27px;
   width:50px;
  outline: none;
  background-color: #f5a623;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

.icon {
 width 35px;

    display: flex;
    justify-content: end;
}

`