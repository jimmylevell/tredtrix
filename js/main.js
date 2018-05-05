const DEFAULT_BOARD_HEIGHT_DESC = ['Persönlichen Fortschritt fördern','Gesetzt und Versprechen','Leben in der Gruppe','Rituale und Traditionen', 'Mitbestimmen und Verantwortung tragen', 'Draussen leben', 'Spielen'];
const DEFAULT_BOARD_WIDTH_DESC = ['Beziehung zur Persönlichkeit','Beziehung zum Körper','Beziehung zu den Mitmenschen','Beziehung zur Welt', 'Beziehung zur Spiritualität'];
const DEFAULT_TEAMSIZE = 4;
const DEFAULT_COLORS = ['b','g','y','r'];
const DEFAULT_AMOUNT_IN_ROW = 3;

var game;
var gameRenderer;

$(function() 
{
    game = new Game(DEFAULT_TEAMSIZE, DEFAULT_AMOUNT_IN_ROW, DEFAULT_BOARD_WIDTH_DESC.length, DEFAULT_BOARD_HEIGHT_DESC.length, DEFAULT_COLORS);
    game.initializeBoard();

    gameRenderer = new GameRenderer($('#game'), $('#scoreBoard'), $('#questsions'), game);
});