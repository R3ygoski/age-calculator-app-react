export default function DateInput({dateType, state, setState, err, placeholder}){
    const numberRegex = new RegExp(/^[0-9]*$/)

    const changeHandler = (e) => {
        if (numberRegex.test(e)){
            setState(e)
        }
    }

    return (
        <div className="card__form-container">
            <label className={`${err?"card__form-container-label-error":"card__form-container-label"}`} htmlFor={dateType}>{dateType}</label>
            <input className={`${err?"card__form-container-input-error":"card__form-container-input"}`} type="text" id={dateType} value={state}
            onChange={e => changeHandler(e.target.value)} placeholder={placeholder}/>
            <label className="card__form-container-error">{err}</label>
        </div>
    )
}