import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from '../utils';

export default function NutritionProgressBar({value,target,color}){
  const pct=target>0?(value/target)*100:0;
  return(
    <div className="flex items-center gap-2 mt-2">
      <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin="0" aria-valuemax="100">
        <div className={color+' h-full rounded-full transition-all duration-500'} style={{width:Math.min(100,Math.max(0,pct))+'%'}}/>
      </div>
      <span className="text-sm font-bold w-12 text-right">{target>0?Math.round(pct)+'%':'—'}</span>
    </div>);
}
