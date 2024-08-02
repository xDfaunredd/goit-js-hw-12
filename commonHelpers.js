import{S,a as p,i as h}from"./assets/vendor-53a1b719.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const f=i=>i.map(({webformatURL:r,largeImageURL:a,tags:e,likes:o,views:l,comments:b,downloads:L})=>`
    <li class= "list-item">
    <a href="${a}"><img src="${r}" alt="${e}" class="list-img"></a>
 <ul class = "content-list">
 <li class="content-list-item">
 <p class="content-list-title">Likes</p>
 <p class="content-list-value">${o}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Views</p>
 <p class="content-list-value">${l}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Comments</p>
 <p class="content-list-value">${b}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Downloads</p>
 <p class="content-list-value">${L}</p>
 </li>
 </ul>
    </li>
    `).join(" ");class m{constructor(t,r){this.itemToService=t,this.hiddenClass=r}hide(){this.itemToService.classList.add(this.hiddenClass)}show(){this.itemToService.classList.remove(this.hiddenClass)}disable(){this.itemToService.disabled=!0}enable(){this.itemToService.disabled=!1}}var g=new S(".gallery a",{captionsData:"alt",captionDelay:250});p.defaults.baseURL="https://pixabay.com/api/";const w="45132355-1a938d4dc3b6908ed12965e8f",y=async({page:i,perPage:t,q:r})=>{const a=new URLSearchParams({key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:t});return(await p.get(`?${a}`)).data},P=document.querySelector(".loader"),T=document.querySelector(".load-more"),c=document.querySelector(".position"),v=document.querySelector(".form"),d=document.querySelector(".gallery");let s={page:1,perPage:15,maxPages:0,q:""};const q=new m(P,"visually-hidden"),M=new m(T,"visually-hidden"),n=new m(c,"visually-hidden");n.hide();q.hide();M.hide();async function x(i){i.preventDefault(),s.page=1,s.q=i.currentTarget.elements.information.value.trim(),console.log(s.q);try{const t=await y(s);console.log(t);const r=f(t.hits);if(d.innerHTML="",d.insertAdjacentHTML("afterbegin",r),g.refresh(),t.totalHits===0)return h.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});s.maxPages=Math.ceil(t.totalHits/s.perPage),console.log(s.page),console.log(s.maxPages),s.page!==s.maxPages?(n.show(),c.addEventListener("click",u)):(n.hide(),c.removeEventListener("click",u))}catch(t){console.log(t)}finally{v.reset()}}async function u(){n.disable(),s.page+=1;try{const i=await y(s),t=f(i.hits);if(d.insertAdjacentHTML("beforeend",t),g.refresh(),console.log(d.childElementCount),s.maxPages===s.page)return n.hide(),c.removeEventListener("click",u),h.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})}catch(i){console.log(i)}finally{n.enable()}}v.addEventListener("submit",x);
//# sourceMappingURL=commonHelpers.js.map
