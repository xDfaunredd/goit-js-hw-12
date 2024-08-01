import{a as f,S,i as y}from"./assets/vendor-ee72e1a4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();let c=1,w=15;f.defaults.baseURL="https://pixabay.com/api/";const P="45132355-1a938d4dc3b6908ed12965e8f",h=async(r,t=!1)=>{t&&(c=1);const i=new URLSearchParams({key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:c,per_page:w}),o=await f.get(`?${i}`);return c+=1,o.data},g=r=>r.map(({webformatURL:i,largeImageURL:o,tags:e,likes:s,views:l,comments:L,downloads:b})=>`
    <li class= "list-item">
    <a href="${o}"><img src="${i}" alt="${e}" class="list-img"></a>
 <ul class = "content-list">
 <li class="content-list-item">
 <p class="content-list-title">Likes</p>
 <p class="content-list-value">${s}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Views</p>
 <p class="content-list-value">${l}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Comments</p>
 <p class="content-list-value">${L}</p>
 </li>
 <li class="content-list-item">
 <p class="content-list-title">Downloads</p>
 <p class="content-list-value">${b}</p>
 </li>
 </ul>
    </li>
    `).join(" ");var v=new S(".gallery a",{captionsData:"alt",captionDelay:250});const u=document.querySelector(".form"),q=u.elements.information,a=document.querySelector(".gallery"),n=document.querySelector(".button.position"),m=document.querySelector(".loader"),p=document.querySelector(".load-more");let d="";const A=async r=>{r.preventDefault(),d=q.value,m.classList.remove("visually-hidden");try{const t=await h(d,!0);if(t.total===0)return n.classList.add("visually-hidden"),a.innerHTML="",y.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});a.innerHTML="";const i=g(t.hits);a.insertAdjacentHTML("afterbegin",i),v.refresh(),n.classList.remove("visually-hidden")}catch(t){a.innerHTML="",console.log(t)}finally{m.classList.add("visually-hidden"),u.reset()}},M=async()=>{n.disabled=!0,p.classList.remove("visually-hidden");try{const r=await h(d);p.classList.add("visually-hidden");const t=g(r.hits);a.insertAdjacentHTML("beforeend",t),v.refresh(),r.totalHits-a.childElementCount<=0&&(y.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.classList.add("visually-hidden"))}catch(r){console.log(r)}finally{n.disabled=!1}};n.addEventListener("click",M);u.addEventListener("submit",A);
//# sourceMappingURL=commonHelpers.js.map
