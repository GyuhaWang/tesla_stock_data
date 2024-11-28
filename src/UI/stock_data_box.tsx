export default function StockDataBox({title,value,formatType='currency'}:{title:string, value:number,formatType?:'currency'|'number'}){
    return <div id="stock_data_box_layout">
    <div className="text_sm text_bold">{title}</div>
    <div className="text_lg text_bold">{formatType=="currency"?Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(value):Intl.NumberFormat(undefined, { maximumFractionDigits: 5}).format(value)}</div>
    </div>
}