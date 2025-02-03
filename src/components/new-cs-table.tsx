
import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";

export default function NewCSTable({ headers }: { headers: string[] }) {
    const summaryOrders = useCustomStore(useMainStore, (state: any) => state.summaryOrders)
    const onPaidOrder = useMainStore((state) => state.onPaidOrder)
    var nameColStyle = "text-white"
    var topColStyle = "text-info"
    var todColStyle = "text-success"
    var botColStyle = "text-warning"
    var checkBoxStyle = "checkbox checkbox-success checkbox-lg xs:checkbox-sm"
    return (
        <div className="overflow-x-auto px-8">
            <table className="table table-zebra table-lg xs:table-sm">
                <tbody>
                    <tr className="bg-black text-xl xs:text-base">
                        {
                            headers.map((hName: string, index: number) => {
                                return <th key={index} className=" text-gray-200 text-xl xs:text-base"> {hName} </th>
                            })
                        }
                    </tr>

                    {
                        summaryOrders?.filter((el: any) => el.name).map((el: any, index: number) => {
                            return (
                                <tr key={el.id} data-tip={el.number}>
                                    <td className={nameColStyle} >
                                        {el.name}
                                    </td>
                                    <td className="tooltip tooltip-info text-center" data-tip={el.number}>
                                        XxxX
                                    </td>
                                    <td className={topColStyle}>{el.top ?? 0}</td>
                                    <td className={todColStyle}>{el.tod ?? 0}</td>
                                    <td className={botColStyle}>{el.bot ?? 0}</td>
                                    <td className=" text-red-600 font-extrabold"> {el.sum?.toLocaleString('en-US') ?? 0} </td>
                                    <td>
                                        <label>
                                            <input type="checkbox" defaultChecked={el.isPaid ?? false} className={checkBoxStyle} onChange={(ev) => onPaidOrder(ev.target.checked, index)} />
                                        </label>
                                    </td>
                                </tr>

                            )
                        })
                    }

                </tbody>
            </table>

        </div>


    )
}