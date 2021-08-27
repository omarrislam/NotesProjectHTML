function getID(id){
document.getElementById('delete').value=id
console.log(id);
}

function edit(id){
   var title= document.getElementById('title'+id).innerText
   var desc = document.getElementById('desc'+id).innerText
   document.getElementById('modalTitle').value=title
   document.getElementById('modalDesc').value=desc
   document.getElementById('id').value=id
}