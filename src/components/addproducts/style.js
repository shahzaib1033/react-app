import styled from "styled-components";

export const Style = styled.div`

.form {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: white;
  width: 100%;
  justify-content: center;
  padding: 20px 15px;
  background-color: #435c70;
  box-shadow: 1px 1px 5px 0 #455c71;
  height: 50%;
}
.heading {
  font-size: 13px;
}
.signInForm {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding:30px  20px 20px 20px ; 
    margin-top: 50px;
  width:min(500px,100%);
  color: white;
  justify-content: center;
  align-items: center;
  background-color: #435c70;
  box-shadow: 1px 1px 5px 0 #455c71;
}
.bodyOfForm {
  height: auto;
  width: 100%;
  
  background-color: #4e657a !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.set{
  display:flex;
  flex-direction:column;
  gap:13px;
}
.message{
  color:#ff6000d1;
  font-size:13px;
}
.input {
   display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  color: white;
  padding:7px,10px;
  background-color: #54657d;
}
.image{
  width:100px;
  height:100Px
}
.btn {
  border: none;
  outline: none;
  background-color: #f5a623;
  height: 35px;
  color:white;
  width: 100%;
}
`