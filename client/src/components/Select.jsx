import "../styles/Select.css"
import {useState} from "react"

function Select({user, setUser, isConnected, setIsConnected, search, list, inputs, setInputs}) {

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    return (
        <div className="select">
            <input onChange={(e)=>onChange(e)} className="input-user3" type="search" name="modelsearch" list={search}></input>
            <datalist id={search}>
                {list.map((obj) => 
                    <option value={Object.values(obj)[1]}></option>
                )}
            </datalist>
        </div>
    )
}

export default Select