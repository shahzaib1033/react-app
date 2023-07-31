import styled from "styled-components";

export const Navbarwrapper = styled.div`
 
.navBarSection{
  display : flex;
  background-color: #567086;
  height:5.1em;
  position: fixed;
  width: 100%;
  flex-direction:row;
    justify-content: center;
    align-items: center;
    gap:6em;
    color:white;
}
.links{
  display : flex;
  flex-direction:row;
    justify-content: center;
    align-items: center;
    gap:20px;
    color:white;
}

.container{
    display : flex;
    height:100%;
     flex-direction: column;
        justify-content: center;
    align-items: center;
     curser:pointer;
}


.logout{
      text-decoration: underline;
}
      
`;