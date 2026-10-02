import {cp,mkdir,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
await mkdir(resolve(root,'dist'),{recursive:true});
await cp(resolve(root,'public'),resolve(root,'dist'),{recursive:true});
for(const name of ['hero.webp','ppf.webp','interior.webp']){const file=await stat(resolve(root,'dist/images',name));if(file.size<5000)throw Error('Missing/invalid image '+name);}
console.log('Static build ready. '+(await readdir(resolve(root,'dist'))).length+' top-level assets.');
