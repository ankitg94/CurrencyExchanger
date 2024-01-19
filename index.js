const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

//"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown  = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg =document.querySelector(".msg")

for(let select of dropdown){
    for(currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText =currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode === "INR"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode === "BDT"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode  = element.value;
    let countryCode =countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img  = element.parentElement.querySelector("img");
    img.src=newsrc;
}


const updateExchaneRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
   
    if(amtval === ""|| amtval < 1) {
     amtval = 1;
     amtval.value = "1";
    }
    // console.log(fromcurr.value,tocurr.value)
    const URL = `${base_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    const responce = await fetch(URL) 
    const  data = await responce.json();
    const rate =data[tocurr.value.toLowerCase()];
    let finalamount =amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}
//btn action
btn.addEventListener("click",async (evt)=>{
        evt.preventDefault();
       updateExchaneRate()    
});
window.addEventListener("load",()=>{
    updateExchaneRate();
})
