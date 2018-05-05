function Game (amountOfTeams, amountInRow, boardWidth, boardHeight, colors) {
    this.amountOfTeams = amountOfTeams;
    this.colors = colors;
    this.teams = [];
    this.move = 0;
    this.board = [];
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.amountInRow = amountInRow;
    this.questions = [];

}

Game.prototype.initializeBoard = function() {
    this.board = new Array(this.boardWidth);

    for(var i = 0; i < this.boardHeight; i++)
    {
        this.board[i] = new Array(this.boardHeight);

        for(var a = 0; a < this.boardWidth; a++)
        {
            this.board[i][a] = '0';
        }
    }

    for(var i = 0; i < this.amountOfTeams; i++)
    {
        this.teams[i] = new Team(this.colors[i], 'Team ' + i);
    }

    $.getJSON("js/questions.json", function(element) {
        game.questions = element.questions;
        gameRenderer.render()
    })
};

Game.prototype.play = function(column) {
    var i  = this.boardHeight - 1;
    var emptyFieldFound = false;

    while(emptyFieldFound == false && i >= 0)
    {
        if(this.board[i][column] == '0')
        {
            var team = this.teams[this.move % this.amountOfTeams]
            this.board[i][column] = team.color;
            gameRenderer.render()

            if(game.ifWon(team, i, column))
            {
                team.points++;
            }

            emptyFieldFound = true;
        }
        i--;
    }

    this.move++;

    gameRenderer.render()
};

Game.prototype.skipTeam = function() {
    this.move++;
    gameRenderer.render();
}

Game.prototype.removeFigure = function(figure) {
    figure.forEach(function(element) {
        game.board[element.x][element.y] = '0'
    });
}

Game.prototype.ifWon = function(team, row, column){
    //verify horizontal
    var figure = [new Figure(row, column)];
    var index = 1;
    var processing = true;

    while(column + index < this.boardWidth && processing == true)
    {
        if(this.board[row][column + index] == team.color)
        {
            figure.push(new Figure(row, column + index));
            index++
        }
        else
        {
            processing = false;
        }
    }

    index = 1;
    processing = true;
    while(index <= column && processing == true)
    {
        if(this.board[row][column - index] == team.color)
        {
            figure.push(new Figure(row, column - index));
            index++
        }
        else
        {
            processing = false;
        }
    }

    if(figure.length == this.amountInRow )
    {
        this.removeFigure(figure);
        return true;
    }
    else
    {
        figure = [new Figure(row, column)];
    }

    //verify vertical
    var index = 1;
    var processing = true;

    while(row + index < this.boardHeight && processing == true)
    {
        if(this.board[row + index][column] == team.color)
        {
            figure.push(new Figure(row + index, column));
            index++;
        }
        else
        {
            processing = false;
        }
    }

    index = 1;
    processing = true;
    while(index <= row && processing == true)
    {
        if(this.board[row - index][column] == team.color)
        {
            figure.push(new Figure(row - index, column));
            index++;
        }
        else
        {
            processing = false;
        }
    }

    if(figure.length == this.amountInRow)
    {
        this.removeFigure(figure);
        return true;
    }
    else
    {
        figure = [new Figure(row, column)];
    }

    //verify diagonal
    var index = 1;
    var processing = true;

    while(row + index < this.boardHeight && column + index < this.boardWidth && processing == true)
    {
        if(this.board[row + index][column + index] == team.color)
        {
            figure.push(new Figure(row + index, column + index));
            index++
        }
        else
        {
            processing = false;
        }
    }
  

    if(figure.length == this.amountInRow)
    {
        this.removeFigure(figure);
        return true;
    }
    else
    {
        figure = [new Figure(row, column)];
    }

    var index = 1;
    var processing = true;
    while(index <= row && index <= column && processing == true)
    {
        if(this.board[row - index][column - index] == team.color)
        {
            figure.push(new Figure(row - index, column - index));
            index++;
        }
        else
        {
            processing = false;
        }
    }
  

    if(figure.length == this.amountInRow)
    {
        this.removeFigure(figure);
        return true;
    }
    else
    {
        figure = [new Figure(row, column)];
    }

    var index = 1;
    var processing = true;
    while(index <= row && index + column < this.boardWidth && processing == true)
    {
        if(this.board[row - index][column + index] == team.color)
        {
            figure.push(new Figure(row - index, column + index));
            index++;
        }
        else
        {
            processing = false;
        }
    }
  

    if(figure.length == this.amountInRow)
    {
        this.removeFigure(figure);
        return true;
    }
    else
    {
        figure = [new Figure(row, column)];
    }

    var index = 1;
    var processing = true;
    while(index + row < this.boardHeight && index <= column && processing == true)
    {
        if(this.board[row + index][column - index] == team.color)
        {
            figure.push(new Figure(row + index, column - index));
            index++;
        }
        else
        {
            processing = false;
        }
    }
  

    if(figure.length == this.amountInRow)
    {
        this.removeFigure(figure);
        return true;
    }

    return false;
};