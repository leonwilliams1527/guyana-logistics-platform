'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function AuthForm({mode}){
 const router=useRouter(); const [form,setForm]=useState({name:'',email:'',password:''});
 function submit(e){e.preventDefault(); if(mode==='register'){const id='GY'+Math.floor(100000+Math.random()*900000); localStorage.setItem('shop2gyUser',JSON.stringify({...form,customerId:id}));} router.push('/dashboard');}
 return <form className="auth-card" onSubmit={submit}>{mode==='register'&&<label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>}<label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><button className="button full" type="submit">{mode==='register'?'Create account':'Log in'}</button><p className="fine-print">Demo account flow. Production authentication will require a secure database and email verification.</p></form>
}
