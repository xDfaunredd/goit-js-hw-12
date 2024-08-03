import{S as T,a as g,i as u}from"./assets/vendor-53a1b719.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const y=r=>r.map(({webformatURL:o,largeImageURL:l,tags:e,likes:s,views:c,comments:b,downloads:S})=>`
    <li class= "list-item">
    <a href="${l}"><img src="${o}" alt="${e}" class="list-img"></a>
 <ul class = "content-list">
 <li class="content-list-item">
 <p class="content-list-title">Likes</p>
 <p class="content-list-value">${s}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Views</p>
 <p class="content-list-value">${c}</p>
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
    `).join(" ");class p{constructor(t,o){this.itemToService=t,this.hiddenClass=o}hide(){this.itemToService.classList.add(this.hiddenClass)}show(){this.itemToService.classList.remove(this.hiddenClass)}disable(){this.itemToService.disabled=!0}enable(){this.itemToService.disabled=!1}}var v=new T(".gallery a",{captionsData:"alt",captionDelay:250});g.defaults.baseURL="https://pixabay.com/api/";const P="45132355-1a938d4dc3b6908ed12965e8f",L=async({page:r,perPage:t,q:o})=>{const l=new URLSearchParams({key:P,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:t});return(await g.get(`?${l}`)).data},M=document.querySelector(".loader"),E=document.querySelector(".load-more"),h=document.querySelector(".position"),w=document.querySelector(".form"),n=document.querySelector(".gallery");let i={page:1,perPage:156,maxPages:0,q:"",heightOfCard:0};const d=new p(M,"visually-hidden"),f=new p(E,"visually-hidden"),a=new p(h,"visually-hidden");async function H(r){r.preventDefault(),d.show(),i.page=1,i.q=r.currentTarget.elements.information.value.trim();try{const t=await L(i);if(t.totalHits===0)return d.hide(),n.innerHTML="",a.hide(),u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});const o=y(t.hits);d.hide(),n.innerHTML="",n.insertAdjacentHTML("afterbegin",o),i.heightOfCard=n.firstElementChild.getBoundingClientRect().height,i.maxPages=Math.ceil(t.totalHits/i.perPage),v.refresh(),i.page!==i.maxPages?(a.show(),h.addEventListener("click",m)):(a.hide(),h.removeEventListener("click",m))}catch(t){return d.hide(),n.innerHTML="",u.warning({title:"Error : ",message:t,position:"topRight"})}finally{w.reset()}}async function m(){a.disable(),f.show(),i.page+=1;try{const r=await L(i),t=y(r.hits);if(f.hide(),n.insertAdjacentHTML("beforeend",t),console.log(n.childElementCount),v.refresh(),window.scrollBy(0,2*i.heightOfCard),i.maxPages===i.page)return a.hide(),h.removeEventListener("click",m),u.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}catch(r){return d.hide(),a.hide(),n.innerHTML="",h.removeEventListener("click",m),u.warning({title:"Error : ",message:r,position:"topRight"})}finally{a.enable()}}w.addEventListener("submit",H);
//# sourceMappingURL=commonHelpers.js.map
