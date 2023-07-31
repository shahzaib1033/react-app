import styled from "styled-components";

export const Style = styled.div`

.form {
  display: flex; 
  flex-direction: column;
  gap: 12px;
  color: white;
  width: 250px;
  justify-content: center;
  padding: 20px 15px;
  background-color: #435c70;
  box-shadow: 1px 1px 5px 0 #455c71;
  height: 50%;
}
.heading {
  font-size: 17px;
  
}
.signInForm {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  color: white;
  
  justify-content: center;
  align-items: center;
  background-color: #435c70;
  box-shadow: 1px 1px 5px 0 #455c71;
}
.bodyOfForm {
  height: 100vh;
  width: 100%;
  background-color: #4e657a !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input {
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  color: white;
  background-color: #54657d;
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