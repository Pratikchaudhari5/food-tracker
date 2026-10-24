import {useState,useEffect,useMemo} from 'react';
import {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems} from './utils';
import Modal from './components/Modal';
import MealCard from './components/MealCard';
import NutritionSummary from './components/NutritionSummary';
import DateHeader from './components/DateHeader';
import ViewTabs from './components/ViewTabs';
import MonthView from './components/MonthView';

export default function App(){
  const [db,setDb]=useState(load);
  const [date,setDate]=useState(iso(new Date()));
  const [modal,setModal]=useState(null);
  const [view,setView]=useState('day');
  const [dark,setDark]=useState(()=>{try{const s=localStorage.getItem('food-tracker-theme');if(s)return s==='dark'}catch(e){}return !!(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)});
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark);try{localStorage.setItem('food-tracker-theme',dark?'dark':'light')}catch(e){}},[dark]);
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){}},[db]);
  const day=db.days[date]||{};
  const itemsOf=k=>Array.isArray(day[k])?day[k]:[];
  const total=useMemo(()=>sumItems(MEALS.flatMap(m=>itemsOf(m.k))),[db,date]);
  const update=(k,fn)=>setDb(d=>{const cur=(d.days[date]||{});const list=Array.isArray(cur[k])?cur[k]:[];return{...d,days:{...d.days,[date]:{...cur,[k]:fn(list)}}}});
  const save=it=>{const k=modal.meal.k;update(k,l=>l.some(x=>x.id===it.id)?l.map(x=>x.id===it.id?it:x):[...l,it]);setModal(null)};
  return(
    <div className="max-w-[1600px] mx-auto p-4 pb-0">
      <ViewTabs view={view} setView={setView} dark={dark} setDark={setDark}/>
      {view==='month'&&<MonthView db={db} date={date} setDate={setDate} setView={setView}/>}
      <div className={view==='month'?'hidden':''}>
      <DateHeader date={date} setDate={setDate}/>
      <main className="scr overflow-x-auto pb-3" aria-label="Meals">
        <div className="flex gap-4 items-stretch w-max min-w-full">
          {MEALS.map(m=>(
            <MealCard key={m.k} meal={m} time={db.times[m.k]||m.t} items={itemsOf(m.k)}
              onTime={t=>setDb(d=>({...d,times:{...d.times,[m.k]:t}}))}
              onAdd={()=>setModal({meal:m})}
              onEdit={it=>setModal({meal:m,item:it})}
              onQty={(id,delta)=>update(m.k,l=>l.map(x=>x.id===id?{...x,qty:Math.max(0.5,Math.round((x.qty+delta)*100)/100)}:x))}
              onDelete={id=>update(m.k,l=>l.filter(x=>x.id!==id))}/>))}
        </div>
      </main>
      <div className="sticky bottom-0 pt-2 pb-3 bg-[#f8f9fe]">
        <NutritionSummary total={total} targets={db.targets} isToday={date===iso(new Date())}
          onTarget={(k,v)=>setDb(d=>({...d,targets:{...d.targets,[k]:Math.max(0,parseFloat(v)||0)}}))}/>
      </div>
      </div>
      {modal&&<Modal meal={modal.meal} item={modal.item} onSave={save} onClose={()=>setModal(null)}/>}
    </div>);
}
