import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function Modal({meal,item,onSave,onClose}){
  const [v,setV]=useState(item?{name:item.name,qty:item.qty,unit:item.unit,cal:item.cal,p:item.p,c:item.c,f:item.f}:{name:'',qty:1,unit:'',cal:'',p:'',c:'',f:''});
  const [err,setErr]=useState({});
  const set=k=>e=>setV({...v,[k]:e.target.value});
  const submit=e=>{
    e.preventDefault();const er={};
    if(!v.name.trim())er.name='Food name is required';
    const q=num(v.qty);if(!(q>0))er.qty='Enter a quantity above 0';
    if(!v.unit.trim())er.unit='Unit is required';
    ['cal','p','c','f'].forEach(k=>{const x=num(v[k]);if(!(x>=0))er[k]='Enter 0 or more'});
    setErr(er);if(Object.keys(er).length)return;
    onSave({id:item?item.id:uid(),name:v.name.trim(),qty:q,unit:v.unit.trim(),cal:num(v.cal),p:num(v.p),c:num(v.c),f:num(v.f)});
  };
  useEffect(()=>{const h=e=>e.key==='Escape'&&onClose();window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[]);
  const F=({id,label,type='text',step,ph,span})=>(
    <div className={span?'col-span-2':''}>
      <label htmlFor={id} className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input id={id} type={type} step={step} min={type==='number'?0:undefined} placeholder={ph} value={v[id]} onChange={set(id)}
        className={'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 '+(err[id]?'border-rose-400':'border-slate-300')}/>
      {err[id]&&<p className="text-xs text-rose-500 mt-1">{err[id]}</p>}
    </div>);
  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
      <form onSubmit={submit} noValidate role="dialog" aria-modal="true" aria-label="Food form" className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 max-h-full overflow-auto">
        <h2 className="font-bold text-lg mb-1">{item?'Edit food':'Add food'} · {meal.n}</h2>
        <p className="text-xs text-slate-500 mb-4">Enter nutrition for <b>one</b> unit (e.g. 1 medium banana). Totals scale with quantity.</p>
        <div className="grid grid-cols-2 gap-3">
          <F id="name" label="Food name" ph="Banana" span/>
          <F id="qty" label="Quantity" type="number" step="any"/>
          <F id="unit" label="Unit" ph="medium, cup, g, ml…"/>
          <F id="cal" label="Calories per unit (kcal)" type="number" step="any"/>
          <F id="p" label="Protein per unit (g)" type="number" step="any"/>
          <F id="c" label="Carbohydrates per unit (g)" type="number" step="any"/>
          <F id="f" label="Fiber per unit (g)" type="number" step="any"/>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-300 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">{item?'Save changes':'Add Food'}</button>
        </div>
      </form>
    </div>);
}
