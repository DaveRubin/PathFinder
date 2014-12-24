///**
// * Created by dudi on 11/13/14.
// */
//function point(x,y){
//    this.x = x;
//    this.y = y;
//    this.equal = function(pt){
//        return (pt.x == this.x &&  pt.y == this.y);
//    }
//}
////look for open spots and "shoot" node to direction
//// move all
//// on movement,move node to new position and mark old position in board
//// if a node reaches a dead end , unregister from list and send back false
//// if a node reaches a junciton  "shoot" new node to new direction  and register it to the list
//
//function PathFinder() {
//    var board = null;
//    var path = [];
//    var registeredNodes = [];
//    var oldNodes = [];
//    var addition = [];
//    var id = 0;
//    var target = null;
//    $(window).keypress(function(){
//        addition = [];
//        var l = registeredNodes.length;
//        function color(pos){
//            var posStr = pos.x+"-"+pos.y;
////            console.log(posStr);
//            $("[pos="+posStr+"]").addClass("selected");
//        }
//        function checkExpansion(node) {
//            //block node direction
////            if (node.direction == "top")    node.possibleDirections[0] = -1;
////            if (node.direction == "right")  node.possibleDirections[1] = -1;
////            if (node.direction == "bottom") node.possibleDirections[2] = -1;
////            if (node.direction == "left")   node.possibleDirections[3] = -1;
//            //
//            if (node.direction == "top")    node.possibleDirections[2] = -1;
//            if (node.direction == "right")  node.possibleDirections[3] = -1;
//            if (node.direction == "bottom") node.possibleDirections[0] = -1;
//            if (node.direction == "left")   node.possibleDirections[1] = -1;
//            //
//            if (node.possibleDirections[0] == 0) expand(node, "top");
//            if (node.possibleDirections[1] == 0) expand(node, "right");
//            if (node.possibleDirections[2] == 0) expand(node, "bottom");
//            if (node.possibleDirections[3] == 0) expand(node, "left");
//        }
//
//        for (var i = 0; i < l; i++) {
//            var node = registeredNodes[i];
//            if (node.position.equal(target)){
//                console.log("found");
//            }
//            color(node.position);
////            console.log(node.position);
//            checkExpansion(node);
//            registeredNodes.splice(i, 1);
//            i--;
//            l--;
//            oldNodes.push(node);
//        }
//        for (var i = 0; i < registeredNodes.length; i++) {
//            var newNode = registeredNodes[i];
//            for (var j = 0; j < oldNodes.length; j++) {
//                var oldNode = oldNodes[j];
//                if (oldNode.position.equal(newNode.position)){
//                    registeredNodes.splice(i, 1);
//                    i--;
//                }
//            }
//        }
//        for (var i = 0; i < addition.length; i++) {
//            registeredNodes.push( addition[i]);
//        }
//        //remove all nodes
//    });
//    function expand(node,dir){
//        console.log(node.position,node.possibleDirections,dir);
//        var newPos = node.position;
//        if (dir == "top") newPos.y-=1;
//        if (dir == "right") newPos.x+=1;
//        if (dir == "bottom") newPos.y+=1;
//        if (dir == "left") newPos.x-=1;
//        var n = new Node(newPos,dir,node.history);
//        addition.push(n);
//    }
//
//    function unregister(id){
//        console.log("unregister");
//        for (var i = 0; i < registeredNodes.length; i++) {
//            var node = registeredNodes[i];
//            if (node.id == id) {
//                console.log("zzz",id,registeredNodes.length);
//                registeredNodes.splice(i, 1);
//                console.log(registeredNodes.length);
//                return;
//            }
//        }
//    }
//
//    function Node(position,direction,history){
//        this.id = id++;
//        this.position = new point(position.x, position.y);
//        this.history = "";
//        this.history += history;
//        this.direction = direction;
//        var directions  = [0,0,0,0];
//        var DIRECTIONS_NAMES = ["top","right","bottom","left"];
//        var square = board[this.position.y][this.position.x];
//        this.toBeRemoved = false;
//        getBounderies(square);
//        this.possibleDirections = directions;
//
//        this.getHistory = function(){
//            for (var i = 0; i < history.length; i++) {
//                this.history.push(history[i]);
//            }
//        };
//
//        this.move = function (){
//            var square = board[this.position.y][this.position.x];
//            getBounderies(square);
//            //node moves
//            this.possibleDirections = directions;
//            if      (this.direction == "top"     && directions[0] !=-1 )    this.position.y-=1;
//            else if (this.direction == "right"   && directions[1] !=-1 )    this.position.x+=1;
//            else if (this.direction == "bottom"  && directions[2] !=-1 )    this.position.y+=1;
//            else if (this.direction == "left"    && directions[3] !=-1 )    this.position.x-=1;
//            else this.toBeRemoved = true;
//        };
//
//        this.checkState = function(){
//            if (this.outOfBound()) {
//                //unregister
//                unregister(this.id);
//                return;
//            }
//            var square = board[this.position.y][this.position.x];
//            this.getBounderies(square);
//            //if junction create new nodes and register them
//        };
//
//
//        function decToBin(dec,digits){
//            var st = "" ;
//            for (var i = 0; i < digits; i++) {
//                //Math.floor(dec/Math.pow(2,i))
//                st = st.splice(0,0,Math.floor(dec%2));
//                dec = Math.floor(dec/2);
//            }
//            return st;
//        }
//        this.outOfBound = function(){
//            if (position.y >= board.length || position.y < 0) return true;
//            if (position.x >= board[0].length || position.x < 0) return true;
//            if (direction=="top" && directions[0] == -1) return true;
//            if (direction=="right" && directions[1] == -1) return true;
//            if (direction=="bottom" && directions[2] == -1) return true;
//            if (direction=="left" && directions[3] == -1) return true;
//            return false;
//        };
//
//        function getBounderies(index){
//            var bin = decToBin(index,4);
//            directions = [0,0,0,0];
//            if (bin[0]==1 || direction == "bottom"  )    directions[0] = -1;
//            if (bin[1]==1 || direction == "left"    )      directions[1] = -1;
//            if (bin[2]==1 || direction == "top"     )       directions[2] = -1;
//            if (bin[3]==1 || direction == "right"   )     directions[3] = -1;
//        };
//    }
//
//    this.setBoard = function(boardInput){
//        board  = boardInput;
//        console.log("board set");
//    };
//    this.getPath = function(startPoint,endPoint){
////        var masterNode =  new Node(startPoint,"none") ;
////        registeredNodes.push(masterNode);
//        target = endPoint;
//
////        var str = nd.find(endPoint);
//        console.log(path);
//        return path;
//    }
//}