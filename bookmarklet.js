function changeEmail () {
  let select = document.getElementById('email-generator-select');
  let copyInput = document.getElementById('email-generator-emailtocopy');
  copyInput.value = select.options[select.selectedIndex].text;
}

(function () {
  function addRequireScript (url, version) {
    const src = version ? url + '?v=' + version : url;
    var script = Array.apply(null, document.querySelectorAll('script')).find(function (_) { return _.src === src });
    if (!script) {
      let head = document.getElementsByTagName('head')[0];
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      head.appendChild(script);
    }
  }

  function addRequireCss (url, version) {
    const href = version ? url + '?v=' + version : url;
    var link = Array.apply(null, document.querySelectorAll('script')).find(function (_) { return _.href === href });
    if (!link) {
      let head = document.getElementsByTagName('head')[0];
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
      link.media = 'all';
      head.appendChild(link);
    }
  }

  function listGeneration (firstname, lastname, symbols, domain) {
    let prefixValidator = input => input.replace(/[^a-z0-9!#$%&'*+-/=?^_`{|}~]/gi, '');
    prefixValidator(firstname);
    prefixValidator(lastname);
    emails = [];
    symbols.split('').forEach((symbol) => {
      emails.push(`${firstname}${symbol}${lastname}@${domain}`);
      emails.push(`${lastname}${symbol}${firstname}@${domain}`);
      emails.push(`${firstname.charAt(0)}${symbol}${lastname}@${domain}`);
      emails.push(`${lastname}${symbol}${firstname.charAt(0)}@${domain}`);
    })
    return emails.map((e) => '<option>' + e + '</option>');
  }

  var start = function () {
    addRequireCss('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.css');
    addRequireScript('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.5/sweetalert2.min.js');

    swal({
      title: '✏️ Email Generator',
      type: 'info',
      showCancelButton: true,
      cancelButtonText: 'Close',
      confirmButtonText: 'Go!',
      html: 'Firstname <input id="email-generator-firstname" type="text" class="swal2-input" placeholder="Firstname" autofocus>' +
        'Lastname <input id="email-generator-lastname" type="text" class="swal2-input" placeholder="Lastname">' +
        'Symbols <input id="email-generator-symbols" type="text" class="swal2-input" value="!#$%&*+-/=?^_`{|}~" placeholder="!#$%&*+-/=?^_`{|}~">' +
        'Domain <input id="email-generator-domain" type="text" class="swal2-input" value="' + document.domain + '" placeholder="' + document.domain + '">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            document.getElementById('email-generator-firstname').value,
            document.getElementById('email-generator-lastname').value,
            document.getElementById('email-generator-symbols').value,
            document.getElementById('email-generator-domain').value
          ]);
        })
      }
    }).then(function (data) {
      swal({
        title: 'Success!',
        type: 'success',
        confirmButtonText: 'Copy and Close',
        html: 'Select and update it as you wish' +
          '<select id="email-generator-select" class="swal2-input" onchange="changeEmail()">' +
          listGeneration(data[0].toLowerCase(), data[1].toLowerCase(), data[2], data[3].toLowerCase()) +
          '</select>' +
          '<input id="email-generator-emailtocopy" type="text" class="swal2-input" placeholder="email">',
        preConfirm: function () {
          return new Promise(function (resolve) {
            document.getElementById('email-generator-emailtocopy').select();
            document.execCommand('copy');
            resolve();
          });
        }
      }).then(function () {})
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal('Cancelled', 'Process ended :)', 'error');
      }
    })
  }
})();
