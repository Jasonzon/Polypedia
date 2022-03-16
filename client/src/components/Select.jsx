import "../styles/Select.css"

function Select({style, name, user, setUser, isConnected, setIsConnected, search, list, inputs, setInputs}) {

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }
    return (
        <div className="select">
            <input onChange={(e)=>onChange(e)} className={`input-user3 ${style}`} type="search" name={name} list={search}></input>
            <datalist id={search}>
                {list.map((obj) => 
                    <option value={Object.values(obj)[1]}></option>
                )}
            </datalist>
        </div>
    )
}

export default Select