
import React, { useState,useRef,useEffect } from 'react'
import "../Components/calculator.css"

function Calculator() {
    const [val,setVal] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        setVal(e.target.value);
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
            setVal(prevVal => prevVal + key);
            e.preventDefault();
        } else if (key === 'Backspace') {
            setVal(prevVal => prevVal.slice(0, -1));
            e.preventDefault();
        }
        if (key === 'Enter') {
            e.preventDefault();
            calculate(); 
        }
        if(key === 'Escape'){
            e.preventDefault();
            handleClear();
        }
    };

    const digitsLoop = () => {
        const digits= [];

        for(let i=1;i<10;i++)
        {
            digits.push(
                <button key={i} value= {i} onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>{i}</button>
            )
            
        }
        return digits;
    }

    const calculate = () =>{
        setVal(eval(val).toString());
    }

    const backspace = () =>{
        try {
            setVal(val.slice(0,-1))
        } catch (error) {
            setVal("");   
        }
    }

    const handleClear = () => {
        setVal("");
    }

    

  return (
    <div className='calc-main'>
        <div className='calculator'>
        <div className='result-screen'>
            <input 
            type="text"
            ref={inputRef}
            value={val=== "" ? "0" : val}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className='result-screen'
            />
            {/* {val || "0"} */}
            </div>

            <div className="operators">
                <button value= "+" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>+</button>
                <button value= "-" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>-</button>
                <button value= "*" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>X</button>
                {/* <button value= "/" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>/</button> */}
            </div>

            <div className='digits'>
                { digitsLoop() }
                <button value= "0" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>0</button>
                <button value= "." onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>.</button>
                <button onClick={backspace}>DEL</button>
                
                {/* <button className='equals' onClick={calculate}>=</button> */}
            </div>

            <div className='square'>
            <button value= "/" onClick={(e)=> {setVal(val + e.target.value); e.preventDefault();}}>/</button>
                <button onClick={handleClear}>AC</button>
                <button className='equalsto' onClick={calculate}>=</button> 
                
            </div>

            
        
        </div>
        
      
    </div>
  )
}

export default Calculator
