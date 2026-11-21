const PROJECTS=[
{t:"Electricity Bill Calculating System",d:"A Python-based application that calculates electricity consumption and monthly bills, displaying consumed units, applicable charges, and the total bill.",tech:["Python","Pandas"],cat:"Academic Project",real:true},
{t:"Student Result Management System",d:"A system for managing student information, marks, grades, and academic performance. It calculates total marks, percentages, and grades.",tech:["Python","OOP"],cat:"Academic Project",real:true},
{t:"Personal Portfolio Website",d:"A responsive personal website showcasing professional information, technical skills, achievements, and projects.",tech:["HTML","CSS","JavaScript"],cat:"Academic Project",real:true},
{t:"Personal Finance Dashboard",d:"Concept for an expense tracking dashboard.",tech:["HTML","CSS","JavaScript"],cat:"Sample / Concept",f:["Expense tracking interface","Financial visualization","Monthly spending dashboard","Responsive dashboard design"]},
{t:"AI Chatbot Interface",d:"Concept for a modern chatbot front end. No real AI is integrated.",tech:["HTML","CSS","JavaScript"],cat:"Sample / Concept",f:["Modern chat bubbles","Typing animation","Interactive frontend demonstration","No real AI integration claimed"]},
{t:"Weather Forecast Application",d:"Concept for a weather dashboard using sample data.",tech:["HTML","CSS","JavaScript"],cat:"Sample / Concept",f:["Weather dashboard","Search interface","Weather information display","Would use clearly labelled sample data"]},
{t:"E-Commerce Website",d:"Concept for a responsive online store front end.",tech:["HTML","CSS","JavaScript"],cat:"Sample / Concept",f:["Product cards","Shopping cart interface","Product filtering","Responsive layout"]},
{t:"Student Attendance Management System",d:"Concept for an attendance tracking interface.",tech:["HTML","CSS","JavaScript"],cat:"Sample / Concept",f:["Student records","Attendance dashboard","Attendance statistics","Interactive interface"]}];
const SKILLS={"DevOps":["Linux","Cloud Computing","Docker"],"Frontend Development":["HTML5","CSS3","JavaScript","Responsive Web Design","Bootstrap"],"Programming":["Python","Object-Oriented Programming","Problem Solving"],"Python Libraries":["NumPy","Pandas"],"Development Tools":["Git","GitHub","Visual Studio Code"],"Areas of Interest":["Artificial Intelligence","Machine Learning","Web Development","Freelancing"]};
const GOALS=["Become a skilled professional web developer.","Start working as a freelancer.","Develop expertise in modern frontend technologies.","Explore Artificial Intelligence and Machine Learning.","Build real-world projects.","Continuously improve technical and communication skills."];
function el(h){const d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild}
function renderAll(){
 document.getElementById('skillGrid').append(...Object.entries(SKILLS).map(([k,v])=>el(`<div class="glass card reveal"><h3>${k}</h3>${v.map(s=>`<span class="tag">${s}</span>`).join('')}</div>`)));
 document.getElementById('goalGrid').append(...GOALS.map(g=>el(`<div class="glass card reveal">${g}</div>`)));
 const g=document.getElementById('projectGrid');
 PROJECTS.forEach((p,i)=>{g.append(el(`<article class="glass card proj reveal"><div class="art">${p.t.split(' ').map(w=>w[0]).slice(0,3).join('')}</div><span class="tag ${p.real?'':'warn'}">${p.cat}</span><h3>${p.t}</h3><p>${p.d}</p><div>${p.tech.map(t=>`<span class="tag">${t}</span>`).join('')}</div>${p.real?'':`<div class="btns"><button class="btn" data-i="${i}">View Details</button></div>`}</article>`))});
 g.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)openModal(PROJECTS[b.dataset.i],b)});
}
let lastFocus;
function openModal(p,trigger){lastFocus=trigger;
 mTitle.textContent=p.t;mDesc.textContent=p.d+" This is a concept, not a completed project.";
 mList.replaceChildren(...p.f.map(f=>{const l=document.createElement('li');l.textContent=f;return l}));
 mTech.textContent="Planned technologies: "+p.tech.join(", ");modal.hidden=false;mClose.focus()}
function closeModal(){modal.hidden=true;lastFocus&&lastFocus.focus()}
