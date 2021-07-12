import React, { useState} from "react"
import { Int } from "@onflow/types"
import {useAccountItems} from "../hooks/use-account-items.hook"
//import {useAccountItem} from "../hooks/use-account-item.hook"
import {IDLE} from "../global/constants"
import {useCurrentUser} from "../hooks/use-current-user.hook.js"
import {useAddress} from "../hooks/use-url-address.hook"
import {Clicky} from "./account-item-cluster.comp" 
import{
    Button,
    Center,
} from '@chakra-ui/react'

var p1;
var p2;
var p3;
var lengt;
var clicked;


export function UserSetPrice() {

    const [price1, setPrice1] = useState(null);
    const [price2, setPrice2] = useState(null);
    const [price3, setPrice3] = useState(null);
    const [length, setLength] = useState('');
    const [showHide1, setShowHide1] = useState(false);
    const [showHide2, setShowHide2] = useState(false);
    const [state, setState] = useState({
      title1: '',
      description: '',
      price1: Int,
      price2: Int,
      price3: Int,
      length: ''
    })

    //const item = useAccountItem
    const address = useAddress()
    const [cu] = useCurrentUser()
    const items = useAccountItems(address)
    if (address == null) return <div>Not Found</div> 
    

    const HandleSubmit = (event) =>{
        event.preventDefault();
        
        //p1=parseInt(`${price1}`)
    
        if(cu.addr !== address){
          alert(`Must be logged on to your account`)
        }
        if(price1===null && isNaN(price1) && showHide1===true){
          alert(`
            You must enter a Fixed Price for the NFT.
          `)
        }
        if(price2===null && isNaN(price2) && showHide2===true){
          alert(`
            You must enter a Starting Bid Price for the NFT.
          `)
        }
        if(isNaN(price3) && showHide2===true){
            alert(`
            Optional Bid must be a number.
          `)
        }
        if(length==='' && showHide2===true){
          alert(`
            You must enter a Auction Length for the NFT.
          `)
        }
        if(price1!==null && showHide1===true){
          alert(`
            ____Your NFT____\n
            Price : ${price1}
          `)
          p1=parseInt(`${price1}`)
          Clicky();
        }
        if(price2!==null && length!=='' && showHide2===true && price3===null){
          alert(`
            ____Your NFT____\n
            Starting Bid : ${price2}
            Auction Length : ${length}
          `)
          p2=parseInt(`${price2}`)
          lengt=parseInt(`${length}`)
          Clicky();
        }
        else if(price2!==null && length!=='' && showHide2===true && price3!==null && !isNaN(price3)){
          alert(`
            ____Your NFT____\n
            Starting Bid : ${price2}
            Immediate Buy Price : ${price3}
            Auction Length : ${length}
          `)
          p2=parseInt(`${price2}`)
          p3=parseInt(`${price3}`)
          lengt=parseInt(`${length}`)
        }
      }

    const showHide = (title1) => {
        switch (title1) {
          case "showHide1":
            setShowHide1(!showHide1);
            if(showHide2 === true){
              setShowHide2(false)
            };
            break;
          case "showHide2":
            setShowHide2(!showHide2);
            if(showHide1 === true){
              setShowHide1(false)
            };
            break;
            default:
              setShowHide1(false);
              setShowHide2(false);
            break;
        }
    }


    const handleprice1Change = (event) => {
        // Computed property names
        // keys of the objects are computed dynamically
        setPrice1(event.target.value);
        const price1 = event.target.value;
          setState({
            price1: price1
          });
        
    }
    
    const handleprice2Change = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setPrice2(event.target.value);
      const price2 = event.target.value;
        setState({
          price2: price2
        });
      
    }
    
    const handleprice3Change = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setPrice3(event.target.value);
      const price3 = event.target.value;
        setState({
          price3: price3
        });
      
    }
    
    const handleLenChange = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setLength(event.target.value);
      const length = event.target.value;
        setState({
          length: length
        });
        
        const id = event.target.id;
        for (var i = 1;i <= 3; i++)
        {
            document.getElementById("Check" + i).checked = false;
        }
        document.getElementById(id).checked = true;
      
    }

return(
    <form onSubmit={HandleSubmit}>
    <Center>
        <label>
        <input type="radio" name="tab" onClick={() => showHide("showHide1")} />
          Fixed Price:
        </label>
        </Center>
        { showHide1 && 
          <div>
          <Center>
          <label htmlFor='price1'>
          <Center>
           <input
              name='price1' 
              type="number"
              value={state.price1}
              placeholder='10.00'
              onChange={handleprice1Change}
            />
            </Center>
            <br />
            (**Price <b>NOT</b> Including Gas Fees**)
            <br /><br />
          </label>
          </Center>
         </div> 
        }
        <Center>
        <label> 
        <input type="radio" name="tab" onClick={() => showHide("showHide2")} />
          Auction NFT
        </label>
        </Center>
        { showHide2 && 
          <div>
            <Center>
            Auction Length: 
            <div class='form-check form-check-inline'>
            <label>
            <input
              name="length"
              type="radio"
              id="Check1"
              value={state.length = "24"}
              onChange={handleLenChange} 
            />24 Hours
            </label>
            </div>
            <div class='form-check form-check-inline'>
            <label> 
            <input
              name="length"
              type="radio"
              id="Check2"
              value={state.length = "48"}
              onChange={handleLenChange} 
            />48 Hours
            </label>
            </div>
            <div class='form-check form-check-inline'>
            <label>
            <input
              name="length"
              type="radio"
              id="Check3"
              value={state.length = "72"}
              onChange={handleLenChange} 
            />72 Hours
            </label>
            </div>
            </Center>
            <br />
            <Center>
            <label>
            Starting Bid Price: 
          <input
            name='price2' 
            type="number"
            value={state.price2}
            placeholder='10.00'
            onChange={handleprice2Change}
          />
          </label>
          </Center>
          <br />
            <Center>
            Immediate Buying Price: 
          <input
            name='price3' 
            type="number"
            value={state.price3}
            placeholder='10.00 (Optional)'
            onChange={handleprice3Change}
          />
          </Center>
          <br />
          <Center>
          (**Price&nbsp;<b>NOT</b>&nbsp;Including Gas Fees**)
          </Center>
          <br /><br />
        </div>
      }
      <br />
        
        <Center>

          <Button type="submit" disabled={items.status !== IDLE} style={{color:"Black"}}>
            List My NFT For Sale
          </Button>

        </Center>
      </form>
    )
}



export {p1, p2, p3, lengt, clicked};
export default UserSetPrice;