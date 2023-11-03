let first_bg = document.querySelector('.first_bg')
let header = document.querySelector('header')
let logo = document.querySelector('h1')
let company_name = document.querySelector('.main_title_txt')
let company_name_info = document.querySelector('.main_title_info')
let company_info = document.querySelector('.main_info')
let circle = document.querySelector('.circle')
let first = document.querySelector('.main_wrap')
let clickA = document.querySelectorAll('a')
const mouse_circle = document.querySelector(".mouse_circle");
let home = document.querySelector('.home_wrap')
let contact = document.querySelector('.contact_wrap')
let home_btn = document.querySelector('.home')
let portfolio_btn = document.querySelector('.portfolio')
let contact_btn = document.querySelector('.contact')
let company = document.querySelector('.company_wrap')
let box = document.querySelectorAll('.section')
let container = document.querySelector('.portfolio_wrap')
let cover = document.querySelector('.main_cover')
let form_btn = document.querySelector('.form_btn button')
let form = document.querySelector('.form_wrap')
let main_video = document.querySelector('.main_video video')
let circle_video = document.querySelector('.circle video')

/* $(contact_btn).on('click', function() {
    // contact div를 새로 고칩니다.
    $("#contact").load(location.href+ "#contact");
}); */
/* window.addEventListener('scroll', function(){
    console.log(window.scrollY)
}) */
/* 특정영역 새로고침, 페이지 전환효과 */

/* 웹 resize시 페이지 새로고침 */
/* $(function() {
    $(window).resize(function() {
        location.reload(); 
    });
}); */

/* 세로크기가 클 땐 height 100%, 가로크기가 클 땐 width 100% */
if (window.innerWidth <= window.innerHeight) {
	main_video.style.height = '100%'
	main_video.style.width = 'auto'
	circle_video.style.height = '100%'
	circle_video.style.width = 'auto'
} else {
    main_video.style.width = '100%'
    main_video.style.height = 'auto'
    circle_video.style.width = '100%'
    circle_video.style.height = 'auto'
}


document.addEventListener("DOMContentLoaded", function() {
    var contactLinks = document.querySelectorAll('.contact');

    contactLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 이벤트 막기 (페이지 이동 방지)

            // 1초(1000 밀리초) 딜레이 후에 스르륵 스크롤 이동
            setTimeout(function() {
                var targetId = link.getAttribute('href').substring(1); // "#contact"에서 "#" 제거
                var targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'auto' // 스르륵 스크롤
                    });
                }
            }, 500); // 1000 밀리초 = 1초
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var portfolioLinks = document.querySelectorAll('.portfolio');

    portfolioLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 이벤트 막기 (페이지 이동 방지)

            // 0.5초(500 밀리초) 딜레이 후에 스르륵 스크롤 이동
            setTimeout(function() {
                var targetId = link.getAttribute('href').substring(1); // "#section"에서 "#" 제거
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // 섹션의 부모 요소를 기준으로한 상단 좌표 계산
                    var targetOffsetTop = targetElement.offsetTop + targetElement.offsetParent.offsetTop;
                    window.scrollTo({
                        top: targetOffsetTop,
                        behavior: 'auto' // 스르륵 스크롤
                    });
                }
            }, 500); // 500 밀리초 = 0.5초
        });
    });
});








let revealAnimations = [];

/* lenis / 스크롤 부드럽게 */
const lenis = new Lenis({
    lerp: 0.1,
    smooth: true,
    direction: "vertical"
});

window.lenis = lenis;
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

ScrollTrigger.create({
    trigger: '.scale_wrap',
    animation: gsap.fromTo('.company_wrap',{scale: 5}, {scale: 1}),
    pin: ".scale_wrap",
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
})


/* scale wrap 스크롤 시 고정 */
box.forEach(cover => {
    gsap.to(cover, {
        ease: 'none',
        scrollTrigger: {
            trigger: '.main_cover',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
            onEnter: () => $('.scale_wrap').addClass('grid'),
            onLeave: () => $('.scale_wrap').removeClass('grid'),
            onEnterBack: () => $('.scale_wrap').addClass('grid'),
            onLeaveBack: () => $('.scale_wrap').removeClass('grid'),
        }
    })
})



/* portfolio */
gsap.registerPlugin(ScrollTrigger);

(function($) {
    $(document).ready(function() {
    initialiseApp();

    function initialiseApp() {
        initialiseGSAPScrollTriggerPinningHorizontal();
        initialiseLenisScroll();
    }

    function initialiseGSAPScrollTriggerPinningHorizontal() {
        let sectionPin = document.querySelector('#section_pin');
        let containerAnimation = gsap.to(sectionPin, {
        scrollTrigger: {
        trigger: '#section_to-pin',
        start: 'top top',
        end: () => "+=" + sectionPin.offsetWidth,
        pin: true,
        scrub: true,
        },
        x: () => -(sectionPin.scrollWidth - document.documentElement.clientWidth) + "px",
        ease: 'none'
    });

    var imageWrappers = sectionPin.querySelectorAll('.image_wrapper');

    imageWrappers.forEach(imageWrapper => {
        var imageWrapperID = imageWrapper.id;

        gsap.to(imageWrapper, {
        scrollTrigger: {
            trigger: imageWrapper,
            start: 'left center',
            end: 'right center',
            containerAnimation: containerAnimation,
        }
        });
      });
    }

    function initialiseLenisScroll() {
      const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.2
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  });
}) (jQuery);



/* console.log(container.offsetWidth)
const scrollWidth = container.offsetWidth - window.innerWidth;
gsap.to(container, {
    x: () => -(container.offsetWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "top top",
            invalidateOnRefresh: true,
            markers: true,
            scrub: 1,
            end: () => {
                const endPoint = "+=" + scrollWidth;
                console.log("End Point:", endPoint); // 콘솔에 end point 출력
                return endPoint;
            },// 스크롤 가능한 전체 너비만큼 이동
        onEnter: () => { // 스크롤이 끝에 도달하면 처음으로 되돌아가기
            gsap.set(container, { x: 0 });}
        }
}) */







/* 페이지 새로고침 시 애니메이션 */
window.onload = function(){
    first_bg.classList.add('hidden');
    setTimeout(function() {
        first_bg.style.height = '0%';
        header.style.height = '50px';
        company_name.classList.add('height');
        company_name_info.style.opacity = '1';
        company_info.style.opacity = '1';
    }, 2000);
}



/* 마우스 팔로우 객체 */
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const mouseX2 = e.pageX;
    const mouseY2 = e.pageY;
    mouse_circle.style.left = mouseX + 'px';
    mouse_circle.style.top = mouseY + 'px';
    mouse_circle.style.left = mouseX2 + 'px';
    mouse_circle.style.top = mouseY2 + 'px';
    document.addEventListener("scroll", (e) => {
        const mouseX3 = window.scrollX;
        const mouseY3 = window.scrollY;
        mouse_circle.style.left = mouseX + mouseX3 + 'px';
        mouse_circle.style.top = mouseY + mouseY3 + 'px';

        /* let head = document.querySelector('header')
        head.innerHTML = window.scrollY ; */
    });
});



/* 페이지 이동 애니메이션 */
clickA.forEach(a => {
    a.addEventListener('click', function() {
        mouse_circle.style.scale = '5000';
        setTimeout(() => {
            mouse_circle.style.scale = '1';
        }, 700);
    });
});



form_btn.addEventListener('click', function(){
    if (form.style.width === '0%' || form.style.width === '') {
        form.style.width = '30%';
        form.style.opacity = 1;
        form.style.display = 'block';
        form.style.overflow = 'visible';
        form_btn.innerHTML = 'Close';
    } else {
        form.style.width = '0%';
        form.style.opacity = 0;
        form_btn.innerHTML = 'Contact';
        setTimeout(() => {
            form.style.display = 'none'
        }, 500);
    }
})



/* 네이버맵 */
/* let mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
} */


var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.6431417,127.0232859), // 잠실 롯데월드를 중심으로 하는 지도
    zoom: 18
});

var marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.6431417,127.0232859),
    map: map
});
/* console.log(window.innerHeight)
document.addEventListener('scroll',function(){
    if(first.pageY >= '50vh'){
        head.innerHTML = 'asdfgasdg'
    }
}) */

/* const screenHeight = window.innerHeight; // 현재 사용자의 화면 높이를 얻습니다.

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset; // 스크롤 위치를 얻습니다.
    
    // 스크롤 위치가 화면 높이의 일정 비율에 도달하면 이벤트를 실행합니다.
    const scrollPercentage = (scrollY / screenHeight) * 100;
    
    // 예를 들어, 스크롤 위치가 화면 높이의 50%에 도달하면 이벤트를 실행할 수 있습니다.
    if (scrollPercentage >= 50) {
        // 여기에 실행하고자 하는 이벤트 코드를 작성합니다.
        console.log("스크롤 위치가 화면 높이의 50% 이상입니다.");
    }
}); */

/* gsap.timeline()
    .set('.logo',     { x:215, y:482 })
    .set('.chip',     { x:148, y:66 })
    .set('.knot',     { x:22, y:250 })
    .set('.numTxt',   { x:22, y:375 })
    .set('.nameTxt',  { x:22, y:410 })
    .add(centerMain(), 0.2)
    .from('.ball',    { duration:2,
                        transformOrigin:'50% 50%',
                        scale:0,
                        opacity:0,
                        ease:'elastic',
                        stagger:0.2
                    }, 0)
    .fromTo('.card',  { x:200,
                        y:40,
                        transformOrigin:'50% 50%',
                        rotation:-4,
                        skewX:10,
                        skewY:4,
                        scale:2,
                        opacity:0
                    },{
                        duration:1.3,
                        skewX:0,
                        skewY:0,
                        scale:1,
                        opacity:1,
                        ease:'power4.inOut'
                    }, 0.2)
        


function centerMain(){ gsap.set('.main', {x:'50%', xPercent:-50, y:'50%', yPercent:-50}); }
window.onresize = centerMain;

window.onmousemove = (e)=> {
    let winPercent = { x:e.clientX/window.innerWidth, y:e.clientY/window.innerHeight },
        distFromCenter = 1 - Math.abs((e.clientX - window.innerWidth/2)/window.innerWidth*2);

    gsap.timeline({defaults:{duration:0.5, overwrite:'auto'}})
        .to('.card',        {rotation:-7+9*winPercent.x}, 0)
        .to('.fillLight',   {opacity:distFromCenter}, 0)  
        .to('.bg',          {x:100-200*winPercent.x, y:20-40*winPercent.y}, 0) 
} */