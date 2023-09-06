console.log("js file");


function findInList(stringToFind, idOfResultList) {


    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById('myInput');
    // filter = input.value.toUpperCase();
  
    let elements2Filter = document.querySelectorAll('#'+idOfResultList+' > *')
  
  
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < elements2Filter.length; i++) {
      let showItems = false;
      let inner = elements2Filter[i].getElementsByClassName('tag')
  
  
      for (var j = 0; j < inner.length; j++) {
        txtValue = inner[j].innerHTML
  
        if (txtValue.toUpperCase().indexOf(stringToFind.toUpperCase()) > -1) {
          showItems = true;
        }
  
      }
  
      // hide items if found
      if (showItems) {
        elements2Filter[i].style.display = "";
      } else {
        elements2Filter[i].style.display = "none";
      }
  
  
    }
  }
  
  
  function clearList(idOfResultList) {
    let elements2Filter = document.querySelectorAll('#'+idOfResultList+' > *')
    for (i = 0; i < elements2Filter.length; i++) {
      elements2Filter[i].style.display = "";
      }
  }
  
  
  
  let createTageButtons = function (idOfResultList) {
    let tagNames = [];
  
    // find all the tags items
    let elements2Filter = document.getElementsByClassName('tag')
    for (i = 0; i < elements2Filter.length; i++) {
      tagNames.push(elements2Filter[i].innerHTML)
    }
  
    // get unique list of tags
    let uniqueTags = [...new Set(tagNames)];
    uniqueTags.sort()
  
  
    // create buttons
    if (uniqueTags.length > 0) {
      let output = 'Filter op <br>';
      uniqueTags.forEach(item => output+= '<button class="mButtonClean" onclick="findInList(\''+item+'\', \''+idOfResultList+'\')">'+item+'</button><br>');
      output+= '<br><button type="button" name="button" onclick="clearList(\''+idOfResultList+'\')"">Alle resultaten</button>';
      document.getElementById('filteronList').innerHTML =  output;
    }
  
  
  }
  
  createTageButtons('list1');
  
  
  // Bind function to onclick event for checkbox
  document.getElementById('langSwitch').onchange = function() {
      // access properties using this keyword
      if ( this.checked ) {
          window.location.href = '/en';
  
      } else {
          window.location.href = '/';
      }
  };
  