var fileList = [];

function random_color() {
    var o = Math.round, r = Math.random, s = 110;b=145;
    return 'rgb(' + o(r()*s+b) + ',' + o(r()*s+b) + ',' + o(r()*s+b) + ')';
}

function createItem(imgFile){
   var iDiv = document.createElement('div');
   iDiv.className = "item";
   icDiv = document.createElement('div');
   icDiv.className = "item-content";
   var imgUrl = URL.createObjectURL(imgFile);
   var img = document.createElement('img');
   img.src = imgUrl;
   icDiv.appendChild(img);
   icDiv.align = "middle";
   iDiv.appendChild(icDiv);
   return iDiv;
}

function create(images, parent, baseMuuri, color){
    var gridDiv = document.createElement('div');
    gridDiv.className = "grid";
    parent.appendChild(gridDiv);
    gridContent = document.createElement('div');
    gridContent.className = "grid-content";
    gridDiv.appendChild(gridContent);
    gridContent.style.backgroundColor = color;    
    const grid = new Muuri(gridContent, {
        items: ".item",
        dragEnabled: true, 
        dragSort: function (){return muuris},
        dragContainer:document.body,
        visibleStyles:{
            background: color,  
            border: color
        }
    });
    grid.on('dragReleaseEnd', function (item) {
        item.getElement().style.width = '';
        item.getElement().style.height = '';
        muuris.forEach(function (grid){
            grid.refreshItems();
        })
        baseMuuri.refreshItems().layout();
        }
    )
    for (var i = 0; i < images.length; i++){
        iDiv = createItem(images[i]);
        grid.add(iDiv);
        grid.refreshItems()
    }
    return [grid, gridDiv];
}

function onSubmit(evnt) {
    evnt.preventDefault();
    var a = create(fileList, baseGridDiv, baseMuuri, random_color());
    var grid = a[0];
    var gridDiv = a[1];
    baseMuuri.add(gridDiv);
    muuris.push(grid);
    var images = document.querySelectorAll('.item-content img');
    for (var i = 0; i < images.length; i++) {
        console.log('blocking default image drag'); 
        images[i].addEventListener('dragstart', function (e) {
        e.preventDefault();
    }, false);
    }
}

var body = document.getElementsByClassName("drag-area")[0];
var baseGridDiv = document.createElement('div');
baseGridDiv.className = "base";
body.appendChild(baseGridDiv);
var baseMuuri = new Muuri(".base" , {
    items:'.grid',  
    dragEnabled:true,
    dragContainer:baseGridDiv,
    dragStartPredicate: {
        handle: '.grid'
    },
});

var fileList = [];
var fileInput = document.getElementById('file-input');
fileInput.addEventListener('change',function (evnt) {
    fileList = [];
    for (var i =0; i < fileInput.files.length; i++){
        fileList.push(fileInput.files[i]);
    }
})

var muuris = [];
var counter = 0;
var curr_grid;
console.log('adding filecatcher');
var fileCatcher = document.getElementById('file-catcher');
fileCatcher.addEventListener('submit', onSubmit);

