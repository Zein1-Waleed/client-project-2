let menu = document.getElementById("menu")
let navlist = document.getElementById("nav-list")
let navHolder = navlist.getElementsByClassName("nav-holder")[0];


menu.onclick = ()=>{
    navlist.classList.add("active")
}



//   import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'
//   const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,

//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     // navigation: {
//     //   nextEl: next(),
//     //   prevEl: '.swiper-button-prev',
//     // },

//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });
//   function triggerNext() {
//     swiper.slideNext(); // This method will go to the next slide
//   }

//   // Set an interval to trigger "next" every one second (1000 milliseconds)
//   setInterval(triggerNext, 5000);




let productsrRow = document.getElementById("products-row")

fetch("../data.json").then((e)=>e.json()).then(data =>{
  for (let i = 0; i <Object.keys(data).length;i++){
      let x = `
          
            <div class="image-holder">
                <img src="${data[i].image}" alt="">
            </div>
            <div class="name">
                <h3>${data[i].name}
                </h3>
            </div>
            <div class="model">
                <h4>model: ${data[i].model}</h4>
            </div>
            <div class="description">
                <p><h4>Description</h4> : ${data[i].description}.</p>
            </div>
          
      `
      let col = document.createElement('div')
      col.className = "col"
      col.innerHTML = x
      productsrRow.append(col)
  }
  // console.log(Object.keys(data))
})


