
let openedSidebar = false

$(document).ready(function () {
    // Ao clicar em um botão, torna o elemento com a classe "meu-elemento" display block
    $("#openSidebar").click(function () {
        if (!openedSidebar) {
            openedSidebar = true
            anim()
            setTimeout(() => {
                $('#openSidebar').addClass('fi-ss-x');
                $('#openSidebar').removeClass('fi-ss-menu-burger');
            }, 500);
            showOptionNameSidebar(true)
            return
        }
        openedSidebar = false
        showOptionNameSidebar(false)
        anim()
        setTimeout(() => {
            $('#openSidebar').addClass('fi-ss-menu-burger');
            $('#openSidebar').removeClass('fi-ss-x');
        }, 500);


        function anim() {
            $('#openSidebar').addClass('animate-sidbar');
            setTimeout(() => {
                $('#openSidebar').removeClass('animate-sidbar');
            }, 1000);
        }

    });
});