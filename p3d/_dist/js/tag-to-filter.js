/* 
HTML structure:
<ul id="filterList">
  <li>
    <div data-tag-to-facet="{facetName}">
      <span>item1</span> <span>item2</span>
    </div>
  </li>
</ul> 

<div id="facetsList"></div>

-------------------------------------------
*/



let facets =[] // facet json
let selectedFacets =[] // facet json
let results =[] // facet json

//get Raw html
let allContainerElems = document.querySelectorAll('[data-tag-to-facet]')

let allFacetsNames = []
allContainerElems.forEach(listItem => {
  let att = listItem.getAttribute('data-tag-to-facet')
  allFacetsNames.push(listItem.getAttribute('data-tag-to-facet'))
  
});

uniqueArr(allFacetsNames).forEach(fName => {
  facets.push(
    {
      "facetName": fName,
      "faceItemsRaw": [],
      "faceItems": []
    }
  )

  selectedFacets.push(
    {
      "facetName": fName
    }
);
});




//console.log(allContainerElems);
facets.forEach(facetItem => {
  allContainerElems.forEach(containerItem => {
    if (facetItem.facetName == containerItem.getAttribute('data-tag-to-facet')) {
      for (let item of containerItem.getElementsByTagName('span')) {
        //console.log(item.innerHTML);
        facetItem.faceItemsRaw.push(item.innerHTML)
      }
    }


  });

  facetItem.faceItems = uniqueArr(facetItem.faceItemsRaw).sort()
  delete facetItem.faceItemsRaw

});




// generate facets
let facetsHTML = ''
facets.forEach(facet => {
  facetsHTML += '<div class="">'
  facetsHTML += '<strong>'
  facetsHTML += facet.facetName
  facetsHTML += '</strong>'
  facetsHTML += '<div class="flex flex-col">'
  facet.faceItems.forEach((fItem, index) => {
    facetsHTML += '<div class="text-sm">'
    facetsHTML += '<input type="checkbox" id="'+facet.facetName+index+'" name="'+facet.facetName+index+'" value="'+fItem+'" class="mr-1" onChange="handleFacetedSearch()" data-facetName="'+facet.facetName+'">'
    facetsHTML += '<label for="'+facet.facetName+index+'">'
    facetsHTML += fItem
    facetsHTML += '</label>'
    facetsHTML += '</div>'
  });

  facetsHTML += '</div>'
  facetsHTML += '</div>'
  
});

document.getElementById('facetsList').innerHTML = facetsHTML



// get results
let allresults = document.getElementById('filterList').children

for (let result of allresults) {
  if (result.id !== 'surprise') {
    let rItem = {}
    rItem.id = result.id
    rItem.meta = []
  
    facets.forEach(facet => {
      rItem.meta[facet.facetName] =[]
  
     let metadata1 = result.querySelector('[data-tag-to-facet="'+facet.facetName+'"]')
      for (let metadataItem of metadata1.children) {
        rItem.meta[facet.facetName].push(metadataItem.innerHTML)
      }
    });
    
    results.push(rItem)
  }
}






function handleFacetedSearch() {

  let allCheckboxes = document.querySelectorAll('[data-facetName]')
  let leastOne = false
  allCheckboxes.forEach(cBoxItem => {
    if (cBoxItem.checked) {
      leastOne = true
    };
  });
  console.log(leastOne);




// get all results  
  let allresults = document.getElementById('filterList').children
  for (let result of allresults) {


    if (leastOne) {

      let showItem = false
      result.classList.remove('flex');
      result.classList.add('hidden');
      
      results.forEach(resultItem => {
        if (result.id == resultItem.id) {
          let allCheckboxes = document.querySelectorAll('[data-facetName]')
          allCheckboxes.forEach(cBoxItem => {
            if (cBoxItem.checked) {
              if (resultItem.meta[cBoxItem.getAttribute('data-facetName')].includes(cBoxItem.value)) {
                showItem = true;
              }
            }
          });
        }
      });
    
      if (showItem) {
        console.log(result);
        result.classList.add('flex');
        result.classList.remove('hidden');
      }
  
    } else {
      result.classList.add('flex');
      result.classList.remove('hidden');
    }









  }


}



function uniqueArr(a) {
  return a.sort().filter(function(value, index, array) {
      return (index === 0) || (value !== array[index-1]);
  });
}


function handleClass(id, action, className) {
  if (action == 'add') {
      document.getElementById(id).classList.add(className);
  } else if (action == 'remove') {
      document.getElementById(id).classList.remove(className);
  }
}