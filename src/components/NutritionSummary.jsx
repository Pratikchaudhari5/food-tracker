import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';
import NutritionProgressBar from './NutritionProgressBar';

export default function NutritionSummary({total,targets,onTarget,isToday}){
  const [edit,setEdit]=useState(false);
  return(
    <section className="bg-indigo-50/60 border border-slate-200 rounded-2xl p-3 flex flex-col lg:flex-row gap-3 lg:items-center">
      <div className="lg:w-56 px-2 shrink-0">
        <div className="text-xl font-bold">Σ Total ({isToday?'Today':'Selected day'})</div>
        <div className="text-sm text-slate-500">Auto Calculated</div>
        <button onClick={()=>setEdit(!edit)} className="mt-1 text-xs text-indigo-600 underline">{edit?'Done':'Edit daily targets'}</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
        {NUTS.map(n=>(
          <div key={n.k} className="bg-white rounded-xl shadow-sm p-3">
            <div className={n.tc+' font-semibold text-sm flex items-center gap-1'}><span aria-hidden="true">{n.i}</span>{n.n}</div>
            <div className="text-2xl font-bold">{n.k==='cal'?Math.round(total[n.k]).toLocaleString():fmt(total[n.k])} <span className="text-base">{n.k==='cal'?'':'g'}</span></div>
            {edit?
              <label className="text-xs text-slate-500 flex items-center gap-1">Target
                <input type="number" min="0" aria-label={`${n.n} target`} value={targets[n.k]} onChange={e=>onTarget(n.k,e.target.value)} className="w-16 border border-slate-300 rounded px-1 py-0.5"/> {n.u}</label>
              :<div className="text-sm text-slate-500">{targets[n.k]>0?`/ ${Number(targets[n.k]).toLocaleString()} ${n.u}`:'No target set'}</div>}
            <NutritionProgressBar value={total[n.k]} target={Number(targets[n.k])} color={n.bc}/>
          </div>))}
      </div>
    </section>);
}
