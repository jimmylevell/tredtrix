function GameRenderer(board, scoreBoard, questions, game) {
    this.board = board;
    this.scoreBoard = scoreBoard;
    this.questions = questions;
    this.game = game;
}

GameRenderer.prototype.render = function() {
    //render board
    this.board.empty();
    var table = $('<table class="table table-bordered"></table>').appendTo(this.board);

    var rowHTML = $('<tr></tr>').appendTo(table);
    DEFAULT_BOARD_WIDTH_DESC.forEach(function(element) {
        $('<th>' + element + '</th>').appendTo(rowHTML);
    });

    game.board.forEach(function(row, rowIndex, rowArray) {
        var rowHTML = $('<tr></tr>').appendTo(table);

        row.forEach(function(column, columnIndex, columnArray) {
           var element = game.board[rowIndex][columnIndex];
            var color = '';

            switch(element) {
                case 'r':
                    color = 'red'; 
                    break;
                case 'b':
                    color = 'blue';
                    break;
                case 'y':
                    color = 'yellow';
                    break
                case 'g':
                    color = 'green';
                    break
                default:
                    color = 'pink';
            }

            columnHTML = $('<td style="text-align: center"; ></td>').appendTo(rowHTML);
            columnHTML.append($()).html('<i style="font-size: 50px; color: ' + color + '" class="fas fa-circle" onclick="game.play(' + columnIndex + ')"></i>');
        });
    });

    $("tr").prepend("<th></th>");
    DEFAULT_BOARD_HEIGHT_DESC.forEach(function(element, index, array) {
        $('th:first-child').eq(index+1).html(element);
    });

    //render score
    this.scoreBoard.empty();
    var board = $('<table class="table table-bordered"><tr><th>Team </th><th>Punkte </th></tr></table>').appendTo(this.scoreBoard); 

    game.teams.forEach(function(element, index, array) {
        var rowHTML = $('<tr></tr>').appendTo(board);
        if(game.move % game.amountOfTeams == index)
        {
            rowHTML.addClass('info');
        }
        $('<td> ' + element.name + '</td><td>' + element.points + '</t>').appendTo(rowHTML);
    })

    //render questions
    this.questions.empty();
    var quets = $('<p>' + game.questions[game.move % game.questions.length] + '</p> ').appendTo(this.questions);
    
};