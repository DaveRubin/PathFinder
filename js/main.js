String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

$(document).ready(function(){
    function decToBin(dec,digits){
        var st = "" ;
        for (var i = 0; i < digits; i++) {
            //Math.floor(dec/Math.pow(2,i))
            st = st.splice(0,0,Math.floor(dec%2));
            dec = Math.floor(dec/2);
        }
        return st;
    }
    function getClass(index){
        /*
        0 - 0000 open
        1 - 0001 left
        2 - 0010 bottom
        3 - 0011 borrom left
        4 - 0100 right
        5 - 0101 right left
        6 - 0110 bottom right
        7 - 0111 bottom right left
        8 - 1000 top
        9 - 1001 top left
        10 - 1010 top bottom
        11 - 1011 top bottom left
        12 - 1100 top right
        13 - 1101 top right right
        14 - 1110 top left bottom
        15 - 1111 all
        * */
        var bin = decToBin(index,4);
        var classString = "";
        if (bin[0]==1) classString+=" top";
        if (bin[1]==1) classString+=" right";
        if (bin[2]==1) classString+=" bottom";
        if (bin[3]==1) classString+=" left";
        return classString;
     }
    var board = [];
    var path = [];
    var delay = 50;
    var pause = 400;
    var posArr = [];
    var pf = new PathFinder();

    function delayColorSquare(i,posStr){
        setTimeout(function(){
            $("[pos="+posStr+"]").addClass("selected");
        },i*delay);
        setTimeout(function(){
            $("[pos="+posStr+"]").removeClass("selected");
        },i*delay + pause);
    }

    function colorPath(){
        $(".square").removeClass("selected");
        for (var i = path.length - 1; i >= 0; i--) {
            var item = path[i];
            var posStr = item.x+"-"+item.y;
            delayColorSquare(path.length - i, posStr);
        }
    }

    function addPos(point){
        posArr.push(point);
        if (posArr.length==2){
            pf.resetBoard();
            path = pf.getPath(posArr[0],posArr[1]);
            colorPath();
            path = [];
            posArr = [];
        }
    }

    $.get( "input/board.txt", function( data ) {
        var rowsArr = data.split('\n');
        for (var i = 0; i < rowsArr.length; i++) {
            var row = rowsArr[i].split(",");
            board.push(row);
            var $row = $("<tr>");
            for (var j = 0; j < row.length; j++) {
                var $square = $("<td>");
                $square.text("  ");
                $square.attr("pos",j+"-"+i);
                $square.click(function(){
                    var posAttr = $(this).attr("pos").split("-");
                    var pos = new point(Number(posAttr[0]),Number(posAttr[1]));
                    addPos(pos);
                    $(this).addClass("marked");
                });
                $square.addClass("square");
                $square.addClass(getClass(row[j]));
                $row.append($square);
            }
            $("#main").append($row);
        }
        pf.setBoard(board);
    });
});
