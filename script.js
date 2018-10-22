function random_color() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}
function createItem(n, color){
   var iDiv = document.createElement('div');
   iDiv.className = "item";
   icDiv = document.createElement('div');
   icDiv.className = "item-content";
   icDiv.style.background = color;
   iDiv.appendChild(icDiv);
   return iDiv;
}
function create(parent, color){
    var gridDiv = document.createElement('div');
    gridDiv.className = "grid";
    parent.appendChild(gridDiv);
    gridContent = document.createElement('div');
    gridContent.className = "grid-content";
    gridDiv.appendChild(gridContent);
    const grid = new Muuri(gridContent, {
        items: ".item",
        dragEnabled: true, 
        dragSort: function (){return muuris},
        dragContainer:document.body,
    });
    for (var i = 0; i < Math.random()*40 ; i++) {
        iDiv = createItem(i, color);
        grid.add(iDiv);
        var headerDiv = document.createElement('div');
        headerDiv.className = "subheader";
        gridDiv.appendChild(headerDiv);

    }
    return [grid, gridDiv];
}

var body = document.getElementsByTagName("body")[0];
var muuris = [];
var curr_grid;
var gridDiv;    
var baseGridDiv = document.createElement('div');
baseGridDiv.className = "base";
body.appendChild(baseGridDiv);
var baseMuuri = new Muuri(".base" , {
    items:'.subheader',  
    dragEnabled:true,
    dragContainer:baseGridDiv,
    dragStartPredicate: {
        handle: '.subheader'
    },
});
    
for (var i=0; i<20; i++){
    var a = create(baseGridDiv, random_color());
    curr_grid = a[0];
    gridDiv = a[1];
    baseMuuri.add(gridDiv); 
    console.log(i);
    muuris.push(curr_grid); 
}
for (var j=0; j<20; j++){
    console.log(muuris)
    muuris[j].dragSort = function (){return muuris};    
}