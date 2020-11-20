let body = document.querySelector('body')

setTimeout(function () {
    document.querySelector('.top-content__animation').classList.add('anim-start')
}, 1000)
let playRound = document.querySelectorAll('.animate-round')
for (let i = 0; i < playRound.length; i++) {
    playRound[i].addEventListener('click', function () {
        this.classList.add('move-up')
    })
}

let header = document.querySelector('header')
let sticky = header.offsetTop
document.addEventListener('scroll', stickyHeader)
document.addEventListener('DOMContentLoaded', stickyHeader)
function stickyHeader() {
    if (window.pageYOffset > 0) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
}


let showMobMenu = document.querySelector('.mobile-menu-icon')
let menu = document.querySelector('.menu')
let showUserAction = document.querySelector('.mobile-user-action')
let userActions = document.querySelector('.user-actions')
showMobMenu.addEventListener('click', function(e) {
    e.stopPropagation()
    toggleMenu(menu, userActions)
    this.classList.toggle('active')
})
showUserAction.addEventListener('click', function(e) {
    e.stopPropagation()
    toggleMenu(userActions, menu)
    showMobMenu.classList.remove('active')
})
function toggleMenu(block, closeOtherSub) {
    block.classList.toggle('mob-visible')
    if(closeOtherSub.classList.contains('mob-visible')){
        closeOtherSub.classList.remove('mob-visible')
    }
}
document.addEventListener('click', hideMenu(menu, showMobMenu))
document.addEventListener('click', hideMenu(userActions, showUserAction))

function hideMenu(sample1, sample2) {
    return function(e){
        let target = e.target
        let activeMenu = target === sample1 || sample1.contains(target)
        let activeBtn = target === sample2
        let menuIsActive = sample1.classList.contains('mob-visible')
        if (!activeMenu && !activeBtn && menuIsActive ) {
            sample1.classList.remove('mob-visible')
            if(showMobMenu.classList.contains('active')) showMobMenu.classList.remove('active')
        }
    }
}

$(function () {
    $('.utp-block').owlCarousel({
        dots: false,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 2,
                margin: 15,
                mouseDrag: true,
                touchDrag: true,
                autoplay: true,
                autoplayTimeout: 3000,
                smartSpeed: 1000,
                autoplayHoverPause: true
            },
            768: {
                items: 3,
                margin: 30,
                mouseDrag: true,
                touchDrag: true,
                autoplay: true,
                autoplayTimeout: 4000,
                smartSpeed: 2000,
                autoplayHoverPause: true
            },
            1200: {
                items: 4,
                margin: 41,
                loop: false,
                mouseDrag: false,
                touchDrag: false
            }
        }
    })
})

$(function(){
    let countRow = $('.statistics__row')
    let counter = false
    $(window).scroll(function() {
        let scroll = $(window).scrollTop() + $(window).height() - 100
        let offset = countRow.offset().top
        if (scroll > offset && counter === false) {
            countRow.addClass('in-sight')
            $('.statistics__counter').each(function () {
                $(this).prop('Counter', Math.ceil($(this).text() / 3)).animate({
                    Counter:$(this).text()
                }, {
                    duration: Math.ceil($(this).attr('data-speed')),
                    easing: 'swing',
                    step:function(now){
                        $(this).text(now.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ','))
                    }
                })
            })
            counter = true
        }
    })
})

let subscribeForm = document.querySelector('.subscribe__form')
let subscribeErrorMes = document.querySelector('.subscribe__error-mes')
let subscribeInput = document.getElementById('subscribe__email')
let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
subscribeForm.addEventListener('submit', function (event) {
    if (!emailPattern.test(subscribeInput.value)) {
        subscribeInput.classList.add('input-error')
        subscribeErrorMes.classList.add('show')
        event.preventDefault()
    }
    else {
        subscribeForm.submit()
    }
})

document.getElementById('inTop').addEventListener('click', function () {
    let scrollTime = body.clientHeight*0.7
    const totalScrollDistance = document.scrollingElement.scrollTop
    let scrollY = totalScrollDistance, oldTimestamp = null
    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / scrollTime
            if (scrollY <= 0) return document.scrollingElement.scrollTop = 0
            document.scrollingElement.scrollTop = scrollY
        }
        oldTimestamp = newTimestamp
        window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
})


let mainSubmenu = document.querySelectorAll('.submenu-tab')
for (let i = 0; i < mainSubmenu.length; i++) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mainSubmenu[i].addEventListener('click', subMenuToggle(mainSubmenu[i].closest('.menu__item'),'submenu-active','.menu-submenu__list','.menu-submenu__list li'))
    } else {
        mainSubmenu[i].closest('.menu__item').addEventListener('mouseenter', subMenuToggle(mainSubmenu[i].closest('.menu__item'),'submenu-active','.menu-submenu__list','.menu-submenu__list li'))
        mainSubmenu[i].closest('.menu__item').addEventListener('mouseleave', subMenuToggle(mainSubmenu[i].closest('.menu__item'),'submenu-active','.menu-submenu__list','.menu-submenu__list li'))
    }
}
let mobFootBtn = document.querySelectorAll('.footer__link-column')
for (let i = 0; i < mobFootBtn.length; i++) {
    mobFootBtn[i].addEventListener('click', subMenuToggle(mobFootBtn[i],'sublinks','.footer__link-list','.footer__link-list li'))
}
function subMenuToggle(clickTarget,changingClass,menuTarget,menuItemTarget) {
    return function (){
        let submenu = clickTarget.querySelector(menuTarget)
        let submenuLi = clickTarget.querySelectorAll(menuItemTarget)
        if (clickTarget.classList.contains(changingClass)) {
            clickTarget.classList.remove(changingClass)
            submenu.style.maxHeight = '0px'
        }
        else {
            for (let i = 0; i < submenuLi.length; i++) {
                let height = window.getComputedStyle(submenuLi[i], null).height
                submenu.style.maxHeight = parseInt(height) * submenuLi.length + 'px'
            }
            clickTarget.classList.add(changingClass)
        }
    }
}