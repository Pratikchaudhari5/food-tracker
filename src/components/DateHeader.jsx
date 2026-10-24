import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function DateHeader({date,setDate}){
  const d=parse(date);const shift=n=>{const x=parse(date);x.setDate(x.getDate()+n);setDate(iso(x))};
  const b='h-11 min-w-11 px-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition';
  return(
    <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <button aria-label="Previous day" onClick={()=>shift(-1)} className={b}>‹</button>
        <div>
          <div className="text-2xl font-bold leading-tight">{d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>
        </div>
        <button aria-label="Next day" onClick={()=>shift(1)} className={b}>›</button>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=>setDate(iso(new Date()))} className={b+' font-medium'}>📅 Today</button>
        <input type="date" aria-label="Pick a date" value={date} onChange={e=>e.target.value&&setDate(e.target.value)} className={b}/>
      </div>
    </header>);
}
