

window.addEventListener("load", function(){
  let currentActive = 0;
  const items = document.querySelectorAll(".slider-item");
  const size = items[0].clientWidth;
  
  function gotoItem(){
    const gallery = document.querySelector("#gallery");
 
    gallery.style.transform = 'translateX(' + (-size * currentActive) + 'px)';
  }

  document.querySelector("#next-btn").addEventListener("click", function(){
    if (currentActive == items.length -1 ){
      currentActive = 0
    }else {
      currentActive += 1;
    }
    gotoItem()
  })
  
  document.querySelector("#prev-btn").addEventListener("click", function(){
    if (currentActive == 0 ){
      currentActive = items.length -1
    }else {
      currentActive -= 1;
    }
    gotoItem()
    
  })
  
})