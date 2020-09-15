/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    let flp = firstLetterPositions(board, word)
    let startPoint = flp.next()

    while (startPoint) {
        if (BFS(board, word.substring(1), [startPoint.y, startPoint.x])) return true
        startPoint = flp.next()
    }
    return false
};

function BFS(board, word, [cy, cx], visited = Array.from({
    length: board.length
}, e => Array(board[0].length).fill(false))) {
    if (word === "") return true
    visited[cy][cx] = true
    const adjY = [0, 0, 1, -1]
    const adjX = [1, -1, 0, 0]
    const adj = []
    adjY.forEach((e, i, a) => {
        const y = cy + e
        const x = cx + adjX[i]
        // Condition to check if there is a valid adjacent
        if (x >= 0 && y >= 0 && y < board.length && x < board[0].length &&
            !visited[y][x] &&
            board[y][x] === word.charAt(0)) adj.push([y, x])
    })
    while (adj.length > 0) {
        if (BFS(board, word.substring(1), adj.pop(), JSON.parse(JSON.stringify(visited)))) return true
    }
    return false
}

function firstLetterPositions(board, word) {
    const firstLetter = word.charAt(0)
    let x = -1,
        y = 0
    const isPointerValid = function () {
        x++
        if (x >= board[0].length) {
            x = 0
            y++
            if (y >= board.length) return false
        }
        return true
    }

    return {
        next: function () {
            while (isPointerValid()) {
                if (board[y][x] === firstLetter) {
                    return {
                        y,
                        x
                    }
                }
            }
            return null
        }
    }
}




// More efficient 
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist2 = function(board, word) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == word[0] && dfs(i, j, 0)) {
                return true
            }
        }
    }
    
    return false
    
    function dfs(i, j, index) {
        if (index == word.length) {
            return true
        }
        
        if (i < 0 || i >= board.length || j < 0 || j >= board[i].length || board[i][j] != word[index]) {
            return false
        }
        
        board[i][j] = '#'
        
        if (dfs(i + 1, j, index + 1) || dfs(i - 1, j, index + 1) || dfs(i, j + 1, index + 1) || dfs(i, j - 1, index + 1)) {
            return true
        }
        
        board[i][j] = word[index]
    }
};

console.log(exist2(
    [
        ["A", "B", "C", "E"],
        ["S", "F", "E", "S"],
        ["A", "D", "E", "E"]
    ],
    "ABCESEEEFS"))