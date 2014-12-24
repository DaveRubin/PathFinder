/**
 * Created by dudi on 12/9/14.
 */
function point(x,y,parentPoint){
    this.x = x;
    this.y = y;
    this.equal = function(pt){
        return (pt.x == this.x &&  pt.y == this.y);
    };
    this.parent = (typeof parentPoint == "undefined")? null:parentPoint;
}
function PathFinder(params) {
    if (typeof params == "undefined") params = {};
    var that = this;
    var board = null;
    var all = [];
    var coords = [];
    var tmpCoords = [];
    var target  = null;
    var MAX_LIFE = (params.life)? params.life:999;
    function init(){
        all = [];
        coords = [];
        tmpCoords = [];
    }
    function color(pos){
        var posStr = pos.x+"-"+pos.y;
//            console.log(posStr);
        $("[pos="+posStr+"]").addClass("selected");
    }
    this.find = function(){
        var life = MAX_LIFE;
        while (life>0){
            // add point to coord array
            if (coords.length==0) {
                return [];
            }
            tmpCoords = [];
            function expand(coord) {
                var square = board[coord.y][coord.x];
                if (square.top)     tmpCoords.push(new point(coord.x, coord.y-1,coord));
                if (square.bottom)  tmpCoords.push(new point(coord.x, coord.y+1,coord));
                if (square.right)   tmpCoords.push(new point(coord.x+1, coord.y,coord));
                if (square.left)    tmpCoords.push(new point(coord.x-1, coord.y,coord));
            }

            function tracePath(lastPos) {
                var path = [];
                var tmpPos = lastPos;
                while (tmpPos){
                    var newObject = jQuery.extend(true, {}, tmpPos);
                    path.push(newObject);
                    tmpPos = tmpPos.parent;
                }
                //clean all junk
                init();
                return path;
            }

            for (var i = 0; i < coords.length; i++) {
                var coord = coords[i];
                // are any of the coord in the coord array is the target?
                if (coord.equal(target)){
                    return tracePath(coord);
                }
                // if not init new array
                expand(coord);
                // expand the points in coord array and store them in new array
            }
            if (tmpCoords.length ==0){
                return [];
            }
            all = all.concat(coords);
            for (var i = 0; i < all.length; i++) {
                var pnt = all[i];
                var tmpArr = [];
                for (var j = 0; j < tmpCoords.length; j++) {
                    var tmpPnt = tmpCoords[j];
                    if (!tmpPnt.equal(pnt)){
                        tmpArr.push(tmpPnt);
                    }
                }
                all.concat(tmpArr);
            }
            coords = tmpCoords;
            tmpCoords = [];
            for (var i = 0; i < all.length; i++) {
                var square = board[coord.y][coord.x];
                square.weight++;
            }
            life--;
        }
        return [];
    };
    this.resetBoard = function(){
        for (var i = 0; i < board.length; i++) {
            var line = board[i];
            for (var j = 0; j < line.length; j++) {
                line[j].weight = 0;
            }
        }
    };
    this.setBoard = function(boardInput){
        var tmpboard  = boardInput;
        board = [];
        for (var i = 0; i < boardInput.length; i++) {
            var line = boardInput[i];
            board.push([]);
            for (var j = 0; j < line.length; j++) {
                var index = line[j];
                var newObj = {
                    weight: 0 ,
                    top:    true,
                    right:  true,
                    bottom: true,
                    left:   true
                };
                var bin = decToBin(index,4);
                if (bin[0]==1)    newObj.top = false;
                if (bin[1]==1)    newObj.right = false;
                if (bin[2]==1)    newObj.bottom = false;
                if (bin[3]==1)    newObj.left = false;
                board[i].push(newObj);
            }
        }
    };

    this.getPath = function(startPoint,endPoint){
        coords = [];
//        var masterNode =  new Node(startPoint) ;
//        registeredNodes.push(masterNode);
        var square = board[startPoint.y][startPoint.x];
        square.weight++;
        coords.push(startPoint);
        target = endPoint;
        return that.find();
    };

    function getBounderies(index){
            var bin = decToBin(index,4);
            directions = [0,0,0,0];
            if (bin[0]==1 || direction == "bottom"  )    directions[0] = -1;
            if (bin[1]==1 || direction == "left"    )      directions[1] = -1;
            if (bin[2]==1 || direction == "top"     )       directions[2] = -1;
            if (bin[3]==1 || direction == "right"   )     directions[3] = -1;
//            directions = [0,0,0,0];
//            console.log(index);
        };
    function decToBin(dec,digits){
        var st = "" ;
        for (var i = 0; i < digits; i++) {
            //Math.floor(dec/Math.pow(2,i))
            st = st.splice(0,0,Math.floor(dec%2));
            dec = Math.floor(dec/2);
        }
        return st;
    }
}