export function InputBox({label , placeholder , onChange , type}) {
    return(
        <div>
            <div className="font-medium text-sm px-2 py-2 text-start">
                {label}
            </div>

            <div className="flex px-2">
                <input type={type || "text"} placeholder={placeholder} onChange={onChange} className="font-sm w-full px-2 py-1 border rounded border-slate-300"/>
            </div>
        </div>
    )
}