//smooth scrolling
const lenis = new Lenis({
    duration: 3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//cursor design
var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});


//hero-animation
const splitType = document.querySelectorAll('.name h1')

        splitType.forEach((char,i) => {
            const text = new SplitType(char, { types: 'chars'})

            gsap.from(".char", 1.5, {
                scrollTrigger: {
                  trigger: ".hero",
                  scrub: false,
                  pin: false,
                  start: "top bottom",
                },
                stagger:{
                    amount: .5,
                  },
                y: '100%',
                ease: "power4.inOut",
              })
        });

        gsap.from(".hero-text-one, .hero-text-two, .hero-text-three, .hero-text-four", 1, {
            scrollTrigger: {
              trigger: ".hero",
              scrub: false,
              pin: false,
              start: "top bottom",
              end: "+=100%",
            },
            delay: 1.5,
            y: '100%',
            ease: "power4.inOut",
          });

//text-animation to big btext
const splitTypes = document.querySelectorAll('.reveal-type')

        splitTypes.forEach((char,i) => {

            const bg = char.dataset.bgColor
            const fg = char.dataset.fgColor

            const text = new SplitType(char, { types: 'chars'})

            gsap.fromTo(text.chars, 
                {
                    color: bg,
                },
                {
                    color: fg,
                    duration: 20,
                    stagger: 10,
                    scrollTrigger: {
                        trigger: char,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        scrub: true,
                        markers: false,
                        toggleActions: 'play play reverse reverse'
                    }
            })
        });


//project section animation
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const links = [...document.querySelectorAll('li')];
  
  function lerp(start, end, t){
      return start * (1 - t) + end * t;
  }
  
  
  
  let imgIndex = 0;
  // Load images into an array for reference
  const images = [
      './IMAGES/1.jpg',
      './IMAGES/2.jpg',
      './IMAGES/3.jpg',
      './IMAGES/4.jpg',
      './IMAGES/1.jpg',
      './IMAGES/5.jpg'
  ]
  
  let imgArr = [];
  
  // Canvas mousemove varaibles
  
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  window.addEventListener('mousemove', (e)=> {
      targetX = e.clientX;
      targetY = e.clientY;
      
  })
  
  images.forEach((image, idx) => {
      let elImage = new Image(450);
      elImage.src = image;
      elImage.classList.add('project-image');
      document.body.append(elImage);
      imgArr.push(elImage)
  })
  
  // Draw images to the canvas
  
  let percent = 0;
  let target = 0;
  
  function drawImage(idx){
      let {width, height} = imgArr[idx].getBoundingClientRect();
  
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
  
      // pixelate by diabling the smoothing
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.msSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
  
      if(target === 1){ // Link has been hovered
          // 2 speeds to make the effect more gradual
          if(percent < 0.2){
              percent += .01;
          }else if(percent < 1){
              percent += .1;
          }
      }else if(target === 0){
          if(percent > 0.2){
              percent -= .3
          }else if( percent > 0){
              percent -= .01;
          }
      }
  
      let scaledWidth = width * percent;
      let scaledHeight = height * percent;
  
      if(percent >= 1){
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
          ctx.drawImage(imgArr[idx], 0, 0, width, height);
      }else{
          ctx.drawImage(imgArr[idx], 0, 0, scaledWidth, scaledHeight);
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
          if(canvas.width !== 0 && canvas.height !== 0){
              ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height)
          }
      }
  }
  
  for(let i = 0; i < links.length; i++){
      links[i].addEventListener('mouseover', () => {
          for(let j = 0; j < links.length; j++){
              if(j !== i){
                  links[j].style.opacity = 0.2;
                  links[j].style.zIndex = 0;
              }else{
                  links[j].style.opacity = 1;
                  links[j].style.zIndex = 3;
              }
          }
      })
  
      links[i].addEventListener('mouseleave', () => {
          for(let i = 0; i < links.length; i++){
              links[i].style.opacity = 1;
          }
      })
  
      links[i].addEventListener('mouseenter', () => {
          imgIndex = i;
          target = 1
      });
  
      links[i].addEventListener('mouseleave', () => {
          target = 0;
      })
  }
  
  function animate(){
      currentX = lerp(currentX, targetX, 0.075);
      currentY = lerp(currentY, targetY, 0.075);
      let { width, height} = imgArr[imgIndex].getBoundingClientRect();
      canvas.style.transform = `translate3d(${currentX - (width / 2)}px, ${currentY - (height / 2)}px, 0)`;
      drawImage(imgIndex);
      window.requestAnimationFrame(animate);
  }
  
  animate()


const container = document.querySelector(".video-container-first")
const containertwo = document.querySelector(".video-container-footer")

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top 85%",
    end: "bottom 100%",
    markers:false,
  }
}) 
.from(container , 1.5,{
    width: 0,
    ease: "power4.inOut",
});
const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: containertwo,
      start: "top 85%",
      end: "bottom 100%",
    }
  }) 
  .from(containertwo , 1.5,{
    width: 0,
    ease: "power4.inOut",
  });

gsap.utils.toArray('.section').forEach((section, i) => {
  
    if(section.getAttribute('data-color') !== null) {
      
      var colorAttr = section.getAttribute('data-color')
      
      gsap.to(".change-color", {
        backgroundColor: colorAttr === "white-color" ? gsap.getProperty("html", "--white-color") : gsap.getProperty("html", "--black-color"),
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          markers: false,
          end: '+=40%'
        }
      });
  
    }
    
  });



  gsap.from(".experience-title h5", 1, {
    scrollTrigger: {
      trigger: ".experience",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".line", 3, {
    scrollTrigger: {
      trigger: ".experience",
      scrub: false,
      pin: false,
      start: "middle bottom",
      end: "+=100%",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "power4.inOut"
  });

  gsap.from(".experience-title p", 1.5, {
    scrollTrigger: {
      trigger: ".experience",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    delay: 1.9,
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".experience-three-container, .experience-two-container, .experience-one-container", 1.5, {
    scrollTrigger: {
      trigger: ".experience",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    stagger:{
        amount: .2,
      },
    y: '100%',
    ease: "power4.inOut",
  });


  gsap.from(".design-title h5", 1, {
    scrollTrigger: {
      trigger: ".designs",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".line-2", 3, {
    scrollTrigger: {
      trigger: ".designs",
      scrub: false,
      pin: false,
      start: "middle bottom",
      end: "+=100%",
    },
    scaleX: 0, 
    transformOrigin: "left center", 
    ease: "power4.inOut"
  });

  gsap.from(".design-title p", 1.5, {
    scrollTrigger: {
      trigger: ".designs",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    delay: 2,
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".link-wrapper", 1.5, {
    scrollTrigger: {
      trigger: ".designs",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    stagger:{
        amount: .5,
      },
    y: '100%',
    ease: "power4.inOut",
  });

  gsap.from(".company-experience", 1, {
    scrollTrigger: {
      trigger: ".hero-experience",
      scrub: false,
      pin: false,
      start: "top bottom",
      end: "+=100%",
    },
    y: '100%',
    ease: "power4.inOut",
  });
