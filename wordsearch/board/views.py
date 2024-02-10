from django.shortcuts import render
from . import word_board
import json

# Create your views here.
def create_board(request):
    board_dim = 4
    specific_board = []
    board_type = "new_board"

    if request.method == "POST":
        pass

    board_obj = word_board.word_board(board_dim, specific_board, board_type)
    board = board_obj.board
    word_definitions_json = json.dumps(board_obj.word_dic)

    return render(request, "create_board.html", {'board': board, 'word_dic': word_definitions_json})

def sidebar(request):
    return render(request, "sidebar.html")