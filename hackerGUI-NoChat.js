(function(){
  if(window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  let overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:1000000;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#00ff00;font-family:Consolas,monospace;pointer-events:none;';
  let canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  overlay.appendChild(canvas);
  let msg = document.createElement('div');
  msg.innerText = '[ BOOTING SYSTEM... ]';
  msg.style.cssText = 'font-size:20px;margin-bottom:10px;z-index:1000001;text-shadow:0 0 5px #00ff00;';
  overlay.appendChild(msg);
  let loading = document.createElement('div');
  loading.style.cssText = 'font-size:24px;font-weight:bold;z-index:1000001;text-shadow:0 0 10px #00ff00;';
  loading.innerText = 'Loading 0%';
  overlay.appendChild(loading);
  document.body.appendChild(overlay);

  // Matrix rain for bootup
  let ctx = canvas.getContext('2d');
  let chars = '1010';
  let cols = Math.floor(canvas.width/10);
  let drops = [];
  for(let i=0;i<cols;i++) drops[i] = Math.floor(Math.random()*canvas.height);
  let rain = setInterval(()=>{
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0F0';
    ctx.font='10px monospace';
    for(let i=0;i<cols;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
      if(drops[i]*10>canvas.height && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  },33);

  // Loading counter
  let progress = 0;
  let int = setInterval(()=>{
    progress++;
    loading.innerText = 'Loading '+progress+'%';
    if(progress>=100){
      clearInterval(int);
      setTimeout(()=>{
        loading.innerText='Welcome Hacker';
        setTimeout(()=>{
          clearInterval(rain);
          overlay.remove();
          spawnGUIs();
        },2000);
      },500);
    }
  },40);

  // ---------- MAIN FUNCTION TO SPAWN GUIs ----------
  function spawnGUIs() {
    // -------------------- UTILITIES GUI --------------------
    const util = document.createElement('div');
  util.id = 'utilitiesGUI';
  util.style.cssText = `
    position:fixed;top:50px;left:50px;width:280px;
    background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;
    padding:10px;border:2px solid #00ff00;border-radius:8px;
    box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;
    user-select:none;cursor:move;
  `;
  util.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
  document.body.appendChild(util);
    // -------------------- VFX GUI --------------------
    const vfx = document.createElement('div');
  vfx.id = 'vfxGUI';
  vfx.style.cssText = `
    position:fixed;top:50px;right:50px;width:320px;
    background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;
    padding:10px;border:2px solid #00ff00;border-radius:8px;
    box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;
    user-select:none;cursor:move;
  `;
  vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
  document.body.appendChild(vfx);

    // -------------------- BUTTON HELPER --------------------
     function addBtn(container,name,on,off){
  const b=document.createElement('button');
  b.innerText=name;
  b.style.cssText='width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
  b.onclick=on;
  container.appendChild(b);
  }

    // -------------------- ADD LOCK ICON --------------------
     function addLockIcon(gui){
    const lock = document.createElement('div');
    lock.innerText = '🔓';
    lock.style.cssText = 'position:absolute;top:5px;right:5px;font-size:16px;cursor:pointer;user-select:none;';
    lock.locked = false;
    lock.onclick = () => {
      lock.locked = !lock.locked;
      lock.innerText = lock.locked ? '🔒' : '🔓';
    };
    gui.appendChild(lock);
    return lock;
  }
  let utilLock = addLockIcon(util);
  let vfxLock = addLockIcon(vfx);

     // -------------------- DRAGGING --------------------
function makeDraggable(g, lock){
  g.style.position = 'fixed'; 
  g.onmousedown = function(e){
    if(lock.locked) return; 
    let ox = e.clientX - g.getBoundingClientRect().left,
        oy = e.clientY - g.getBoundingClientRect().top;
    function move(e){
      let x = e.clientX - ox;
      let y = e.clientY - oy;
      x = Math.max(0, Math.min(window.innerWidth - g.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - g.offsetHeight, y));
      g.style.left = x + 'px';
      g.style.top = y + 'px';
      g.style.right = 'auto';
      g.style.bottom = 'auto';
    }
    function up(){
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
}


makeDraggable(util, utilLock);
makeDraggable(vfx, vfxLock);

    // ---------- UTILITIES BUTTONS ----------
(function(){
    const activeUtilities = {};

    // Helper to add a button
    function addBtn(container, name, on, off) {
        const b = document.createElement('button');
        b.innerText = name;
        b.style.cssText = 'width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
        b.onclick = on;
        container.appendChild(b);
        if(off) activeUtilities[name] = { on, off };
    }

    

    // Developer Console (Eruda)
    addBtn(util, 'Developer Console', () => {
    if (!window.erudaLoaded) {
        let s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
        document.body.appendChild(s);
        s.onload = () => {
            eruda.init();
            eruda.theme = 'Dark';
            window.erudaInstance = eruda; 
            window.erudaLoaded = true;
        };
        window.erudaScript = s; 
    } else {
        window.erudaInstance.show();
    }
}, () => {
    // off function for Stop All
    if (window.erudaInstance) {
        window.erudaInstance.destroy();
        window.erudaInstance = null;
        window.erudaLoaded = false;
    }
    if (window.erudaScript) {
        window.erudaScript.remove();
        window.erudaScript = null;
    }
});


    // Page Dark Theme
    addBtn(util,'Page Dark Theme',()=>{
        document.body.style.filter = 'invert(1)';
    },()=>{
        document.body.style.filter = '';
    });

    // Calculator
    addBtn(util,'Calculator',()=>{
        let _o;
        while((_o = prompt("Expression:",""))){
            try{ alert(eval(_o)); } catch(e){ alert(e); }
        }
    });

    // DNS Lookup
    addBtn(util,'DNS Lookup',()=>{ 
        window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank'); 
    });

    // FPS Counter
    addBtn(util,'FPS Counter',()=>{
        if(!window.stats){
            let s=document.createElement('script');
            s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
            s.onload=()=>{
                window.stats=new Stats();
                document.body.appendChild(window.stats.dom);
                requestAnimationFrame(function loop(){ window.stats.update(); requestAnimationFrame(loop); });
            };
            document.head.appendChild(s);
        }
    },()=>{
        if(window.stats){ window.stats.dom.remove(); window.stats=null; }
    });

    // History Flooder
    addBtn(util,'History Flooder',()=>{
        let n = parseInt(prompt("Flood amount:"));
        for(let i=0;i<n;i++){
            history.pushState(0,0,i==n-1?window.location.href:i.toString());
        }
    });

    // IP Finder
    addBtn(util,'IP Finder',()=>{
        let ip = prompt("Enter IP:");
        if(ip){
            ['https://talosintelligence.com/reputation_center/lookup?search=',
             'https://www.virustotal.com/gui/ip-address/',
             'https://otx.alienvault.com/browse/global?section=All&q=',
             'https://censys.io/ipv4/',
             'https://www.shodan.io/search?query=',
             'https://www.abuseipdb.com/check/'].forEach(u=>window.open(u+ip,'_blank'));
        }
    });

    // Password Looker
    addBtn(util,'Password Looker',()=>{
        document.querySelectorAll('input[type=password]').forEach(i=>{
            if(!i.dataset.originalType) i.dataset.originalType = i.type;
            i.type = 'text';
        });
    },()=>{
        document.querySelectorAll('input[type=text]').forEach(i=>{
            if(i.dataset.originalType) i.type = i.dataset.originalType;
        });
    });

    // Porta Proxy
    addBtn(util,'Porta Proxy',()=>{
        let f = document.createElement('iframe');
        f.src = prompt("Enter URL:");
        Object.assign(f.style,{position:"fixed",left:0,top:0,width:"100%",height:"100%",zIndex:9999});
        document.body.appendChild(f);
        window.portaFrame = f;
    },()=>{
        if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }
    });

    // Kill Script
    addBtn(util,'Kill Script',()=>{
        fetch("https://raw.githubusercontent.com/zek-c/Securly-Kill-V111/main/kill.js")
            .then(r=>r.text())
            .then(eval);
    });

    // Page Info Viewer
    addBtn(util,'Page Info Viewer',()=>{
        alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`);
    });

    // Stop All Utilities
    addBtn(util,'Stop All Utilities',()=>{
        for(let key in activeUtilities){
            if(activeUtilities[key].off) activeUtilities[key].off();
        }
    });

})();

    // -------------------- FONT SIZE SLIDER --------------------
    (function(){
        const section = document.createElement('div');
        section.style.marginTop = '10px';
        section.style.padding = '8px';
        section.style.background = '#252525';
        section.style.borderRadius = '10px';
        section.style.color = '#00ff00';
        section.innerHTML = `<b>Font Size</b><br>`;
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '10';
        slider.max = '50';
        slider.value = '16';
        slider.style.width = '100%';
        slider.oninput = () => {
            document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el => el.style.fontSize = slider.value + 'px');
        };
        section.appendChild(slider);
        util.appendChild(section);
    })();

        // -------------------- VFX BUTTONS --------------------
  // 3D Page
  addBtn(vfx,'3D Page',()=>{
  if(!window.triScript){
    let s=document.createElement('script');
    s.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js';
    document.body.appendChild(s);
    window.triScript=s;
  }
},()=>{
  if(window.triScript){window.triScript.remove();window.triScript=null;}
});
// Explode Page
addBtn(vfx,'Explode Page',()=>{
  if(window.explodeActive) return;
  window.explodeActive=true;
  let o=document.createElement('div');
  o.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;';
  document.body.appendChild(o);
  let c=3;
  o.innerText=c;
  window.explodeInt=setInterval(()=>{
    c--;
    if(c>0){ o.innerText=c; } 
    else{
      clearInterval(window.explodeInt);
      o.remove();
      document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
        e.style.transition='transform 1s ease-out';
        let x=(Math.random()-0.5)*1000,
            y=(Math.random()-0.5)*1000,
            z=(Math.random()-0.5)*200;
        e.style.transform=`translate3d(${x}px,${y}px,${z}px) rotate(${Math.random()*720-360}deg)`;
      });
      setTimeout(()=>{
        document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
          e.style.transform='';
          e.style.transition='';
        });
        window.explodeActive=false;
      },1500);
    }
  },1000);
},()=>{
  clearInterval(window.explodeInt);
  window.explodeInt=null;
  window.explodeActive=false;
  document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
    e.style.transform='';
    e.style.transition='';
  });
});
// Image Glitch
addBtn(vfx,'Image Glitch',()=>{
  if(window.imgGlitchInt) return;
  window.imgGlitchInt=setInterval(()=>{
    document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
      e.style.position='absolute';
      e.style.left=Math.random()*window.innerWidth+'px';
      e.style.top=Math.random()*window.innerHeight+'px';
    });
  },50);
},()=>{
  if(window.imgGlitchInt){
    clearInterval(window.imgGlitchInt);
    window.imgGlitchInt=null;
    document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
      e.style.position='';
      e.style.left='';
      e.style.top='';
    });
  }
});
// Random Link Redirects
addBtn(vfx,'Random Link Redirects',()=>{
  window.linkRedirectsInt=setInterval(()=>{
    document.querySelectorAll('a:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(a=>{
      a.href=['https://longdogechallenge.com/','https://puginarug.com/','https://onesquareminesweeper.com/'][Math.floor(Math.random()*3)];
    });
  },500);
},()=>{
  clearInterval(window.linkRedirectsInt);
});
// Matrix Rain
addBtn(vfx,'Matrix Rain',()=>{
  if(window.matrixActive) return;
  window.matrixActive=true;
  if(!window.matrixCanvas){
    let c=document.createElement('canvas');
    c.width=window.innerWidth;
    c.height=window.innerHeight;
    c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none';
    document.body.appendChild(c);
    window.matrixCanvas=c;
    let ctx=c.getContext('2d');
    let chars='1010';
    let cols=Math.floor(window.innerWidth/10);
    let drops=[];
    for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*c.height);
    window.matrixInt=setInterval(()=>{
      ctx.fillStyle='rgba(0,0,0,0.05)';
      ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle='#0F0';
      ctx.font='10px monospace';
      for(let i=0;i<cols;i++){
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
        if(drops[i]*10>c.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
    },33);
  }
},()=>{
  clearInterval(window.matrixInt);
  window.matrixInt=null;
  if(window.matrixCanvas){window.matrixCanvas.remove();window.matrixCanvas=null;}
  window.matrixActive=false;
});

// Glitch
addBtn(vfx,'Glitch',()=>{
    if(window.glitchActive) return;
    window.glitchActive=true;
    window.glitchInt=setInterval(()=>{
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
        });
    },25);
},()=>{
    if(window.glitchInt){
        clearInterval(window.glitchInt);
        window.glitchInt=null;
    }
    window.glitchActive=false; // reset the flag
    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
});


// Smooth Disco
addBtn(vfx,'Smooth Disco',()=>{
    if(window.discoSmoothActive) return;
    window.discoSmoothActive=true;
    let colors="red orange yellow green blue purple pink".split(" "),i=0;
    window.discoSmoothInt=setInterval(()=>{
        i>=colors.length?i=0:i++;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.transition="background-color 1s";
            e.style.backgroundColor=colors[i];
        });
    },1000);
},()=>{
    if(window.discoSmoothInt){
        clearInterval(window.discoSmoothInt);
        window.discoSmoothInt=null;
    }
    window.discoSmoothActive=false; // reset the flag
    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
});

// Text Corruption
addBtn(vfx,'Text Corruption',()=>{
  if(window.textCorruptStyle) return;
  let s = document.createElement('style'); 
  s.id = 'textCorruptStyle'; 
  s.innerHTML = `
    body { background:black !important; }
    body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *) {
      color: green !important;
      font-family: Courier New, monospace !important;
    }
    p, span, li, h1, h2, h3, h4, h5, h6 {
      font-size: 16px !important;
      text-shadow: 1px 1px #FF0000 !important;
    }
    #vfxGUI,#utilitiesGUI{animation:none !important;}
  `; 
  document.head.appendChild(s); 
  window.textCorruptStyle = s;
},()=>{
  if(window.textCorruptStyle){window.textCorruptStyle.remove(); window.textCorruptStyle=null;}
});

    // Bubble Text
addBtn(vfx,'Bubble Text',()=>{
    if(window.bubbleActive) return;
    window.bubbleActive = true;
    window.originalText = [];

    function transform(el){
        if(!el || el.id==='vfxGUI'||el.id==='utilitiesGUI'||el.closest('#vfxGUI,#utilitiesGUI')) return;
        if(el.nodeType===Node.TEXT_NODE && el.nodeValue.trim()){
            window.originalText.push({el, text: el.nodeValue});
            let chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
            let bubbles='ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⓪'.split('');
            el.nodeValue = el.nodeValue.replace(/[a-zA-Z0-9]/g, l => bubbles[chars.indexOf(l)] || l);
        } else if(el.childNodes && el.childNodes.length>0){
            el.childNodes.forEach(transform);
        }
    }

    window.bubbleInt = setInterval(()=>{ transform(document.body); }, 50);
},()=>{  // off function for Bubble Text
  if(window.bubbleInt){clearInterval(window.bubbleInt); window.bubbleInt=null; window.bubbleActive=false;}
  if(window.originalText){window.originalText.forEach(o=>o.el.nodeValue=o.text); window.originalText=[];}
});


// Page Spin
addBtn(vfx,'Page Spin',()=>{
  if(window.pageSpinActive) return;
  window.pageSpinActive=true;
  let s=document.createElement('style');
  s.id='pageSpinStyle';
  s.innerHTML='@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#vfxGUI):not(#utilitiesGUI){animation:roll 140s linear 360;} body > *:not(#vfxGUI):not(#utilitiesGUI) *{animation:roll 140s linear 360;}';
  document.head.appendChild(s);
  window.pageSpinStyle=s;
},()=>{
  if(window.pageSpinStyle){window.pageSpinStyle.remove();window.pageSpinStyle=null;}
  window.pageSpinActive=false;
});
// Full Chaos
addBtn(vfx,'Full Chaos',()=>{
  if(window.fullChaosActive) return;
  window.fullChaosActive=true;
  let d=document;
  function c(){return '#'+Math.floor(16777215*Math.random()).toString(16)}
  function r(e){return Math.floor(Math.random()*e)+1}
  d.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
    e.style.margin='0'; e.style.padding='0'; e.style.overflow='hidden'; e.style.transformOrigin='50% 50%';
  });
  window.fullChaosLoop1=setInterval(()=>{
    for(let i=0;i<10;i++){
      let els=d.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)');
      if(els.length){
        let el=els[r(els.length)-1];
        el.style.backgroundColor=c();
        el.style.height=r(4)+'px';
        d.body.style.backgroundColor=c();
        d.body.style.transform=r(256)>128?'scale(3) rotate('+r(35)+'deg)':'rotate(0deg) scale(1)';
        window.scrollTo(0,d.body.scrollHeight);
      }
    }
  },10);
  window.fullChaosLoop2=setInterval(()=>{window.scrollTo(0,0)},50);
},()=>{
  if(window.fullChaosLoop1){clearInterval(window.fullChaosLoop1); window.fullChaosLoop1=null;}
  if(window.fullChaosLoop2){clearInterval(window.fullChaosLoop2); window.fullChaosLoop2=null;}
  window.fullChaosActive=false;
  document.body.style.transform='';
  document.body.style.backgroundColor='';
  document.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
    e.style.backgroundColor='';
    e.style.height='';
    e.style.transform='';
  });
});

// Stop All
addBtn(vfx,'Stop All',()=>{
  // Page Spin
  if(window.pageSpinStyle){window.pageSpinStyle.remove(); window.pageSpinStyle=null;}
  window.pageSpinActive=false;

  // Smooth Disco
  if(window.discoSmoothInt){clearInterval(window.discoSmoothInt); window.discoSmoothInt=null; window.discoSmoothActive=false;}

  // Glitch
  if(window.glitchInt){clearInterval(window.glitchInt); window.glitchInt=null; window.glitchActive=false;}

  // Full Chaos
  if(window.fullChaosLoop1){clearInterval(window.fullChaosLoop1); window.fullChaosLoop1=null;}
  if(window.fullChaosLoop2){clearInterval(window.fullChaosLoop2); window.fullChaosLoop2=null;}
  window.fullChaosActive=false;

  // Image Glitch
  if(window.imgGlitchInt){clearInterval(window.imgGlitchInt); window.imgGlitchInt=null;
    document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{e.style.position=''; e.style.left=''; e.style.top='';});
  }

  // Matrix Rain
  if(window.matrixInt){clearInterval(window.matrixInt); window.matrixInt=null;}
  if(window.matrixCanvas){window.matrixCanvas.remove(); window.matrixCanvas=null;}
  window.matrixActive=false;

  // Bubble Text
  if(window.bubbleInt){clearInterval(window.bubbleInt); window.bubbleInt=null; window.bubbleActive=false;}
  if(window.originalTextMap){window.originalTextMap.forEach((text, el)=>{ el.nodeValue=text; }); window.originalTextMap=null;}

  // Text Corruption
  if(window.textCorruptStyle){window.textCorruptStyle.remove(); window.textCorruptStyle=null;}

  // Reset page
  document.body.style.transform='';
  document.body.style.backgroundColor='';
  document.body.style.filter='';
  document.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
    e.style.backgroundColor='';
    e.style.height='';
    e.style.transform='';
    e.style.transition='';
    e.style.color='';
    e.style.fontSize='';
    e.style.position='';
    e.style.left='';
    e.style.top='';
  });
});

    // ------------------ Reset Utilities ------------------
    if(window.stats){ window.stats.dom.remove(); window.stats=null; }
    if(window.erudaInstance){ window.erudaInstance.destroy(); window.erudaInstance=null; window.erudaLoaded=false; }
    if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }

});

    // -------------------- FONT COLOR SLIDER --------------------
    (function(){
        const section = document.createElement('div');
        section.style.marginTop = '10px';
        section.style.padding = '8px';
        section.style.background = '#252525';
        section.style.borderRadius = '10px';
        section.style.color = '#00ff00';
        section.innerHTML = `<b>Text Color</b><br>`;
        const picker = document.createElement('input');
        picker.type = 'color';
        picker.value = '#00ff00';
        picker.oninput = () => {
            document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el => el.style.color = picker.value);
        };
        section.appendChild(picker);
        vfx.appendChild(section);
    })();

    // -------------------- SHIFT+H TO HIDE --------------------
    document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'h') {
      util.style.display = (util.style.display === 'none') ? 'block' : 'none';
      vfx.style.display = (vfx.style.display === 'none') ? 'block' : 'none';
    }
  });

  } // end spawnGUIs

})();
