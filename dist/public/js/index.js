
toastr.options = {
  backgroundColor: '#ff0000',
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-full-width',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '10000',
  extendedTimeOut: '1000',
  showEasing: 'linear',
  hideEasing: 'linear',
  showMethod: 'slideDown',
  hideMethod: 'slideUp'
};
// Verifica se o modo noturno está ativado no dispositivo
let Device_isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false

// if (localStorage.getItem('darkmod') || (localStorage.getItem('device_darkmod') === null && Device_isDarkMode)) {
//   setDarkMode()
//   $("#darkmode").prop("checked", true);
// }
$(document).ready(function () {


  $("#darkmode").change(function () {
    setDarkMode()
    if (this.checked) {
      localStorage.setItem('darkmod', true)
      localStorage.setItem('device_darkmod', true)
    } else {
      localStorage.setItem('device_darkmod', false)
      localStorage.removeItem('darkmod')
    }
    const dominioAtual = window.location.origin;
    const url = `${dominioAtual}/setdarkmode`;
    requestPost(url)
  });


});

function setDarkMode() {
  $('[data-mode]').each(function () {
    var currentMode = $(this).attr('data-mode');
    var newMode = currentMode === 'light' ? 'dark' : 'light';
    $(this).attr('data-mode', newMode);
  });
}


const myObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('scrollViewShow');
    } else {
      entry.target.classList.remove('scrollViewShow');
    }
  });
}, {
  threshold: 0.5
});

const scrollViewElements = document.querySelectorAll('.scrollView');
scrollViewElements.forEach(function (element) {
  myObserver.observe(element);
});


async function showConfirm(message, options) {
  return new Promise(resolve => {
    const types = {
      success: `bg-green-500`,
      info: `bg-blue-500`,
      warning: `bg-orange-500`,
      error: `bg-red-500`,
      default: `bg-zinc-500`,
    }
    const icons = {
      success: `fi fi-br-check`,
      info: `fi fi-br-info`,
      warning: `fi fi-br-triangle-warning`,
      error: `fi fi-br-shield-exclamation`,
      default: `hidden`,
    }
    let btn_yes = options?.type === 'success' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'
    let btn_no = options?.type !== 'success' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'

    $('#custom-confirm-modal').removeClass('hidden');

    $('#modal-close, #confirm-no').click(function () {
      $('#custom-confirm-modal').addClass('hidden');
      // limpar o html de modal-insert_html
      $('#modal-insert_html').html('')
      $('#confirm-title').removeClass(types[options?.type ?? 'default'])
      $('#confirm-bg-title').find('i').removeClass(icons[options?.type ?? 'default'])
      
      $('#confirm-yes').removeClass(btn_yes)
      $('#confirm-no').removeClass(btn_no)
      resolve(false); // Resolve com falso (cancelado)
    });

    $('#confirm-yes').addClass(btn_yes)
    $('#confirm-no').addClass(btn_no)

    if (options?.btn_yes) {
      $('#confirm-yes').text(options?.btn_yes)
    }
    if (options?.btn_no) {
      $('#confirm-no').text(options?.btn_no)
    }
    $('#confirm-yes').click(function () {
      $('#custom-confirm-modal').addClass('hidden');
      // limpar o html de modal-insert_html
      $('#modal-insert_html').html('')
      $('#confirm-bg-title').removeClass(types[options?.type ?? 'default'])
      $('#confirm-bg-title').find('i').removeClass(icons[options?.type ?? 'default'])
      
    $('#confirm-yes').removeClass(btn_yes)
    $('#confirm-no').removeClass(btn_no)
      resolve(true); // Resolve com verdadeiro (confirmado)
    });
    $('#confirm-bg-title').addClass(types[options?.type ?? 'default'])
    $('#confirm-bg-title').find('i').addClass(icons[options?.type ?? 'default'])
    $('#confirm-title').text(message); // Define a mensagem do modal
    let modaltextbg = $('#modal-text-bg')
    console.log('options?.msg;', options?.msg)
    if (options?.msg) {
      modaltextbg.removeClass('hidden')
      modaltextbg.find('textarea').val(options?.msg)
    }else {
      modaltextbg.addClass('hidden')
    }
  });
};
