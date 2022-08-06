$(document).ready(function(){


  $('.fa-bars').click(function(){
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll',function(){
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if($(window).scrollTop() > 30){
      $('.header').css({'background':'#6C5CE7','box-shadow':'0 .2rem .5rem rgba(0,0,0,.4)'});
    }else{
      $('.header').css({'background':'none','box-shadow':'none'});
    }
  });


  $('.accordion-header').click(function(){
    $('.accordion .accordion-body').slideUp();
    $(this).next('.accordion-body').slideDown();
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
  });



});

function sendEmail(){
  Email.send({
    Host : "smtp.gmail.com",
    Username : "acroshubham12@gmail.com",
    Password : "Vaishnavi12345@",
    To : 'shubhamsharma3412@gmail.com',
    From : document.getElementById("email").value,
    Subject : "New contact form enquiry",
    Body : "And this is the body"
}).then(
  message => alert(message)
);

}
