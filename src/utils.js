const MEALS=[
{k:'wakeUp',n:'Wake Up',i:'🌅',h:'bg-blue-100',t:'06:00'},
{k:'preWorkout',n:'Pre-Workout',i:'🏋️',h:'bg-purple-100',t:'06:30'},
{k:'breakfast',n:'Breakfast',i:'🥣',h:'bg-green-100',t:'08:30'},
{k:'lunch',n:'Lunch',i:'🍽️',h:'bg-yellow-100',t:'13:00'},
{k:'snack',n:'Snacks',i:'🍿',h:'bg-orange-100',t:'17:00'},
{k:'dinner',n:'Dinner',i:'🌙',h:'bg-pink-100',t:'20:00'}];
const NUTS=[
{k:'cal',n:'Calories',u:'kcal',i:'🔥',tc:'text-rose-500',bc:'bg-rose-500'},
{k:'p',n:'Protein',u:'g',i:'💪',tc:'text-green-600',bc:'bg-green-600'},
{k:'c',n:'Carbs',u:'g',i:'🌾',tc:'text-orange-500',bc:'bg-orange-500'},
{k:'f',n:'Fiber',u:'g',i:'🥦',tc:'text-blue-500',bc:'bg-blue-500'}];
const DEF_T={cal:2200,p:120,c:300,f:40};
const KEY='food-tracker-v1';
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parse=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c)};
const fmt=n=>String(Math.round((Number(n)||0)*100)/100);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const EMO={banana:'🍌',milk:'🥛',water:'💧',coffee:'☕',tea:'🍵',almond:'🌰',rice:'🍚',roti:'🫓',chapati:'🫓',egg:'🥚',apple:'🍎',salad:'🥗',paneer:'🧀',dal:'🍲',sabzi:'🥘',poha:'🍛',bread:'🍞',orange:'🍊',curd:'🥣',oats:'🥣',chicken:'🍗',fish:'🐟'};
const emoji=n=>{const l=n.toLowerCase();for(const k in EMO)if(l.includes(k))return EMO[k];return '🍴'};
const num=v=>{const x=parseFloat(v);return isFinite(x)?x:NaN};

function load(){
  try{const d=JSON.parse(localStorage.getItem(KEY));
    if(d&&typeof d==='object')return{days:(d.days&&typeof d.days==='object')?d.days:{},times:d.times||{},targets:{...DEF_T,...(d.targets||{})}};
  }catch(e){}
  return{days:{},times:{},targets:{...DEF_T}};
}
// Calculation utilities (kept separate from UI)
const itemTotals=it=>({cal:it.qty*it.cal,p:it.qty*it.p,c:it.qty*it.c,f:it.qty*it.f});
const sumItems=items=>(items||[]).reduce((a,it)=>{const t=itemTotals(it);return{cal:a.cal+t.cal,p:a.p+t.p,c:a.c+t.c,f:a.f+t.f}},{cal:0,p:0,c:0,f:0});

export {MEALS,NUTS,DEF_T,KEY,iso,parse,fmt,uid,emoji,num,load,itemTotals,sumItems};
