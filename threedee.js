

var perspective = 1000;
var x,y,rX,rY;
var mobileDevice = false;
var cards;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 mobileDevice = true;
}




(function($){
  if(!mobileDevice){
  var card = $(".card");
  card.on('mousemove', function (e) {

      x = e.clientX - $(this).offset().left + $(window).scrollLeft();
      y = e.clientY - $(this).offset().top + $(window).scrollTop();

      rY = map(x, 0, $(this).width(), -40, 40);

      rX = map(y, 0, $(this).height(), -40, 40);

      document.getElementById('layer1').style.transform = "perspective("+perspective+"px)" +" " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg) !important"
      // console.log(document.getElementById('layer1'))
      $(this).children(".image").css({
        transform: "perspective("+perspective+"px)" +" " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg) "
      });

  });

  card.on( 'scroll', function(){
   console.log('Event Fired');
});

//   card.on('mouseenter', function () {
//     $(this).children(".image").css({
//         transition: "all " + 0.1 + "s" + " linear",
//     });
// });
//
// card.on('mouseleave', function () {
//     $(this).children(".image").css({
//         transition: "all " + 0.2 + "s" + " linear",
//     });

    // $(this).children(".image").css("transform", "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)");
// });


  function map(x, in_min, in_max, out_min, out_max)
  {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
}
})(jQuery);


document.getElementById('card').addEventListener('mousemove',function(e){
  x = e.clientX - $(this).offset().left + $(window).scrollLeft();
  y = e.clientY - $(this).offset().top + $(window).scrollTop();

  rY = map(x, 0, $(this).width(), -40, 40);

  rX = map(y, 0, $(this).height(), -40, 40);

  document.getElementById('layer0').style.transform = "rotateY(100deg)"


})



document.addEventListener('wheel', function (event) {
  // event.preventDefault();
  if(document.querySelectorAll( ":hover" )[3]){
  if(document.querySelectorAll( ":hover" )[3].classList.contains("card")){
    event.preventDefault();

    var currCard = document.querySelectorAll( ":hover" )[3];

    perspective += event.deltaY*2;

    if(perspective < 300){
      perspective = 300;
    }else if(perspective > 2000){
      perspective = 2000;
    }


    $(currCard).children(".image").css("transform", "perspective("+perspective+"px)" +" " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)");
    // $(currCard).children(".image").css("transform", "perspective(200px)");
  };
}

    if (event.target.id === 'mainWrapper') { // or any other filtering condition
    }
},{ passive: false });
