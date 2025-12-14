$(document).ready(function () {
    // Load navigation
    // Use .get() to fetch the content, then .replaceWith() to swap the placeholder
    $.get("nav.html", function (data) {
        $("#sidebar-placeholder").replaceWith(data);

        // The rest of the setup code needs to run after the nav is loaded
        // Set the current page link to active
        var current = window.location.pathname.split("/").pop();
        if (current === "") {
            current = "index.html";
        }

        $('.tm-nav a[href="' + current + '"]').addClass('current');

        // Special case for single-page nav links on index.html
        if (current === "index.html") {
            $('.tm-nav a[href="index.html#home"]').addClass('current');
            $("#tm-main-nav").singlePageNav({
                filter: ':not(.external)',
                preventDefault: false
            });
        }

        // Mobile menu toggle
        $(".navbar-toggler").on("click", function (e) {
            $(".tm-sidebar").toggleClass("show");
            e.stopPropagation();
        });

        // Close mobile menu when clicking outside
        $("html").click(function (e) {
            var sidebar = document.getElementById("tm-sidebar");
            if (sidebar && !sidebar.contains(e.target)) {
                $(".tm-sidebar").removeClass("show");
            }
        });

        // Close mobile menu when a link is clicked
        $("#tm-sidebar .nav-link").click(function (e) {
            $(".tm-sidebar").removeClass("show");
        });

        // Update copyright year
        const currentYear = new Date().getFullYear();
        $('#copyright').html(`Copyright ${currentYear} Junfeng Guan`);

        // Isotope Gallery
        var itemSelector = ".tm-gallery-item";
        var responsiveIsotope = [[480, 4], [720, 6], [1920, 9]];
        var itemsPerPageDefault = 12;
        var itemsPerPage = defineItemsPerPage();
        var currentNumberPages = 1;
        var currentPage = 1;
        var currentFilter = '*';
        var filterValue = "";
        var pageAttribute = 'data-page';
        var pagerClass = 'tm-paging';
        var $container = $('.tm-gallery').isotope({
            itemSelector: itemSelector
        });

        $container.imagesLoaded().progress(function () {
            $container.isotope('layout');
        });

        function changeFilter(selector) { $container.isotope({ filter: selector }); }

        function goToPage(n) {
            currentPage = n;
            var selector = itemSelector;
            var exclusives = [];

            if (currentFilter != '*') {
                exclusives.push(selector + '.' + currentFilter);
            }

            filterValue = exclusives.length ? exclusives.join('') : '*';

            var wordPage = currentPage.toString();
            filterValue += ('.' + wordPage);
            changeFilter(filterValue);
        }

        function defineItemsPerPage() {
            var pages = itemsPerPageDefault;

            for (var i = 0; i < responsiveIsotope.length; i++) {
                if ($(window).width() <= responsiveIsotope[i][0]) {
                    pages = responsiveIsotope[i][1];
                    break;
                }
            }
            return pages;
        }

        function setPagination() {
            var SettingsPagesOnItems = function () {
                var itemsLength = $container.children(itemSelector).length;
                var pages = Math.ceil(itemsLength / itemsPerPage);
                var item = 1;
                var page = 1;
                var selector = itemSelector;
                var exclusives = [];

                if (currentFilter != '*') {
                    exclusives.push(selector + '.' + currentFilter);
                }

                filterValue = exclusives.length ? exclusives.join('') : '*';

                $container.children(filterValue).each(function () {
                    if (item > itemsPerPage) {
                        page++;
                        item = 1;
                    }
                    wordPage = page.toString();

                    var classes = $(this).attr('class').split(' ');
                    var lastClass = classes[classes.length - 1];

                    if (lastClass.length < 4) {
                        $(this).removeClass();
                        classes.pop();
                        classes.push(wordPage);
                        classes = classes.join(' ');
                        $(this).addClass(classes);
                    } else {
                        $(this).addClass(wordPage);
                    }
                    item++;
                });
                currentNumberPages = page;
            }();

            var CreatePagers = function () {

                var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + '"></div>') : $('.' + pagerClass);

                $isotopePager.html('');
                if (currentNumberPages > 1) {
                    for (var i = 0; i < currentNumberPages; i++) {
                        var $pager = '';

                        if (currentPage == i + 1) {
                            $pager = $('<a href="javascript:void(0);" class="active tm-paging-link" ' + pageAttribute + '="' + (i + 1) + '"></a>');
                        } else {
                            $pager = $('<a href="javascript:void(0);" class="tm-paging-link" ' + pageAttribute + '="' + (i + 1) + '"></a>');
                        }

                        $pager.html(i + 1);

                        $pager.click(function () {
                            $('.tm-paging-link').removeClass('active');
                            $(this).addClass('active');
                            var page = $(this).eq(0).attr(pageAttribute);
                            goToPage(page);
                        });
                        $pager.appendTo($isotopePager);
                    }
                }
                $container.after($isotopePager);
            }();
        }

        setPagination();
        goToPage(1);

        $('.tm-gallery-link').click(function (e) {
            var filter = $(this).data('filter');
            currentFilter = filter;
            setPagination();
            goToPage(1);
            $('.tm-gallery-link').removeClass('active');
            $(e.target).addClass('active');
        })

        /****************** Window resize ******************/

        $(window).resize(function () {
            itemsPerPage = defineItemsPerPage();
            setPagination();
            goToPage(1);
        });

        /****************** Magnific Popup ******************/

        $('.tm-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        /************** "About" Carousel *****************/

        $('.tm-carousel').slick({
            dots: true,
            infinite: false,
            arrows: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 6,
            responsive: [
                {
                    breakpoint: 2500,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 1920,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 1260,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 1125,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // Re-initialize parallax after content is loaded
        if ($('.tm-parallax').length) {
            $('.tm-parallax').parallax();
        }
    });
});