

function voyagerVersion(page) {
  var embed = document.getElementById("viewer3d");

  var e = document.getElementById("v_version");
  var version = e.value;
  embed.setAttribute('resourceroot', 'data/viewers/voyager/' + version)
  document.getElementById("viewer3d").outerHTML = embed.outerHTML;
  console.log('set2');

  //window.location.href = '/' + page + '?v=' + version;
}


function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
