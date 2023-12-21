import{a as L,b as i}from"/build/_shared/chunk-3Z32TANI.js";import{d as r}from"/build/_shared/chunk-T36URGAI.js";var x=r(i(),1),de=({content:t})=>(0,x.jsx)(x.Fragment,{children:t.map((e,o)=>{if(e.type=="plain_text")return(0,x.jsxs)("span",{children:[e.content," "]},o);if(e.type=="link_text")return e.icon?(0,x.jsxs)("button",{className:"flex flex-row items-center space-x-1.5 rounded-full pl-1.5 pr-3 py-1 bg-black bg-opacity-90 hover:bg-opacity-80 dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-80 dark:text-black transition duration-200 ease-in-out cursor-pointer",onClick:()=>{window.open(e.link,"_blank")},children:[(0,x.jsx)("img",{src:"/icons/"+e.icon+".svg"}),(0,x.jsx)("span",{className:" text-white dark:text-black",children:e.content})]}):(0,x.jsx)("a",{href:e.link,className:"text-primary underline cursor-pointer hover:text-secondary dark:text-white dark:hover:text-white dark:hover:text-opacity-80",children:e.content},o)})}),I=de;var O=r(i(),1),pe=({name:t,contents:e,children:o,figures:n})=>(0,O.jsx)("div",{className:"prose mt-3",children:(0,O.jsx)(V,{name:t,contents:e,figures:n,isInParagraph:!0})}),S=pe;var re=r(L(),1);var j=r(i(),1),ue=({url:t,styling:e,children:o})=>{let n=e==null?!0:e.roundedCorners,m=e==null?1:e.scaleContent,l=e==null?!1:e.showControls,c=e==null?"cover":e.objectFit;return(0,j.jsx)("div",{className:"relative w-full",style:{paddingTop:c=="cover"?"56.25%":0},children:(0,j.jsx)("video",{autoPlay:!0,loop:!0,controls:l,playsInline:!0,muted:!0,className:c=="cover"?"absolute top-0 left-0 w-full h-full":"",style:{objectFit:c,borderRadius:n?"0.5rem":"0",transform:`scale(${m})`},children:(0,j.jsx)("source",{src:t,type:"video/mp4","data-src":t})})})},X=ue;var v=r(L(),1),C=r(i(),1),me=({urls:t,onSelectedVideoChange:e,autoSwap:o=!0,autoSwapInterval:n=3e3,autoSwapSelectedCooldown:m=1e4,styling:l,children:c})=>{let y=l==null?!0:l.roundedCorners,f=l==null?"cover":l.objectFit,[d,a]=(0,v.useState)(0),[b,K]=(0,v.useState)(o),R=(0,v.useRef)([]),B=(0,v.useRef)([]),Q=(0,v.useRef)(0),D=(0,v.useRef)(null);(0,v.useEffect)(()=>{if(b&&t.length>1)return D.current=setInterval(()=>{a(s=>{let p=(s+1)%t.length;return e&&e(p),p})},n),()=>{D.current&&clearInterval(D.current)}},[b,n,t.length,e]);let ce=()=>{R.current.forEach((s,p)=>{s&&(s.currentTime=0)}),B.current.forEach(s=>{s&&(s.currentTime=0)})},W=()=>{R.current.forEach(s=>{s&&s.pause()}),B.current.forEach(s=>{s&&s.pause()})},U=()=>{R.current.forEach(s=>{s&&s.play()}),B.current.forEach(s=>{s&&s.play()})},le=s=>{if(b&&(K(!1),setTimeout(()=>{K(!0)},m)),s===d)return;let p=R.current[d],P=R.current[s];p&&(p.currentTime=P.currentTime),a(s),e&&e(s)};return(0,v.useEffect)(()=>{let s=R.current[d];if(s){let p=()=>{Q.current>s.currentTime&&ce(),Q.current=s.currentTime};return s.addEventListener("timeupdate",p),()=>{s.removeEventListener("timeupdate",p)}}},[d]),(0,C.jsxs)("div",{className:"relative w-full",style:{paddingTop:f=="cover"?"56.25%":0},children:[t.map((s,p)=>(0,C.jsx)("video",{ref:P=>P?R.current[p]=P:null,onMouseDown:W,onMouseUp:U,onTouchStart:W,onTouchEnd:U,onMouseLeave:U,autoPlay:!0,loop:!0,playsInline:!0,muted:!0,className:f=="cover"?"absolute top-0 left-0 w-full h-full":"",style:{objectFit:f,transition:p===d?"none":"opacity 500ms ease-in-out",opacity:p===d?1:0,zIndex:p===d?0:1,borderRadius:y?"0.5rem":"0"},children:(0,C.jsx)("source",{src:s,type:"video/mp4"})},p)),(0,C.jsx)("div",{className:"absolute bottom-2 right-2 flex flex-row space-x-1.5",children:t.map((s,p)=>(0,C.jsx)("video",{onClick:()=>le(p),ref:P=>P?B.current[p]=P:null,autoPlay:!0,loop:!0,playsInline:!0,muted:!0,className:"w-16 h-16 cursor-pointer shadow-lg border-2",style:{objectFit:f,filter:p===d?"grayscale(100%)":"none",borderColor:p===d?"#fff":"rgba(255, 255, 255, 0.5)",zIndex:2,borderRadius:y?"0.5rem":"0"},children:(0,C.jsx)("source",{src:s,type:"video/mp4"})},p))})]})},Z=me;var A=r(L(),1),E=r(i(),1),fe=({urls:t,styling:e,children:o})=>{let n=e==null?!0:e.roundedCorners,m=e==null?1:e.scaleContent,l=e==null?"cover":e.objectFit,c=(0,A.useRef)([]),y=(0,A.useRef)(0),f=()=>{c.current.forEach((d,a)=>{d&&(d.currentTime=0)})};return(0,A.useEffect)(()=>{let d=c.current[0];if(d){let a=()=>{y.current>d.currentTime&&f(),y.current=d.currentTime};return d.addEventListener("timeupdate",a),()=>{d.removeEventListener("timeupdate",a)}}}),(0,E.jsxs)("div",{className:"relative w-full h-full grid",style:{gridTemplateColumns:`repeat(${t.length}, minmax(0, 1fr))`,gap:"10px"},children:[t.map((d,a)=>(0,E.jsx)("div",{className:"w-full h-full",children:(0,E.jsx)("video",{ref:b=>b?c.current[a]=b:null,autoPlay:!0,loop:!0,playsInline:!0,muted:!0,className:"w-full h-full",style:{objectFit:l,borderRadius:n?"0.5rem":"0"},children:(0,E.jsx)("source",{src:d,type:"video/mp4"})})},a)),o]})},ee=fe;var _=r(L(),1),T=r(i(),1),ye=({url:t,styling:e,children:o})=>{let n=e==null?!0:e.roundedCorners,m=e==null?1:e.scaleContent,l=e==null?!1:e.showControls,c=e==null?"cover":e.objectFit,y=(0,_.useRef)([]),f=(0,_.useRef)(0),d=()=>{y.current.forEach((a,b)=>{a&&(a.currentTime=0)})};return(0,_.useEffect)(()=>{let a=y.current[0];if(a){let b=()=>{f.current>a.currentTime&&d(),f.current=a.currentTime};return a.addEventListener("timeupdate",b),()=>{a.removeEventListener("timeupdate",b)}}}),(0,T.jsxs)("div",{className:"relative w-full",style:{paddingTop:c=="cover"?"56.25%":0},children:[(0,T.jsx)("video",{autoPlay:!0,loop:!0,controls:l,playsInline:!0,muted:!0,ref:a=>a?y.current[0]=a:null,className:c=="cover"?"absolute top-0 left-0 w-full h-full":"",style:{zIndex:1,objectFit:c,borderRadius:n?"0.5rem":"0",transform:`scale(${m})`},children:(0,T.jsx)("source",{src:t,type:"video/mp4","data-src":t})}),(0,T.jsx)("video",{autoPlay:!0,loop:!0,playsInline:!0,muted:!0,ref:a=>a?y.current[1]=a:null,className:c=="cover"?"absolute top-0 left-0 w-full h-full":"",style:{zIndex:0,objectFit:"cover",borderRadius:n?"0.5rem":"0",transform:"scale(1.03)",filter:"blur(25px)"},children:(0,T.jsx)("source",{src:t,type:"video/mp4","data-src":t})}),o]})},te=ye;var J=r(i(),1),he=({url:t,styling:e,children:o})=>(0,J.jsx)("div",{className:"relative w-full",style:{paddingBottom:"56.25%",overflow:"hidden",height:0},children:(0,J.jsx)("iframe",{width:"853",height:"480",className:"absolute top-0 left-0 w-full h-full",src:t,title:"YouTube video player",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0,frameBorder:"0"})}),oe=he;var w=r(i(),1),be=({urls:t,type:e,captions:o,styling:n,children:m,isTODO:l=!1,isInsideTextBlock:c=!1})=>{let[y,f]=(0,re.useState)(0);return(0,w.jsxs)("div",{className:"space-y-3 pb-10",style:{paddingTop:c?"1rem":"0px",filter:l?"blur(30px)":"none"},children:[e==="video"&&(0,w.jsx)(X,{url:t[0],styling:n}),e==="youtube"&&(0,w.jsx)(oe,{url:t[0],styling:n}),e==="multi_video"&&(0,w.jsx)(ee,{urls:t,styling:n}),e==="blur_video"&&(0,w.jsx)(te,{url:t[0],styling:n}),e==="swappable_video"&&(0,w.jsx)(Z,{urls:t,onSelectedVideoChange:d=>f(d),styling:n}),o&&(0,w.jsx)(S,{...o[y]},o[y].name),m]})},ne=be;var N=r(i(),1),ge=({content:t,isOrdered:e=!1})=>(0,N.jsx)(N.Fragment,{children:e?(0,N.jsx)("ol",{className:"list-outside ml-5  text-justify block font-normal text-primary dark:text-white",children:t.map((o,n)=>(0,N.jsx)("li",{children:(0,N.jsx)(I,{...o})},n))}):(0,N.jsx)("ul",{className:"list-disc list-outside ml-5 text-justify block font-normal text-primary dark:text-white",children:t.map((o,n)=>(0,N.jsx)("li",{children:(0,N.jsx)(I,{...o})},n))})}),ie=ge;var h=r(i(),1),ve=({name:t,contents:e,children:o,figures:n,isInParagraph:m=!1})=>(0,h.jsx)(h.Fragment,{children:e.map((l,c)=>{if(l.type==="text")return(0,h.jsxs)("p",{className:"text-justify block font-normal text-primary dark:text-white",children:[m&&c===0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("strong",{children:t})," \u2014 "]}),(0,h.jsx)(I,{...l})]},t+"_text_"+c);if(l.type==="paragraph")return(0,h.jsx)(S,{...l},t+"paragraph"+c);if(l.type==="list")return(0,h.jsx)(ie,{...l},t+"list"+c);if(l.type==="figure"){if(n&&n[l.id])return(0,h.jsxs)("div",{className:"text-primary dark:text-white",children:[m&&c===0&&(0,h.jsx)("strong",{children:t},"hedaing_figure_"+c),(0,h.jsx)(ne,{...n[l.id],isInsideTextBlock:!0},t+"_figure_"+c)]},t+"_figure_"+c)}else return(0,h.jsx)("p",{children:" Error "},t+"_"+c)})}),V=ve;var k=r(i(),1),xe=({name:t,content:e,children:o})=>(0,k.jsx)(k.Fragment,{children:(0,k.jsxs)("div",{className:"space-y-3 pt-16",id:t,children:[(0,k.jsx)("h1",{className:"text-primary font-sans text-xl font-bold dark:text-white",children:"Acknowledgements"}),(0,k.jsx)("p",{className:"text-primary text-justify block font-normal dark:text-white"})," ",(0,k.jsx)(V,{name:t,contents:e}),o]})}),Ze=xe;var q=r(i(),1),Ne=({authors:t,children:e})=>(0,q.jsx)("div",{className:"w-full flex flex-wrap justify-center items-center gap-5",children:t.map((o,n)=>(0,q.jsx)("a",{href:o.link,className:"text-secondary font-sans underline cursor-pointer text-inherit text-center hover:text-primary ",children:o.name},n))}),tt=Ne;var z=r(L(),1),u=r(i(),1),we=({type:t,name:e,authors:o,title:n,booktitle:m,year:l})=>{let c=(0,z.useRef)(null),[y,f]=(0,z.useState)(!1),d=async()=>{if(c&&c.current)try{let a=c.current.textContent;if(!a)throw new Error("No text to copy");await navigator.clipboard.writeText(a),f(!0)}catch(a){console.error("Failed to copy text to clipboard",a)}};return(0,u.jsxs)("div",{className:"space-y-3 pt-16",id:"Citation",children:[(0,u.jsx)("h1",{className:"text-primary font-sans text-xl font-bold dark:text-white",children:"Citation"}),(0,u.jsxs)("div",{className:"group relative rounded-lg bg-black bg-opacity-5 hover:bg-opacity-10 transition duration-200 ease-in-out p-2 dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-10",children:[(0,u.jsx)("button",{onClick:()=>{d(),setTimeout(()=>f(!1),2e3)},onMouseLeave:()=>f(!1),className:"opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-2 rounded-lg bg-black text-white transition duration-200 ease-in-out cursor-pointer z-10 hover:bg-opacity-80 dark:bg-white dark:bg-opacity-5 dark:hover:bg-opacity-80 dark:text-black",children:y?(0,u.jsx)("img",{src:"/icons/success.svg",className:"w-4 h-4",alt:"Copy to Clipboard"}):(0,u.jsx)("img",{src:"/icons/copy.svg",className:"w-4 h-4",alt:"Copy to Clipboard"})}),(0,u.jsxs)("div",{ref:c,className:"text-justify grid grid-cols-[auto_1fr] text-primary dark:text-white",children:[(0,u.jsxs)("span",{children:["@",t,"{"]}),(0,u.jsxs)("span",{children:[e,","]})," ",(0,u.jsx)("span",{className:"pl-12",children:"author ="}),(0,u.jsxs)("span",{children:["{",o.map((a,b)=>b===o.length-1?`${a[1]}, ${a[0]}`:`${a[1]}, ${a[0]} and `),"},"]}),(0,u.jsx)("span",{className:"pl-12",children:"title ="}),(0,u.jsxs)("span",{children:["{",n,"},"]}),(0,u.jsx)("span",{className:"pl-12",children:"booktitle ="}),(0,u.jsxs)("span",{children:["{",m,"},"]}),(0,u.jsx)("span",{className:"pl-12",children:"year ="}),(0,u.jsxs)("span",{children:["{",l,"}"]}),(0,u.jsx)("span",{children:"}"})]})]})]})},rt=we;var Y=r(L(),1),ae=r(i(),1),ke=({children:t,onScrolledPassed:e})=>{let o=(0,Y.useRef)(null);return(0,Y.useEffect)(()=>{let n=()=>{if(o.current){let m=o.current.getBoundingClientRect().bottom+window.scrollY,l=window.scrollY>m;e&&e(l)}};return window.addEventListener("scroll",n),()=>window.removeEventListener("scroll",n)},[e,o]),(0,ae.jsx)("div",{className:"w-full flex flex-col justify-center items-center space-y-5 pb-10 bg-white rounded-lg",ref:o,children:t})},it=ke;var $=r(i(),1),Ce=({institutions:t,children:e})=>(0,$.jsx)("div",{className:"w-full flex flex-row justify-center items-center space-x-10",children:t.map((o,n)=>(0,$.jsx)("a",{href:o.link,className:"text-secondary font-sans cursor-pointer hover:text-primary",children:o.image?(0,$.jsx)("img",{src:o.image,alt:o.name,className:"w-auto h-20"}):o.name},o.name))}),st=Ce;var H=r(i(),1),Fe=({link:t,name:e,icon:o,children:n})=>(0,H.jsxs)("button",{className:"flex flex-row items-center space-x-1.5 rounded-full pl-1.5 pr-3 py-1 bg-black bg-opacity-90 hover:bg-opacity-80 transition duration-200 ease-in-out cursor-pointer",onClick:()=>{window.open(t,"_blank")},children:[(0,H.jsx)("img",{src:"icons/"+o+".svg"}),(0,H.jsx)("span",{className:"text-m  text-white ",children:e})]}),se=Fe;var G=r(i(),1),Re=({links:t,children:e})=>(0,G.jsx)("div",{className:"w-full flex flex-wrap justify-center items-center gap-5",children:t.map((o,n)=>(0,G.jsx)(se,{...o},o.name))}),pt=Re;var F=r(i(),1),Pe=({title:t,links:e})=>(0,F.jsx)("div",{className:"sticky top-0 ",style:{zIndex:100},children:(0,F.jsx)("div",{className:"absolute w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-black dark:bg-opacity-80 dark:border-gray-800",style:{zIndex:100},children:(0,F.jsxs)("div",{className:" mx-auto w-full max-w-4xl px-4 py-2 md:px-8 flex flex-row justify-between",children:[(0,F.jsx)("p",{className:"text-secondary text-justify block  font-bold  text-lg dark:text-white",children:t}),(0,F.jsx)("div",{className:"flex flex-row space-x-4 justify-center items-center",children:e&&e.map((o,n)=>(o.icon=="arxiv"||o.icon=="bibtex"||o.icon=="youtube")&&(0,F.jsx)("a",{href:o.link,className:"text-secondary font-normal  cursor-pointer text-inherit  text-center hover:underline dark:text-white",children:o.name},o.name))})]})})}),mt=Pe;var M=r(i(),1),Te=({title:t,subtitle:e,children:o})=>(0,M.jsxs)("div",{className:"w-full flex flex-col justify-center items-center space-y-5",children:[(0,M.jsx)("h1",{className:"text-primary font-sans text-3xl font-bold xl:text-5xl text-center",children:t}),(0,M.jsx)("h2",{className:"text-primary font-sans text-xl font-medium xl:text-2xl text-center break-words px-2 max-w-[90%] ",children:e})]}),yt=Te;var g=r(i(),1),Le=({name:t,introduction:e,sections:o,paragraphs:n,figures:m,styling:l,children:c})=>{let y=l==null?!1:l.hideHeading;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{className:"space-y-3 pt-16",id:t,children:[!y&&(0,g.jsx)("h1",{className:"text-primary font-sans text-xl font-bold dark:text-white",children:t}),(0,g.jsx)("p",{className:"text-justify block  font-normal "})," ",(0,g.jsx)(V,{name:t,contents:e,figures:m}),c]}),(0,g.jsx)("div",{className:"space-y-10 pt-10 text-secondary dark:text-white",children:(0,g.jsx)("div",{className:"space-y-8",children:n&&n.length>0&&n.map((f,d)=>(0,g.jsx)(S,{...f,figures:m},f.name))})})]})},vt=Le;export{Ze as a,tt as b,rt as c,it as d,st as e,pt as f,mt as g,yt as h,vt as i};
