import React, {useState} from "react"
import { Base } from "./base.comp"
import { Button, Center} from "@chakra-ui/react"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {IDLE} from "../global/constants"
import {useAddress} from "../hooks/use-url-address.hook"
import {useCurrentUser} from "../hooks/use-current-user.hook.js"
import { Int } from "@onflow/types"


var p1 = 0



export function CreateNFTCluster (){ 
    
  
    const [title1, setTitle1] = useState('');
    const [description, setDescription] = useState('');
    const [price1, setPrice1] = useState(null);
    const [price2, setPrice2] = useState('');
    const [price3, setPrice3] = useState('');
    const [length, setLength] = useState('');
    const [showHide1, setShowHide1] = useState(false);
    const [showHide2, setShowHide2] = useState(false);
    const [state, setState] = useState({
      title1: '',
      description: '',
      price1: Int,
      price2: '',
      price3: '',
      length: ''
    })

    const [cu] = useCurrentUser()
    const address = useAddress()
    const items = useAccountItems(address)
    if (address == null) return <div>Not Found</div> 

  
  // Form submitting logic, prevent default page refresh 
  const handleSubmit = (event) =>{
    event.preventDefault();
    
    p1=parseInt(`${price1}`)

    if(cu.addr === address){
      items.mint()
    }else{
      alert(`Must be logged on to your account`)
    }

    if(title1===''){
      alert(`
        You must enter a Name for the NFT.
      `)
    }
    if(description===''){
      alert(`
        You must enter a Description for the NFT.
      `)
    }
    if(price1===null && showHide1===true){
      alert(`
        You must enter a Fixed Price for the NFT.
      `)
    }
    if(price2==='' && showHide2===true){
      alert(`
        You must enter a Starting Bid Price for the NFT.
      `)
    }
    if(length==='' && showHide2===true){
      alert(`
        You must enter a Auction Length for the NFT.
      `)
    }
    if(title1!=='' && description!=='' && price1!==null && showHide1===true){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Price : ${price1}
      `)
    }
    if(title1!=='' && description!=='' && price2!=='' && length!=='' && showHide2===true && price3===''){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Starting Bid : ${price2}
        Auction Length : ${length}
      `)
    }
    else if(title1!=='' && description!=='' && price2!=='' && length!=='' && showHide2===true && price3!==''){
      alert(`
        ____Your NFT____\n
        Name : ${title1}
        Description : ${description}
        Starting Bid : ${price2}
        Immediate Buy Price : ${price3}
        Auction Length : ${length}
      `)
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


  // Method causes to store all the values of the 
  // input field in react state single method handle 
  // input changes of all the input field using ES6 
  // javascript feature computed property names
  const handletitle1Change = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setTitle1(event.target.value);
      const title1 = event.target.value;
        setState({
          title1: title1
        });
      }

  const handleDescChange = (event) => {
      // Computed property names
      // keys of the objects are computed dynamically
      setDescription(event.target.value);
      const description = event.target.value;
        setState({
          description: description
        });
      
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

  // Return a controlled form i.e. values of the 
  // input field not stored in DOM values are exist 
  // in react component itself as state
    return(
      <Base>
      <form onSubmit={handleSubmit}>
        <Center>
          <label htmlFor='title1'>Name: 
          <br />
          <input
            name="title1"
            value={state.title1}
            placeholder='Name'
            onChange={handletitle1Change}
          />
          </label>
        </Center>
          <br /><br />
          <Center>
          <label htmlFor='description'>What is this NFT?
          <br />
          <input
            name='description'
            value={state.description}
            placeholder='Description'
            onChange={handleDescChange}
          />
          </label>
          </Center>
          <br /><br />
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
            Create My NFT
          </Button>

        </Center>

      </form>
      </Base>
    )
}


export default CreateNFTCluster;



export {p1};

//export default CreateNFTCluster;