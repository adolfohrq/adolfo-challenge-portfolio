(function ($) {
    "use strict";

    $(document).ready(function () {
        $('#page-content').fadeIn(0);

        /*=============================
        Mobile Menu - JS
        ===============================*/


        $(".mobile-menu-control-bar").on("click", function () {
            $(".mobile-menu-overlay").addClass("show");
            $(".navbar-main").addClass("show");
        });


        $(".mobile-menu-overlay").on("click", function () {
            $(".mobile-menu-overlay").removeClass("show");
            $(".navbar-main").removeClass("show");
        });


        $(".navbar-main .nav-link").on("click", function () {
            $(".mobile-menu-overlay").removeClass("show");
            $(".navbar-main").removeClass("show");
        });


        $('.nav-link').on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href'); 
            var offset = $(target).offset().top - 100; 

            $('html, body').animate({
                scrollTop: offset
            }, 600); 
        });


        /*=============================
        Project PopUp - JS
        ===============================*/

        $(".projects-grid").magnificPopup({
            delegate: ".gallery-popup",
            type: "image",
            gallery: {
                enabled: true,
            }
        });

        /*=============================
        Contact PopUp - JS
        ===============================*/

        $(document).ready(function () {
            const contactPopup = $('#contact-popup');
            const closePopup = $('.close-popup');
            const contactForm = $('#contact-form');
            const copyButton = $('.btn-email');


            copyButton.on("click", function (e) {
                e.preventDefault();
                contactPopup.fadeIn();
            });


            closePopup.on("click", function () {
                contactPopup.fadeOut();
            });


            $(window).on("click", function (event) {
                if ($(event.target).is(contactPopup)) {
                    contactPopup.fadeOut();
                }
            });


            contactForm.on("submit", function (e) {
                e.preventDefault();

                const name = $('#name').val().trim();
                const email = $('#email').val().trim();
                const subject = $('#subject').val().trim();
                const message = $('#message').val().trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                $('.error-message').remove();


                let isValid = true;

                if (name === "") {
                    $('#name').after('<span class="error-message">Por favor, preencha o campo de nome.</span>');
                    isValid = false;
                } else if (name.length > 50) {
                    $('#name').after('<span class="error-message">O nome deve ter no máximo 50 caracteres.</span>');
                    isValid = false;
                }


                if (subject === "") {
                    $('#subject').after('<span class="error-message">Por favor, preencha o campo de assunto.</span>');
                    isValid = false;
                } else if (subject.length > 100) {
                    $('#subject').after('<span class="error-message">O assunto deve ter no máximo 100 caracteres.</span>');
                    isValid = false;
                }


                if (email === "" || !emailPattern.test(email)) {
                    $('#email').after('<span class="error-message">Por favor, insira um endereço de e-mail válido.</span>');
                    isValid = false;
                }

                if (message === "") {
                    $('#message').after('<span class="error-message">Por favor, preencha o campo de mensagem.</span>');
                    isValid = false;
                }

                if (isValid) {
                    alert("Mensagem enviada com sucesso!");
                    contactPopup.fadeOut();
                    contactForm[0].reset();
                }
            });
        });


        /*=============================
        Project Tabs - JS
        ===============================*/

        const tabButtons = document.querySelectorAll('.tab-btn');
        const projects = document.querySelectorAll('.projects-item'); 

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projects.forEach(project => {
                    if (category === 'all' || project.getAttribute('data-category') === category) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });

        /*=============================
        Filtragem de Projetos - JS
        ===============================*/

        function filterProjects(category) {
            $('.projects-item').hide(); 
            if (category === 'all') {
                $('.projects-item').fadeIn(); 
            } else {
                $('.projects-item[data-category="' + category + '"]').fadeIn(); 
            }
        }

        $(".projects-tabs .tab-btn").on("click", function () {
            var category = $(this).data('category');
            $(".projects-tabs .tab-btn").removeClass('active');
            $(this).addClass('active');
            filterProjects(category);
        });

        $(".projects-tabs-mobile .filter-text").on("click", function () {
            var category = $(this).data('category');
            $(".projects-tabs-mobile .filter-text").removeClass('active');
            $(this).addClass('active');
            filterProjects(category);
        });

        /*=============================
        Carousel Projetos - JS
        ===============================*/

        $('.projects-grid').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 2, 
            infinite: false, 
            arrows: false, 
            dots: true, 
            responsive: [
                {
                    breakpoint: 768, 
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1, 
                        rows: 2,
                        dots: true, 
                        arrows: false
                    }
                }
            ]
        });
    });
})(jQuery);
