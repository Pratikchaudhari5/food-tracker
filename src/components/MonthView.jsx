import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function MonthView({db,date,setDate,setView}){
  const [ym,setYm]=useState(()=>{const d=parse(date);return[d.getFullYear(),d.getMonth()]});
  const [y,m]=ym;
  const shift=n=>{const d=new Date(y,m+n,1);setYm([d.getFullYear(),d.getMonth()])};
  const days=new Date(y,m+1,0).getDate();
  const offset=(new Date(y,m,1).getDay()+6)%7;
  const todayIso=iso(new Date());
  const cells=[...Array(offset).fill(null),...Array.from({length:days},(_,i)=>i+1)];
  const bb='h-11 min-w-11 px-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300';
  return(
    <section aria-label="Month overview">
      <div className="flex items-center gap-3 mb-4">
        <button aria-label="Previous month" onClick={()=>shift(-1)} className={bb}>‹</button>
        <h2 className="text-2xl font-bold min-w-[200px] text-center">{new Date(y,m,1).toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</h2>
        <button aria-label="Next month" onClick={()=>shift(1)} className={bb}>›</button>
        <button onClick={()=>{const d=new Date();setYm([d.getFullYear(),d.getMonth()])}} className={bb+' font-medium'}>This month</button>
      </div>
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-7 gap-2 min-w-[760px]">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(w=><div key={w} className="text-center text-sm font-semibold text-slate-500">{w}</div>)}
          {cells.map((n,i)=>{
            if(!n)return <div key={'e'+i}/>;
            const id=iso(new Date(y,m,n));
            const dd=db.days[id];
            const t=sumItems(dd?MEALS.flatMap(x=>Array.isArray(dd[x.k])?dd[x.k]:[]):[]);
            const has=t.cal>0||t.p>0||t.c>0||t.f>0;
            return(
              <button key={id} onClick={()=>{setDate(id);setView('day')}} aria-label={`Open ${id}`}
                className={'text-left rounded-xl border p-2 bg-white shadow-sm hover:shadow-md hover:bg-indigo-50/40 transition focus:outline-none focus:ring-2 focus:ring-indigo-300 '+(id===todayIso?'border-indigo-500 ring-1 ring-indigo-300':'border-slate-200')+(id===date?' bg-indigo-50':'')}>
                <div className="text-lg font-bold mb-1">{n}</div>
                {has?<div className="text-xs space-y-0.5">
                  <div className="text-rose-500 font-semibold">🔥 {Math.round(t.cal).toLocaleString()} kcal</div>
                  <div className="text-green-600">💪 {fmt(t.p)} g P</div>
                  <div className="text-orange-500">🌾 {fmt(t.c)} g C</div>
                  <div className="text-blue-500">🥦 {fmt(t.f)} g F</div>
                </div>:<div className="text-xs text-slate-300">No entries</div>}
              </button>);
          })}
        </div>
      </div>
    </section>);
}
