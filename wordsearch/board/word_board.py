import numpy as np

class word_board:

    def __init__(self, board_dim, specific_board=[], board_type="new_board"):

        self.word_dic = {}
        count = 0
        with open(r'C:\Users\19494\Desktop\Coding\Python\WordSearchWeb\wordsearch\board\words.txt', 'r', encoding="mbcs") as f:
            for line in f:
                clean_line = line = ''.join([char for char in line if char.isalnum() or char.isspace()])
                ind = clean_line.find(" ")
                self.word_dic[clean_line[:ind]] = clean_line[ind+1:]

        self.letters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K', 11: 'L', 12: 'M', 13: 'N', 
            14: 'O', 15: 'P', 16: 'Qu', 17: 'R', 18: 'S', 19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z'}

        # normalize probabilities
        self.board_distr = [12, 1, 5, 6, 19, 4, 3, 5, 11, 1, 1, 5, 4, 11, 11, 4, 1, 12, 9, 13, 3, 1, 2, 1, 3, 1]
        self.board_distr = np.asarray(self.board_distr).astype('float64')
        self.board_distr /= np.sum(self.board_distr)


        if specific_board:
            self.board = []
            for row in specific_board:
                self.board.append([])
                for space in row:
                    if space == 1: self.board.append('')
                    else: self.board.append('-')
        else:
            self.board = [['' for _ in range(board_dim)] for _ in range(board_dim)]

        self.refresh_board()
        
    def refresh_board(self):
        for y, row in enumerate(self.board):
            for x, char in enumerate(row):
                if char != '-':
                    self.board[y][x] = self.letters[np.random.choice(np.arange(26), p=self.board_distr, replace=False)]



