function initScene(){
 const cv=document.getElementById('scene');if(!cv||typeof THREE==='undefined')return;
 const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
 r.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,.1,100);cam.position.z=7;
 s.add(new THREE.AmbientLight(0x4466aa,.6));
 const l1=new THREE.PointLight(0x06B6D4,2,30);l1.position.set(5,4,5);s.add(l1);
 const l2=new THREE.PointLight(0x2563EB,2,30);l2.position.set(-5,-3,4);s.add(l2);
 const mat=c=>new THREE.MeshStandardMaterial({color:c,metalness:.6,roughness:.25,transparent:true,opacity:.85});
 const objs=[];
 [[new THREE.IcosahedronGeometry(1.3,0),0x2563EB,2.6,0],[new THREE.TorusKnotGeometry(.6,.2,80,12),0x06B6D4,-3,1.8],[new THREE.OctahedronGeometry(.7),0x2563EB,-2.2,-2],[new THREE.TorusGeometry(.7,.18,12,32),0x06B6D4,3.4,-2.2]].forEach(([g,c,x,y])=>{const m=new THREE.Mesh(g,mat(c));m.position.set(x,y,0);s.add(m);objs.push(m)});
 const N=500,pos=new Float32Array(N*3);for(let i=0;i<N*3;i++)pos[i]=(Math.random()-.5)*24;
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));
 const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x94AFC5,size:.05}));s.add(pts);
 let mx=0,my=0,vis=true;
 addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 function size(){const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w<700?10:7;cam.updateProjectionMatrix()}
 size();addEventListener('resize',size);
 new IntersectionObserver(e=>{const was=vis;vis=e[0].isIntersecting;if(vis&&!was)loop()}).observe(cv);
 function loop(){if(!vis)return;requestAnimationFrame(loop);
  if(!reduce){objs.forEach((o,i)=>{o.rotation.x+=.004+i*.001;o.rotation.y+=.006});pts.rotation.y+=.0006}
  cam.position.x+=(mx*2-cam.position.x)*.04;cam.position.y+=(-my*2-cam.position.y)*.04;cam.lookAt(0,0,0);r.render(s,cam)}
 loop();
}
