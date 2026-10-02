import {zoomAt,constrain,distance,midpoint} from './zoom.js';
import {buildWhatsappUrl} from './contact.js';
const $=s=>document.querySelector(s);
const services={
 ppf:{title:'PPF kaplama',text:'Aracınızın hangi alanlarını korumak istediğinizi konuşalım. Kaplama kapsamı ve kullanılacak ürün, araç ve beklentinize göre netleşir.',points:['Araç marka ve modeli','Kaplanmasını istediğiniz alanlar','Ürün, süre ve garanti bilgisi için işletme teyidi']},
 seramik:{title:'Seramik kaplama',text:'Boya yüzeyinin mevcut durumunu ve koruma beklentinizi birlikte değerlendirelim. Hazırlık ve uygulama detaylarını işletmeyle görüşerek belirleyin.',points:['Boya yüzeyinin mevcut durumu','Kullanım ve bakım beklentiniz','Uygulama içeriği ve bakım önerileri']},
 polisaj:{title:'Pasta polisaj',text:'Yüzey görünümü ve parlaklık için aracınızın boya durumuna uygun bakım seçeneklerini konuşalım. Sonuç ve kapsam, araç incelendikten sonra belirlenir.',points:['Boya ve yüzey durumunun değerlendirilmesi','Beklediğiniz görünüm','İşlem kapsamı, fiyat ve süre teyidi']},
 ic:{title:'Detaylı iç temizlik',text:'Koltuklar, döşemeler ve iç mekândaki ihtiyaçlarınız üzerinden başlayalım. Temizlenecek alanları ve uygun uygulamayı işletmeyle netleştirin.',points:['Koltuk ve döşeme türü','Özellikle ilgilenilmesini istediğiniz alanlar','Kapsam ve uygun zamanın belirlenmesi']},
 yikama:{title:'VIP yıkama',text:'Aracınızın dış ve iç bakım ihtiyaçlarını paylaşın. Paket içeriğini ve uygun zamanı görüşerek, size uygun hizmeti seçin.',points:['İç ve dış bakım beklentiniz','Paket içeriğinin işletmeden teyidi','Fiyat ve uygun zaman bilgisi']}
};
const menu=$('#mobile-menu'),toggle=$('.menu-toggle');
function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Menüyü aç');}
toggle.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>720)closeMenu();});
let savedScroll=0,lockCount=0;
function lock(){if(lockCount++===0){savedScroll=window.scrollY;document.body.style.top=`-${savedScroll}px`;document.body.classList.add('scroll-locked');}}
function unlock(){lockCount=Math.max(0,lockCount-1);if(!lockCount){document.body.classList.remove('scroll-locked');document.body.style.top='';const prior=document.documentElement.style.scrollBehavior;document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,savedScroll);document.documentElement.style.scrollBehavior=prior;}}
const serviceDialog=$('#service-dialog');
let jumpToContact=false;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const data=services[button.dataset.service];$('#service-dialog-title').textContent=data.title;$('#service-dialog-description').textContent=data.text;$('#service-dialog-points').replaceChildren(...data.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));$('#service').value=data.title;serviceDialog.showModal();lock();}));
$('.dialog-close').addEventListener('click',()=>serviceDialog.close());
serviceDialog.addEventListener('close',()=>{unlock();if(jumpToContact){jumpToContact=false;$('#teklif').scrollIntoView({behavior:'smooth',block:'start'});}});
serviceDialog.addEventListener('click',e=>{if(e.target===serviceDialog){const r=serviceDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)serviceDialog.close();}});
$('#service-dialog-cta').addEventListener('click',e=>{e.preventDefault();jumpToContact=true;serviceDialog.close();});
$('#enquiry-form').addEventListener('submit',e=>{e.preventDefault();window.open(buildWhatsappUrl($('#vehicle').value,$('#service').value),'_blank','noopener,noreferrer');});
const photos=[{src:'/images/hero.webp',title:'Yüzey & form',alt:'Temsili koyu renk otomobil görseli'},{src:'/images/ppf.webp',title:'İşin inceliği',alt:'Temsili koruyucu film uygulaması'},{src:'/images/interior.webp',title:'İç mekân',alt:'Temsili otomobil iç mekânı'}];
const lightbox=$('#lightbox'),image=$('#lightbox-image'),stage=$('#zoom-stage'),reset=$('#zoom-reset');
let photo=0,state={scale:1,x:0,y:0},gesture=null;const pointers=new Map();
function draw(){state=constrain(state,stage.clientWidth,stage.clientHeight);image.style.transform=`translate(${state.x}px,${state.y}px) scale(${state.scale})`;reset.textContent='%'+Math.round(state.scale*100);$('#zoom-out').disabled=state.scale<=1;$('#zoom-in').disabled=state.scale>=4;}
function resetZoom(){state={scale:1,x:0,y:0};gesture=null;pointers.clear();draw();}
function setPhoto(index){photo=(index+photos.length)%photos.length;image.src=photos[photo].src;image.alt=photos[photo].alt;$('#lightbox-title').textContent=photos[photo].title;resetZoom();}
document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{lightbox.showModal();lock();setPhoto(Number(button.dataset.photo));}));
$('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('close',()=>{unlock();pointers.clear();gesture=null;});
lightbox.addEventListener('cancel',()=>{pointers.clear();gesture=null;});
$('#photo-prev').addEventListener('click',()=>setPhoto(photo-1));$('#photo-next').addEventListener('click',()=>setPhoto(photo+1));
reset.addEventListener('click',resetZoom);$('#zoom-in').addEventListener('click',()=>{state=zoomAt(state,state.scale*1.3);draw();});$('#zoom-out').addEventListener('click',()=>{state=zoomAt(state,state.scale/1.3);draw();});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();setPhoto(photo-1);}if(e.key==='ArrowRight'){e.preventDefault();setPhoto(photo+1);}if(e.key==='+'||e.key==='=')$('#zoom-in').click();if(e.key==='-')$('#zoom-out').click();});
function localPoint(e){const r=stage.getBoundingClientRect();return{x:e.clientX-r.left-r.width/2,y:e.clientY-r.top-r.height/2};}
stage.addEventListener('wheel',e=>{e.preventDefault();e.stopPropagation();state=zoomAt(state,state.scale*Math.exp(-e.deltaY*.002),localPoint(e));draw();},{passive:false});
function beginGesture(){const points=[...pointers.values()];if(points.length>=2){gesture={type:'pinch',a:distance(points[0],points[1]),mid:midpoint(points[0],points[1]),state:{...state}};}else if(points.length===1){gesture={type:'pan',point:points[0],state:{...state}};}else gesture=null;}
stage.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();stage.setPointerCapture(e.pointerId);pointers.set(e.pointerId,localPoint(e));beginGesture();});
stage.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;e.preventDefault();pointers.set(e.pointerId,localPoint(e));const p=[...pointers.values()];if(gesture?.type==='pinch'&&p.length>=2){const center=midpoint(p[0],p[1]);state=zoomAt(gesture.state,gesture.state.scale*distance(p[0],p[1])/Math.max(gesture.a,1),gesture.mid);state.x+=center.x-gesture.mid.x;state.y+=center.y-gesture.mid.y;}else if(gesture?.type==='pan'&&p.length===1&&state.scale>1){state={...state,x:gesture.state.x+p[0].x-gesture.point.x,y:gesture.state.y+p[0].y-gesture.point.y};}draw();});
function release(e){pointers.delete(e.pointerId);beginGesture();}
stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);stage.addEventListener('lostpointercapture',release);
stage.addEventListener('dblclick',e=>{state=zoomAt(state,state.scale>1?1:2,localPoint(e));draw();});
window.addEventListener('resize',()=>{if(lightbox.open)draw();});
