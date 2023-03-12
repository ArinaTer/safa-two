import imagesLoaded from "imagesloaded";
import * as myFunctions from "./modules/functions.js";
import * as bootstrap from "bootstrap";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin.js";
import { SplitText } from "gsap/SplitText.js";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import SmoothScroll from "smoothscroll-for-websites";
import Swiper, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
  Thumbs,
  Controller,
} from "swiper";
import lightGallery from "lightgallery";
import lgVideo from "lightgallery/plugins/video/lg-video.min.js";
import lgThumbnail from "lightgallery/plugins/thumbnail/lg-thumbnail.min.js";
import lgMediumZoom from "lightgallery/plugins/mediumZoom/lg-medium-zoom.min.js";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MorphSVGPlugin,
  SplitText,
  DrawSVGPlugin,
  CSSRulePlugin
);

myFunctions.isWebp();
window.bootstrap = bootstrap;
ScrollTrigger.saveStyles(
  ".main-nav__menu, .main-nav__burger-line_mid, .main-nav__burger-line_top, .main-nav__burger-line_bot, .menu__item, .panel, .main-key-features, .main-nav, .panel2 .main-about__container, .main-about__offers, .main-about__text, .main-about__info, #main-about__title, .main-about__clouds, .main-abot__top, .main-about__center .main-about__bottom, .main-brochure__img-top, .main-brochure__container, .main-location__list, .main-location__container, .main-location__item-wrapper-anim, .main-location__item-wrapper-anim-2"
);

// Preload transform

setTimeout(function () {
  gsap.to(document.querySelector(".preload"), {
    opacity: 0,
    scale: 0,
  });
  document.body.classList.add("loaded");
}, 5000);

// lightGallery

const lg = document.querySelectorAll(".lg-list");
lg.forEach((item) => {
  lightGallery(item, {
    plugins: [lgVideo, lgThumbnail],
    videojs: true,
    licenseKey: "your_license_key",
    selector: ".lg-item",
    mode: "lg-slide",
    speed: 800,
    loop: false,
    counter: false,
    download: false,
    thumbnail: true,
    mobileSettings: {
      showCloseIcon: true,
    },
  });
});

//Pop-up-modal

const seconds = 40000;
const timer = setTimeout(function () {
  const myModal = new bootstrap.Modal(document.getElementById("popupModal"));
  myModal.show();
}, seconds);
const modal = document.querySelectorAll(".modal");
modal.forEach(function (el) {
  el.addEventListener("show.bs.modal", function () {
    clearTimeout(timer);
  });
});
var mSuc = new URLSearchParams(window.location.search).get("success");
if (mSuc) {
  if ("1" === mSuc) new $i(document.getElementById("thankYouModal"), {}).show();
  history.pushState({}, null, location.href.split("?")[0]);
}

SmoothScroll({
  animationTime: 2000,
  stepSize: 80,
  keyboardSupport: true,
  arrowScroll: 100,
  touchpadSupport: true,
});

ScrollTrigger.matchMedia({
  all: function () {
    //Navbar

    let bodyOverlay = document.createElement("div");
    bodyOverlay.classList.add("body-overlay");
    document.body.append(bodyOverlay);

    gsap.to(".main-nav", { opacity: 1, delay: 5, yPercent: 10 });

    const tlMenu = gsap.timeline({ paused: true });
    tlMenu
      .to(".main-nav__menu", { yPercent: 60, opacity: 1 })
      .to(".body-overlay", { visibility: "visible", autoAlpha: 1 }, 0)
      .to(".main-nav__burger-line_top", { y: 7 }, 0)
      .to(".main-nav__burger-line_bot", { y: -14 }, 0)
      .to(".main-nav__burger-line_top", { rotate: 45 }, 0.5)
      .to(".main-nav__burger-line_bot", { rotate: -45 }, 0.5)
      .from(".menu__item", { autoAlpha: 0, stagger: 0.05 }, 0.6);

    const btnToggler = document.querySelector(".btn-toggler");
    btnToggler.addEventListener("click", toggleMenu);
    document
      .querySelector(".body-overlay")
      .addEventListener("click", toggleMenu);
    function toggleMenu() {
      tlMenu.reversed()
        ? tlMenu.timeScale(1).play()
        : tlMenu.timeScale(2).reverse();
      btnToggler.classList.toggle("open");
      document.querySelector(".main-nav").classList.toggle("show");
    }
    tlMenu.reverse();

    gsap.fromTo(".preload__row", { scale: 0.5 }, { scale: 1, duration: 6 });

    // Pagination
    const navLinks = gsap.utils.toArray(".pagination__list_item");

    const panels = gsap.utils.toArray(".pagination__item");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 50%",

        onEnter: () => {
          navLinks.forEach((e) => {
            e.classList.remove("active");
          });
          navLinks[i].classList.add("active");
        },
        onEnterBack: () => {
          navLinks.forEach((e) => {
            e.classList.remove("active");
          });
          navLinks[i].classList.add("active");
        },
      });
    });

    // Preload svg animation

    const linesGroupFrom = document.querySelectorAll(".svg-animation-1 path");
    const linesGroupTo = document.querySelectorAll(".svg-animation-2 path");

    for (let i = 0; i < linesGroupFrom.length; i++) {
      gsap.to(linesGroupTo[i], {
        morphSVG: linesGroupFrom[i],
        repeat: -1,
        rotate: 15,
        scale: 1,
        duration: 20,
        yoyo: true,
      });
      gsap.to(linesGroupFrom[i], {
        morphSVG: linesGroupTo[i],
        repeat: -1,
        rotate: 15,
        scale: 1,
        duration: 20,
        yoyo: true,
      });
    }

    // Scrolldown btn

    const btn = document.getElementById("elem");

    btn.addEventListener("click", () =>
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      })
    );
  },
  // 2500 - 993
  "(max-width: 2500px) and (min-width: 993px)": function () {
    // Background gradient

    // var rule1 = CSSRulePlugin.getRule(".main__bg_banner:after");
    // gsap.from(rule1, {
    //   scrollTrigger: {
    //     trigger: ".main__banner",
    //     start: "bottom 100%",
    //     scrub: 1,
    //   },
    //   ease: "none",
    //   opacity: 1,
    // });

    var rule1 = CSSRulePlugin.getRule(".main__bg:after");

    // ScrollTrigger.create({
    //   trigger: ".pagination__item",
    //   start: "top top",
    //   end: "bottom top",
    // });

    // let tlBg = gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: ".pagination__item",
    //       start: "center center",
    //       end: "bottom top",
    //       scrub: true,
    //     },
    //   })
    //   tlBg.from(rule1, {
    //     opacity: 0,
    //     delay: 1,
    //     duration: 1,
    //   })

    // About title

    const tlanimAbout = gsap.timeline({});

    tlanimAbout.from(
      "#main__banner_title-anim-1",
      { opacity: 0, delay: 4, xPercent: -100, duration: 2 },
      0.1
    );
    tlanimAbout.from(
      "#main__banner_title-anim-2",
      { opacity: 0, delay: 4, xPercent: -100, duration: 2 },
      0.3
    );

    // Location animation svg

    const tlLocation = gsap.timeline({
      scrollTrigger: {
        trigger: ".main__location",
        start: "top 75%",
      },
    });
    tlLocation.from(
      ".main__location_map path",
      {
        drawSVG: "50% 50%",
        duration: 5,
      },
      0
    );
    tlLocation.from(
      ".main__location_title",
      {
        xPercent: -100,
        duration: 2,
      },
      0
    );
    tlLocation.to(
      "#location__anim-1",
      {
        opacity: 1,
        duration: 5,
      },
      1
    );
    tlLocation.to(
      "#location__anim",
      {
        opacity: 1,
        duration: 5,
      },
      1.5
    );
    tlLocation.to(
      "#location__markers",
      {
        opacity: 1,
        duration: 5,
      },
      1.5
    );

    // Location animation

    const locAnim = document.querySelectorAll(".main__location_map__text span");

    gsap.utils.toArray(locAnim).forEach(function (elem) {
      tlLocation.from(
        locAnim,
        {
          duration: 1,
          scaleY: 0,
          opacity: 0,
        },
        1.5
      );
      tlLocation.to(
        locAnim,
        {
          duration: 1,
          scaleY: 1,
          opacity: 1,
        },
        1.5
      );
    });

    // Location animation svg

    MorphSVGPlugin.convertToPath("#location__anim circle");

    const linesGroupFrom1 = document.querySelectorAll("#location__pulse-2");
    const linesGroupFrom2 = document.querySelectorAll("#location__pulse-1");

    for (let i = 0; i < linesGroupFrom1.length; i++) {
      gsap.utils.toArray(linesGroupFrom1[i]).forEach(function (elem) {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: ".main__location",
            start: "top 75%",
          },
          morphSVG: linesGroupFrom2[i],
          repeat: -1,
          duration: 2,
          yoyo: true,
        });
      });
    }

    // About animation svg

    const linesGroupFromAbout = document.querySelectorAll(
      ".svg-animation-3 path"
    );
    const linesGroupToAbout = document.querySelectorAll(
      ".svg-animation-4 path"
    );

    for (let i = 0; i < linesGroupFromAbout.length; i++) {
      gsap.to(linesGroupFromAbout[i], {
        morphSVG: linesGroupToAbout[i],
        repeat: -1,
        rotate: 15,
        scale: 1,
        duration: 15,
        yoyo: true,
      });
      gsap.to(linesGroupToAbout[i], {
        morphSVG: linesGroupFromAbout[i],
        repeat: -1,
        rotate: 15,
        scale: 1,
        duration: 15,
        yoyo: true,
      });
    }

    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: ".main__about",
        start: "top 100%",
        scrub: true,
      },
    });
    tlAbout.from(
      ".main__about_img__item",
      {
        scale: 0.5,
      },
      0
    );

    let tlAnimText = gsap.timeline({
      scrollTrigger: {
        trigger: ".pagination__item",
        toggleActions: "restart pause pause pause",
      },
    });

    let split = new SplitText(".split-text", {
      type: "lines",
      linesClass: "line-wrap",
    });

    tlAnimText.from(split.lines, {
      stagger: {
        from: "start", //try "center" and "edges"
        each: 0.05,
      },
    });

    const tlAboutTitle = gsap.timeline({
      scrollTrigger: {
        trigger: ".main__about",
        start: "top 75%",
      },
    });
    tlAboutTitle.from(
      ".main__about_title",
      {
        xPercent: -100,
        duration: 2,
      },
      0
    );
    tlAboutTitle.from(
      ".main__about_headline_bg",
      {
        opacity: 0,
        duration: 3,
      },
      1
    );

    ScrollTrigger.create({
      trigger: ".main__about",
      start: "top top",
      pin: ".main__about",
      end: "bottom top",
      pinSpacing: false,
    });

    let tlAboutAnim = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main__about",
          start: "center center",
          pin: true,
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".main__about_body", {
        opacity: 0,
        delay: 1,
        duration: 1,
      })
      .fromTo(
        ".main__about_forms",
        {
          opacity: 0,
          y: 100,
        },
        { opacity: 1, y: -100, duration: 1 }
      );

    // main amenities

    const tlAmen = gsap.timeline({
      scrollTrigger: {
        trigger: ".main__amenities",
        start: "top 100%",
        scrub: true,
      },
    });
    tlAmen.from(
      ".main__amenities_img",
      {
        scale: 0.7,
      },
      0
    );

    // main forest

    const tlforest= gsap.timeline({
      scrollTrigger: {
        trigger: ".main__forest",
        start: "top 100%",
        scrub: true,
      },
    });
    tlforest.from(
      ".main__forest_img",
      {
        scale: 0.7,
      },
      0
    );
  },
  // 992 - 769
  "(max-width: 992px) and (min-width: 769px)": function () {},
  // 768 - 577
  "(max-width: 768px) and (min-width: 577px)": function () {},
  // 576 - 320
  "(max-width: 576px) and (min-width: 320px)": function () {},
});
// Swiper interior
document.querySelectorAll('.main__floorplans .swiper').forEach(function (el, index) {
  const swiper = new Swiper(el, {
      modules: [Navigation, EffectFade],
      // grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      // effect: "fade",
      // Navigation arrows
      navigation: {
          prevEl: '.main__floorplans .forSwiper .floor-btn-prev',
          nextEl: '.main__floorplans .forSwiper .floor-btn-next',
      },
  });
});
