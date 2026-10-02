export function buildWhatsappUrl(vehicle='',service='Birlikte seçelim') {
 const car=vehicle.trim().slice(0,100);
 const text=`Merhaba, ${service==='Birlikte seçelim'?'aracım için uygun bakım hakkında':service+' hizmeti hakkında'} bilgi almak istiyorum.${car?' Aracım: '+car+'.':''} Kapsam ve uygun zaman hakkında konuşabilir miyiz?`;
 return 'https://wa.me/905545900829?text='+encodeURIComponent(text);
}
