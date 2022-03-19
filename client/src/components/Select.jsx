import "../styles/Select.css"

function Select({value, style, name, user, setUser, isConnected, setIsConnected, search, list, inputs, setInputs}) {

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }
    return (
        <div className="select">
            {value === "city" ? <input onChange={(e)=>onChange(e)} value={inputs.list_city.replace(/[^a-zA-Z0-9_-]/g,'')} className={`input-user3 ${style}`} type="search" name={name} list={search} maxLength="20"></input> : null }
            {value === "color" ? <input onChange={(e)=>onChange(e)} value={inputs.list_color.replace(/[^a-zA-Z0-9_-]/g,'')} className={`input-user3 ${style}`} type="search" name={name} list={search} maxLength="20"></input> : null }
            {value === "theme" ? <input onChange={(e)=>onChange(e)} value={inputs.list_theme.replace(/[^a-zA-Z0-9_-]/g,'')} className={`input-user3 ${style}`} type="search" name={name} list={search} maxLength="20"></input> : null }
            <datalist id={search}>
                {list.map((obj) => 
                    <option value={Object.values(obj)[1]} key={Object.values(obj)[0]}></option>
                )}
            </datalist>
        </div>
    )
}

export default Select