export function hitTemplate(hit) {
  return `
  
    <div class="hit">
      <div class="hit-image item-2" >
       <img class="img-responsive" src="https://storage.cloud.google.com/deeplinq-cloud/${
         hit.name
       }">
      </div>
      <div class="hit-content">
      <div>
          <div class="hit-name"><a data-toggle="modal" data-target="#myModal" href="#" >${
            hit._highlightResult.Title.value
          }</a><input class="checkbox right-side" type="checkbox" >
          
          </div>
          <div class="hit-description">
          <div class="hit-Publications"><span class="head">Publications:</span> ${
            hit._snippetResult.Publications.value
          }</div>
          <div class="hit-Inventors"><span class="head">Inventors:</span> ${
            hit.Inventors
          }</div>
          
          <div class="hit-Representative"><span class="head">objectID:</span> ${
            hit.objectID
          }<div>
          <div class="hit-Representative"><span class="head">Representative:</span> ${
            hit.Representative
          }<div>
          
          <div class="hit-IPC"><span class="head">Applicants:</span> ${
            hit.Applicants
          }</div>
          <div class="hit-IPC"><span class="head">IPC:</span> ${hit.IPC}</div>
          <div class="hit-CPC"><span class="head">CPC:</span>  ${hit.CPC}</div>
        </div>
        <!--<div class="hit-price">${hit.Representative}</div>-->
        
      </div>
    </div>
    
  `;
}
