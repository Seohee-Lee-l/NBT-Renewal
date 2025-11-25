$(function() {
    // MENU 열기
    $('.menuBtn .menuBtn-wrapper').on('click', function() {
        $('.menu').animate({top: 0}, 600);
    });

    // MENU 닫기
    $('.menu .menu-header i.xi-close').on('click', function() {
        $('.menu').animate({top: '-100%'}, 600);
    });

    // MERCHANDISE 슬라이드
    function setupInfiniteSlide(containerSelector) {
        const $container=$(containerSelector);
        const $ul=$container.find('ul.merchandise-slider');
        let $images=$ul.find('li');

        // 이미지 로드 후 계산
        let loadedImages=0;
        
        const totalImages=$images.length/2;

        $images.find('img').on('load', function() {
            loadedImages++;
            
            if (loadedImages===totalImages) {
                calculateAndSetSlide();
            }
        });

        function calculateAndSetSlide() {
            if ($ul.find('li').length === totalImages) {
                $ul.append($ul.html());
            }

            $images = $ul.find('li');

            let totalWidth=0;

            $images.each(function(i){
                totalWidth+=$(this).outerWidth(true);
            });

            // keyframes 생성
            const animationName='merchandiseSliderAnimation';

            const keyframes=`
                @keyframes ${animationName} {
                    0% {
                        transform:translateX(0);
                    }
                        
                    100%{
                        transform:translateX(-${totalWidth/2}px);
                    }
                }
            `;

            if (!$('#dynamic-animations').length) {
                $('head').append('<style id="dynamic-animations"></style>');
            }

            const $style=$('#dynamic-animations');

            if ($style.html().indexOf(animationName)===-1) {
                $style.append(keyframes);
            }

            $ul.css({
                'display':'flex',
                'width':'auto',
                'animation':`${animationName} 60s linear infinite`,
            });

            // 마우스 오버 일시정지
            $ul.on('mouseenter',function(){
                $(this).css('animation-play-state','paused');
            });

            $ul.on('mouseleave',function(){
                $(this).css('animation-play-state','running');
            });
        }

        // 캐시된 이미지 처리
        $images.find('img').each(function(){
            if(this.complete){ $(this).trigger('load'); }
        });
    }

    // nbt merchandise-slider에 무한 슬라이드 적용
    setupInfiniteSlide('.merchandise');

    // TOP 버튼
    $('.topBtn button').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 600);
    });

    // 현재 스크롤 위치에 따라 TOP 버튼 표시/숨기기
    $(window).on('scroll', function() {
        if ($(this).scrollTop()>300) {
            $('.topBtn').fadeIn();
        } else {
            $('.topBtn').fadeOut();
        }
    });
});