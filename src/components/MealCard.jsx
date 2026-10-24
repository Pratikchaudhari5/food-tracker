import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';
import FoodItemRow from './FoodItemRow';

export default function MealCard({meal,time,items,onTime,onAdd,onQty,onEdit,onDelete}){
  const s=sumItems(items);
  const slots=Math.max(0,2-items.length);
  return(
    <section className="w-[300px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <header className={meal.h+' px-4 py-4 flex items-center justify-between'}>
        <div className="flex items-center gap-2 font-bold text-lg"><span aria-hidden="true">{meal.i}</span>{meal.n}</div>
        <input type="time" aria-label={`${meal.n} time`} value={time} onChange={e=>onTime(e.target.value)} className="bg-transparent text-sm text-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
      </header>
      <div className="p-3 flex-1">
        <button onClick={onAdd} className="w-full rounded-xl border border-slate-300 py-2.5 font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition">+ Add Food</button>
        <div className="text-xs text-slate-500 mt-2 px-1">{items.length} item{items.length===1?'':'s'} | {fmt(s.cal)} kcal | {fmt(s.p)} g protein | {fmt(s.c)} g carbs | {fmt(s.f)} g fiber</div>
        <div className="mt-1">
          {items.map(it=><FoodItemRow key={it.id} it={it} onQty={d=>onQty(it.id,d)} onEdit={()=>onEdit(it)} onDelete={()=>onDelete(it.id)}/>)}
        </div>
        {Array.from({length:slots}).map((_,i)=>
          <button key={i} onClick={onAdd} className="w-full h-24 mt-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition">⊕ Add food item</button>)}
      </div>
    </section>);
}
