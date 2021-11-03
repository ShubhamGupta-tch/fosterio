let mobileBreakPoint = 650;
let tabletBreakpoint = 1024;

// Toggle Sidebar
function sidebar_toggle(type){
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');
    let footer = document.querySelector('footer');

    if(sidebar.classList.contains('sidebar-open')){
        sidebar.classList.remove('sidebar-open');
        main.classList.remove('complete-open');

        if(footer){
            footer.classList.remove('complete-open');
        }

        if(type === 'partial'){
            sidebar.classList.add('sidebar-partial');
            main.classList.add('partial-open');

            if(footer){
                footer.classList.add('partial-open');
            }
        }
    }

    else{
        sidebar.classList.add('sidebar-open');
        main.classList.add('complete-open');

        if(footer){
            footer.classList.add('complete-open');
        }

        if(type === 'partial'){
            sidebar.classList.remove('sidebar-partial');
            main.classList.remove('partial-open');

            if(footer){
                footer.classList.remove('partial-open');
            }
        }
    }

    // Closing sidebar on outoffocus on mobile
    if(screen.width <= mobileBreakPoint && sidebar.classList.contains('sidebar-open')){
        let closesidebaronmobile = document.createElement('div');
        let screenHeight = screen.height;
        let scrollHeight = document.body.scrollHeight;
        closesidebaronmobile.className = 'closesidebaronmobile';
        closesidebaronmobile.style.height = (scrollHeight < screenHeight ? screenHeight : scrollHeight) + 'px';
        document.body.appendChild(closesidebaronmobile);

        closesidebaronmobile.addEventListener('click', (e) => {
            sidebar_toggle();
        });

        closesidebaronmobile.addEventListener('touchstart', (e) => {
            sidebar_toggle();
        }, false);
    }

    else{
        document.querySelector('.closesidebaronmobile').remove();
    }
}


window.addEventListener('DOMContentLoaded', (event)=>{
    // Sidebar status to Main body
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('.main');
    let footer = document.querySelector('footer');

    if(sidebar){
        // Toggling Sidebar
        if(sidebar.classList.contains('sidebar-partial')){
            main.classList.add('partial-open');
            if(footer){
                footer.classList.add('partial-open');
            }
        }
    
        else if(sidebar.classList.contains('sidebar-open')){
            main.classList.add('complete-open');
            if(footer){
                footer.classList.add('complete-open');
            }
        }
        
    }
    // Sidebar status instantiation ends

    // Navbar on mobile Animation
    let navOnMobile = document.querySelector('.nav-on-mobile');

    if(navOnMobile){
        let min_timedelay = 0.7;
        let delay_inc = 0.1;
        let nav_children = navOnMobile.children;

        for(let li of nav_children){
            li.style.transitionDelay = `${min_timedelay}s`;
            min_timedelay += delay_inc;
        }
    }

    // If nav is fixed, push the main down

    let navs = document.querySelectorAll('nav');
    let topMargin = 0;

    navs.forEach(nav => {
        if(nav.classList.contains('fixed')){
            topMargin += nav.offsetHeight;
        }
    })

    if(main){
        main.style.paddingTop = `${topMargin}px`;
    }
    
    // 0.5s ease all
    if(sidebar){
        sidebar.style.paddingTop = `${topMargin}px`;
        // 0.5s all ease
    }


    // Exit sidebar on mobile
    if(document.scrollingElement.clientWidth < mobileBreakPoint){
        let sidebar_elements = document.querySelectorAll('.sidebar-element');

        sidebar_elements.forEach(sidebar_element => {
            sidebar_element.addEventListener('click', e => {
                sidebar_toggle();
            })
        })
    }

    // Dropdown
    
})


// Show DropDown

function dropDownHover(dropdown, dropdown_options){

    dropdown.addEventListener('mouseleave', (e) => {
        dropdown_options.classList.remove('dropdown-show');
    })

    dropdown_options.classList.add('dropdown-show');
}

// Register Dropdown on all dropdowns
function registerDropDown(){
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        let dropdown_options = dropdown.querySelector('.dropdown-options');

        dropdown.addEventListener('mouseenter', (e) => {
            dropDownHover(dropdown, dropdown_options);
        })


    })
}

// Toggle Navigation bar on mobile
function navToggle(){
    let nav = document.querySelector('.nav-on-mobile');

    if(nav.classList.contains('nav-on-mobile-open')){
        nav.classList.remove('nav-on-mobile-open');
    }

    else{
        nav.classList.add('nav-on-mobile-open');
    }
}


// Carousel
function dimentional_carousel(){
    document.querySelectorAll('.dimentional-carousel').forEach(carousel => {
        let items = carousel.querySelectorAll('.carousel-item');

        let middle_index = items.length%2 == 0 ? (items.length-2)/2 : (items.length-1)/2;

        let min_scale = 0.9 - (0.1*(items.length-1)/2); // Black
        let translate_inc = 40; // In %    Orange/10
        let translate_scale = 2; // Goes in the power    Blue
        let translate_scale_base = 1.3;     // Red

        let dull_strength = 0.1;

        let scale_inc = (1 - min_scale)/middle_index;

        for(let i = 0; i <= middle_index; i++){
            // From Left
            items[i].style.transform = `scale(${min_scale + i*scale_inc}) translateX(${Math.pow((middle_index-i), Math.pow(translate_scale_base, translate_scale))*translate_inc}%)`;
            items[i].style.zIndex = `${i - middle_index}`;
            items[i].style.filter = `brightness(${1 - ((middle_index - i)*dull_strength)/middle_index})`;

            // From right
            items[items.length - 1 - i].style.transform = `scale(${min_scale + i*scale_inc}) translateX(${-1 * Math.pow((middle_index-i), Math.pow(translate_scale_base, translate_scale))*translate_inc}%)`;
            items[items.length - 1 - i].style.zIndex = `${i - middle_index}`;
            items[items.length - 1 - i].style.filter = `brightness(${1 - ((middle_index - i)*dull_strength)/middle_index})`;
        }
    });
}