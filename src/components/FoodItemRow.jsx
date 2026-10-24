import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function FoodItemRow({it,onQty,onEdit,onDelete}){
  const [open,setOpen]=useState(false);const [conf,setConf]=useState(false);
  const t=itemTotals(it);
  const close=()=>{setOpen(false);setConf(false)};
  return(
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="text-4xl w-12 shrink-0 text-center leading-none pt-1" aria-hidden="true">{emoji(it.name)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <div className="font-semibold truncate">{it.name}</div>
            <div className="text-sm text-slate-500">{fmt(it.qty)} {it.unit}</div>
          </div>
          <div className="relative">
            <button aria-label={`Options for ${it.name}`} onClick={()=>setOpen(!open)} className="px-2 py-1 rounded hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 font-bold">⋮</button>
            {open&&<><div className="fixed inset-0 z-10" onClick={close}/>
            <div className="absolute right-0 z-20 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg text-sm overflow-hidden">
              <button className="w-full text-left px-3 py-2 hover:bg-slate-50" onClick={()=>{close();onEdit()}}>✏️ Edit</button>
              <button className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600" onClick={()=>conf?(close(),onDelete()):setConf(true)}>{conf?'🗑️ Click to confirm':'🗑️ Delete'}</button>
            </div></>}
          </div>
        </div>
        <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-x-2">
          <span>{fmt(t.cal)} kcal</span><span>{fmt(t.p)}g P</span><span>{fmt(t.c)}g C</span><span>{fmt(t.f)}g Fiber</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <button aria-label="Decrease quantity" disabled={it.qty<=0.5} onClick={()=>onQty(-0.5)} className="w-6 h-6 rounded border border-slate-300 text-sm hover:bg-slate-50 disabled:opacity-40">−</button>
          <span className="text-xs w-8 text-center">{fmt(it.qty)}</span>
          <button aria-label="Increase quantity" onClick={()=>onQty(0.5)} className="w-6 h-6 rounded border border-slate-300 text-sm hover:bg-slate-50">+</button>
        </div>
      </div>
    </div>);
}
