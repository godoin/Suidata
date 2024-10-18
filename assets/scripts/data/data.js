import{attachEventHandlerById as t}from"../shared/eventHandlers.js";let allCountries=[],currentSortColumn=[],isAscending=!0,currentPage=1,itemsPerPage=10,createTableDataElement=t=>{let e=document.createElement("tr");e.classList.add("data");let a=`
    <td class="data">
      <div class="group">
        <img src="${t.image_url}" alt="${t.name}" height="30" width="60"/>
          ${t.name}
      </div>
    </td>
    <td class="data">${t.year}</td>
    <td class="data">${t.male}</td>
    <td class="data">${t.female}</td>
    <td class="data">${t.age_group_5_to_14}</td>
    <td class="data">${t.age_group_15_to_24}</td>
    <td class="data">${t.age_group_25_to_34}</td>
    <td class="data">${t.age_group_35_to_54}</td>
    <td class="data">${t.age_group_55_to_74}</td>
    <td class="data">${t.age_group_75_plus}</td>
  `;return e.innerHTML=a,e},loadCountryData=(t,e,a=1)=>{let l=document.getElementById(e);l?.closest(".table-container"),l.innerHTML="";let n=(a-1)*10,r=n+10,o=t.slice(n,r),d=o.map(createTableDataElement);d.forEach(t=>l.appendChild(t)),updatePaginationButtons()};function updatePaginationButtons(){let t=document.getElementById("prev-button"),e=document.getElementById("next-button");t.disabled=1===currentPage;let a=Math.ceil(allCountries.length/10);e.disabled=currentPage===a}let handlePreviousPage=()=>{currentPage>1&&loadCountryData(allCountries,"table-body",--currentPage)},handleNextPage=()=>{let t=Math.ceil(allCountries.length/10);currentPage<t&&loadCountryData(allCountries,"table-body",++currentPage)},initializeDataLoading=async(t,e)=>{try{let a=await fetch(t);if(!a.ok)return console.error(`Error fetching data from ${t}`),null;let l=await a.json();loadCountryData(l,e),allCountries=l}catch(n){console.error(n)}},handleSearch=(t,e)=>{t.preventDefault();let a=t.target.value.toLowerCase(),l=document.getElementById(e).value,n=allCountries.filter(t=>t.name?.toLowerCase().includes(a)).filter(t=>!l||t.year?.toString()===l);loadCountryData(n,"table-body")},handleSorting=(t,e)=>{t.preventDefault();let a=t.target.value,l=document.getElementById(e).value.toLowerCase(),n=allCountries.filter(t=>!l||t.name?.toLowerCase().includes(l)).filter(t=>(console.log(`${a} ~ ${t.year.toString()}`),t.year?.toString()===a));loadCountryData(n,"table-body")};export const setupDataLoadingAndListeners=()=>{console.log("Data event loading and listeners are running...");let e="table-body",a="data-year-select",l="search-input",n=document.getElementById(e);n&&(initializeDataLoading("assets/json/data.json",e),t(a,"change",handleSorting,l),t(l,"input",handleSearch,a),t("prev-button","click",handlePreviousPage),t("next-button","click",handleNextPage))};