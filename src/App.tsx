import{useRef,useEffect,useState,useCallback}from'react'
  export default function App(){
    const canvasRef=useRef<HTMLCanvasElement>(null)
    const[type,setType]=useState<"mandelbrot"|"julia">("mandelbrot")
    const[maxIter,setMaxIter]=useState(100)
    const[juliaC,setJuliaC]=useState({r:-0.7,i:0.27})
    const[zoom,setZoom]=useState(1)
    const[center,setCenter]=useState({x:0,y:0})
    const[rendering,setRendering]=useState(false)
    const draw=useCallback(()=>{
      const canvas=canvasRef.current;if(!canvas)return
      const ctx=canvas.getContext("2d")!
      const W=canvas.width,H=canvas.height
      setRendering(true)
      const data=ctx.createImageData(W,H)
      const scale=3.5/(Math.min(W,H)*zoom)
      for(let py=0;py<H;py++){
        for(let px=0;px<W;px++){
          let zr=(px-W/2)*scale+center.x,zi=(py-H/2)*scale-center.y
          let cr=zr,ci=zi,iter=0
          if(type==="julia"){cr=juliaC.r;ci=juliaC.i}
          while(zr*zr+zi*zi<4&&iter<maxIter){const tmp=zr*zr-zi*zi+cr;zi=2*zr*zi+ci;zr=tmp;iter++}
          const pct=iter/maxIter
          const idx=(py*W+px)*4
          if(iter===maxIter){data.data[idx]=data.data[idx+1]=data.data[idx+2]=0}
          else{
            const h=(pct*360+200)%360,s=0.8,l=0.5
            const c2=(1-Math.abs(2*l-1))*s,x2=c2*(1-Math.abs((h/60)%2-1)),m=l-c2/2
            let r=0,g=0,b=0
            if(h<60){r=c2;g=x2}else if(h<120){r=x2;g=c2}else if(h<180){g=c2;b=x2}else if(h<240){g=x2;b=c2}else if(h<300){r=x2;b=c2}else{r=c2;b=x2}
            data.data[idx]=Math.round((r+m)*255);data.data[idx+1]=Math.round((g+m)*255);data.data[idx+2]=Math.round((b+m)*255)
          }
          data.data[idx+3]=255
        }
      }
      ctx.putImageData(data,0,0)
      setRendering(false)
    },[type,maxIter,juliaC,zoom,center])
    useEffect(()=>{draw()},[draw])
    const click=(e:React.MouseEvent<HTMLCanvasElement>)=>{
      const r=e.currentTarget.getBoundingClientRect()
      const W=e.currentTarget.width,H=e.currentTarget.height
      const scale=3.5/(Math.min(W,H)*zoom)
      const x=(e.clientX-r.left-W/2)*scale+center.x
      const y=-(e.clientY-r.top-H/2)*scale+center.y
      if(e.shiftKey)setZoom(z=>z/2)
      else{setCenter({x,y});setZoom(z=>z*2.5)}
    }
    return(
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",padding:"1.5rem"}}>
        <h1 style={{fontWeight:800,fontSize:"1.5rem",color:"#f8fafc"}}>🌀 Fractal Explorer</h1>
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",justifyContent:"center"}}>
          {(["mandelbrot","julia"] as const).map(t=><button key={t} onClick={()=>{setType(t);setZoom(1);setCenter({x:0,y:0})}} style={{padding:"0.3rem 1rem",background:type===t?"#6366f1":"#1e293b",color:type===t?"#fff":"#94a3b8",border:"none",borderRadius:6,cursor:"pointer",fontWeight:600,fontSize:"0.82rem",textTransform:"capitalize"}}>{t}</button>)}
          <button onClick={()=>{setZoom(1);setCenter({x:0,y:0})}} style={{padding:"0.3rem 0.8rem",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:6,cursor:"pointer",fontSize:"0.82rem"}}>Reset</button>
        </div>
        {type==="julia"&&(
          <div style={{display:"flex",gap:"1rem",alignItems:"center",fontSize:"0.82rem",color:"#94a3b8",flexWrap:"wrap",justifyContent:"center"}}>
            <label>C.real: <input type="number" step="0.01" value={juliaC.r} onChange={e=>setJuliaC(j=>({...j,r:+e.target.value}))} style={{width:70,background:"#111827",border:"1px solid #334155",borderRadius:4,padding:"0.2rem 0.4rem",color:"#e2e8f0",outline:"none"}}/></label>
            <label>C.imag: <input type="number" step="0.01" value={juliaC.i} onChange={e=>setJuliaC(j=>({...j,i:+e.target.value}))} style={{width:70,background:"#111827",border:"1px solid #334155",borderRadius:4,padding:"0.2rem 0.4rem",color:"#e2e8f0",outline:"none"}}/></label>
          </div>
        )}
        <div style={{display:"flex",gap:"1rem",alignItems:"center",fontSize:"0.82rem",color:"#94a3b8"}}>
          <label>Iterations: <input type="range" min="20" max="300" value={maxIter} onChange={e=>setMaxIter(+e.target.value)} style={{accentColor:"#6366f1"}}/> {maxIter}</label>
        </div>
        <canvas ref={canvasRef} width={600} height={480} onClick={click} style={{borderRadius:10,border:"1px solid #1e293b",cursor:"crosshair",maxWidth:"100%",opacity:rendering?0.7:1,transition:"opacity 0.2s"}}/>
        <p style={{color:"#334155",fontSize:"0.73rem"}}>Click to zoom in · Shift+click to zoom out</p>
      </div>
    )
  }