import "../styles/Select.css"

function Select({user, setUser, isConnected, setIsConnected}) {
    return (
        <div className="select">
            <input className="select-input" type="search" name="modelsearch" list="modelslist"></input>
            <button className="select-search">Rechercher</button>
            <datalist id="modelslist">
                <option value="Toutankatech"></option>
                <option value="All-inTech"></option>
            </datalist>
        </div>
    )
}

export default Select