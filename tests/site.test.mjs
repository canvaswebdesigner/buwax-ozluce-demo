import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {zoomAt,constrain} from '../public/zoom.js';
const html=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
import {buildWhatsappUrl} from '../public/contact.js';

test('WhatsApp enquiry uses the right recipient and safely encoded Turkish text',()=>{const url=new URL(buildWhatsappUrl('  Golf, 2021 & özel  ','PPF kaplama'));assert.equal(url.host,'wa.me');assert.equal(url.pathname,'/905545900829');assert.equal(url.searchParams.get('text'),'Merhaba, PPF kaplama hizmeti hakkında bilgi almak istiyorum. Aracım: Golf, 2021 & özel. Kapsam ve uygun zaman hakkında konuşabilir miyiz?');});
test('optional car defaults to a general enquiry',()=>{assert.match(new URL(buildWhatsappUrl()).searchParams.get('text'),/aracım için uygun bakım hakkında/);assert.ok(!new URL(buildWhatsappUrl()).searchParams.get('text').includes('Aracım:'));});
test('zoom is clamped and reset restores origin',()=>{assert.equal(zoomAt({scale:1,x:0,y:0},9).scale,4);assert.deepEqual(zoomAt({scale:3,x:70,y:-80},.5),{scale:1,x:0,y:0});});
test('zoom keeps pointer anchor stable',()=>{assert.deepEqual(zoomAt({scale:1,x:0,y:0},2,{x:50,y:30}),{scale:2,x:-50,y:-30});});
test('panning constrained to viewport',()=>{assert.deepEqual(constrain({scale:2,x:900,y:-800},300,200),{scale:2,x:150,y:-100});});
test('browser page zoom is allowed',()=>{assert.match(html,/width=device-width, initial-scale=1/);assert.doesNotMatch(html,/user-scalable=no|maximum-scale/);});
test('honest preview and correct real contacts',()=>{assert.match(html,/Resmî işletme sitesi değildir/);assert.match(html,/yapay üretilmiş, temsili/);assert.match(html,/wa\.me\/905545900829/);assert.match(html,/instagram\.com\/buwaxozluce/);assert.match(html,/Kesin işletme noktası teyit edilecek/);});
test('all five services and local anchor targets exist',()=>{for(const name of ['PPF kaplama','Seramik kaplama','Pasta polisaj','Detaylı iç temizlik','VIP yıkama'])assert.ok(html.includes(name));for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes(`id="${id}"`),'Anchor '+id);});
