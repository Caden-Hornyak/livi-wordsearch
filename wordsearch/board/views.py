from django.shortcuts import render
from . import word_board
# Create your views here.
def create_board(request):
    board_dim = 4
    specific_board = []
    board_type = "new_board"

    if request.method == "POST":
        pass

    board_obj = word_board.word_board(board_dim, specific_board, board_type)
    board = board_obj.board
    return render(request, "create_board.html", {'board': board})