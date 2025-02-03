"use client"
import { Order } from "@/model/order"
import { useMainStore } from "@/hooks/useMainStore";

export default function NRow({ rowData, index, removeOrder }: { rowData: Order, index: number , removeOrder : (id : string) => void}) {
    const editOrder = useMainStore( (state) => state.editOrder)
    var nameColStyle = "input border border-slate-400 font-bold text-black input-secondary w-full max-w-xs xs:text-xs"
    var othersColStyle = "input border border-slate-400 font-bold text-black input-secondary w-full max-w-xs text-right xs:text-xs"
    var numberColStyle = "input border border-slate-400 font-bold text-black input-secondary w-full max-w-xs text-center xs:text-xs"

    return (
        <div className="flex" style={{backgroundColor: rowData?.color}}>
            {/* <input  style={{backgroundColor: rowData?.color}} type="text" placeholder="ชื่อ" className={nameColStyle} defaultValue={rowData.name}  onChange={(ev) => editOrder({ name: ev.target.value }, index)}/>
            <input  style={{backgroundColor: rowData?.color}} type="text" placeholder="เลข" className={othersColStyle} defaultValue={rowData.number} onChange={(ev) => editOrder({ number: ev.target.value }, index)}/>
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.top ?? 0} onChange={(ev) => editOrder({ top: parseInt(ev.target.value) }, index)}/>
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.tod ?? 0} onChange={(ev) => editOrder({ tod: parseInt(ev.target.value) }, index)}/>
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.bot ?? 0} onChange={(ev) => editOrder({ bot: parseInt(ev.target.value) }, index)}/> */}
            <input  style={{backgroundColor: rowData?.color}} type="text" placeholder="ชื่อ" className={nameColStyle} defaultValue={rowData.name}  readOnly={true} />
            <input  style={{backgroundColor: rowData?.color}} type="text" placeholder="เลข" className={othersColStyle} defaultValue={rowData.number} readOnly={true} />
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.top ?? 0} readOnly={true} />
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.tod ?? 0} readOnly={true} />
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.bot ?? 0} readOnly={true} />
            <input  style={{backgroundColor: rowData?.color}} type="number" step={10} className={numberColStyle} defaultValue={rowData.sum ?? 0} readOnly={true} />
            <div className="flex w-full max-w-[100px] xs:max-w-[40px] justify-center items-center px-4  border-slate-400 border">
                <button className="btn btn-error btn-sm xs:btn-xs text-base xs:text-sm" onClick={(ev) => removeOrder(rowData?.id)}> X </button>
            </div>

        </div>
    )
}

