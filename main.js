let menu = document.getElementById("menu")
let navlist = document.getElementById("nav-list")
let navHolder = navlist.getElementsByClassName("nav-holder")[0];
let header = document.getElementsByTagName("header")[0]
function showNav(){

    navlist.classList.add("active")
}

menu.onclick = ()=>{
    showNav()
}

document.body.onclick = (e)=>{

    navlist.classList.remove("active")
    if(e.target.parentElement == menu){
        showNav()
    }
}




let productsrRow = document.getElementById("products-row")

fetch("./data.json").then((e)=>e.json()).then(data =>{
  for (let i = 0; i <Object.keys(data).length;i++){
      let x = `
            <div class="name">
                <h5>${data[i].name}</h5>
            </div>
            <div class="image-holder">
                <img src="${data[i].image}" alt="">
            </div>
           <div class = "price">
           
            <span>AED:</span><h3>${data[i].price}</h3>
           </div>
          
      `
      let col = document.createElement('div')
      col.className = "col"
      col.innerHTML = x
      productsrRow.append(col)
  }
})
setInterval(()=>{
    if (window.scrollY >= 200){
        header.classList.add("active")
    }else{
        
        header.classList.remove("active")
    }
},200)



const sr = ScrollReveal();

sr.reveal(".products",{
    duration: 1000,    // Animation duration in milliseconds
    delay: 100,        // Delay before the animation starts (in milliseconds)
    origin: 'top',    // Starting position ('top', 'bottom', 'left', 'right', etc.)
    distance: '50px',  // Distance moved during the animation
    easing: 'ease-in-out', // Animation easing function
    reset:true
})
sr.reveal(".brands",{
    duration: 1000,    // Animation duration in milliseconds
    delay: 100,        // Delay before the animation starts (in milliseconds)
    origin: 'bottom',    // Starting position ('top', 'bottom', 'left', 'right', etc.)
    distance: '50px',  // Distance moved during the animation
    easing: 'ease-in-out', // Animation easing function
    reset:true
})


sr.reveal(".about-us",{
    duration: 1000,    // Animation duration in milliseconds
    delay: 100,        // Delay before the animation starts (in milliseconds)
    origin: 'bottom',    // Starting position ('top', 'bottom', 'left', 'right', etc.)
    distance: '50px',  // Distance moved during the animation
    easing: 'ease-in-out', // Animation easing function
    reset:true
})