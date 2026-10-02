export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function zoomAt(state,nextScale,point={x:0,y:0}){
 const scale=clamp(nextScale,1,4),ratio=scale/state.scale;
 return {scale,x:scale===1?0:point.x-(point.x-state.x)*ratio,y:scale===1?0:point.y-(point.y-state.y)*ratio};
}
export function constrain(state,width,height){
 return {...state,x:clamp(state.x,-width*(state.scale-1)/2,width*(state.scale-1)/2),y:clamp(state.y,-height*(state.scale-1)/2,height*(state.scale-1)/2)};
}
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const midpoint=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
