import{S as P,a as g,i as m}from"./assets/vendor-53a1b719.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const y=r=>r.map(({webformatURL:o,largeImageURL:a,tags:e,likes:s,views:d,comments:b,downloads:S})=>`
    <li class= "list-item">
    <a href="${a}"><img src="${o}" alt="${e}" class="list-img"></a>
 <ul class = "content-list">
 <li class="content-list-item">
 <p class="content-list-title">Likes</p>
 <p class="content-list-value">${s}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Views</p>
 <p class="content-list-value">${d}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Comments</p>
 <p class="content-list-value">${b}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Downloads</p>
 <p class="content-list-value">${S}</p>
 </li>
 </ul>
    </li>
    `).join(" ");class p{constructor(t,o){this.itemToService=t,this.hiddenClass=o}hide(){this.itemToService.classList.add(this.hiddenClass)}show(){this.itemToService.classList.remove(this.hiddenClass)}disable(){this.itemToService.disabled=!0}enable(){this.itemToService.disabled=!1}}var v=new P(".gallery a",{captionsData:"alt",captionDelay:250});g.defaults.baseURL="https://pixabay.com/api/";const T="45132355-1a938d4dc3b6908ed12965e8f",L=async({page:r,perPage:t,q:o})=>{const a=new URLSearchParams({key:T,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:t});return(await g.get(`?${a}`)).data},E=document.querySelector(".loader"),M=document.querySelector(".load-more"),c=document.querySelector(".position"),w=document.querySelector(".form"),l=document.querySelector(".gallery");let i={page:1,perPage:15,maxPages:0,q:"",heightOfCard:0};const h=new p(E,"visually-hidden"),f=new p(M,"visually-hidden"),n=new p(c,"visually-hidden");async function C(r){r.preventDefault(),c.removeEventListener("click",u),h.show(),i.page=1,i.q=r.currentTarget.elements.information.value.trim();try{const t=await L(i);if(t.totalHits===0)return h.hide(),l.innerHTML="",n.hide(),m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const o=y(t.hits);h.hide(),l.innerHTML="",l.insertAdjacentHTML("afterbegin",o),i.heightOfCard=l.firstElementChild.getBoundingClientRect().height,i.maxPages=Math.ceil(t.totalHits/i.perPage),v.refresh(),i.page!==i.maxPages?(n.show(),c.addEventListener("click",u)):(n.hide(),c.removeEventListener("click",u))}catch(t){return h.hide(),m.warning({title:"Error : ",message:t,position:"topRight"})}finally{w.reset()}}async function u(){n.disable(),f.show(),i.page+=1;try{const r=await L(i),t=y(r.hits);if(f.hide(),l.insertAdjacentHTML("beforeend",t),console.log(l.childElementCount),v.refresh(),window.scrollBy(0,2*i.heightOfCard),i.maxPages===i.page)return n.hide(),c.removeEventListener("click",u),m.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}catch(r){return h.hide(),n.hide(),c.removeEventListener("click",u),m.warning({title:"Error : ",message:r,position:"topRight"})}finally{n.enable()}}w.addEventListener("submit",C);
//# sourceMappingURL=commonHelpers.js.map
