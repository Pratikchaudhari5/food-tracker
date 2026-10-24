import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function ViewTabs({view,setView,dark,setDark}){
  const b=a=>'px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-300 '+(view===a?'bg-indigo-600 text-white':'bg-white border border-slate-200 hover:bg-slate-50');
  return(<nav className="flex gap-2 mb-3" aria-label="Views"><button className={b('day')} onClick={()=>setView('day')}>Day</button><button className={b('month')} onClick={()=>setView('month')}>Month</button><button onClick={()=>setDark(!dark)} aria-pressed={dark} aria-label="Toggle dark theme" className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300">{dark?'☀️ Light':'🌙 Dark'}</button></nav>);
}
