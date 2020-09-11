/**
 * Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.
 * @param {string} s
 * @param {string[]} wordDict
 * @param {Map} map - optional map that keeps the response for a specific string
 * @return {string[]}
 */
var wordBreak = function(s, wordDict, map = new Map()) {
  const res = []
  if (map.has(s)) {
    return map.get(s)
  }

  if (s.length === 0) return res

  wordDict.forEach((w) => {
    if (s.startsWith(w)) {
      const remainOfs = s.substring(w.length)
      if (remainOfs.length > 0) {
        res.push(...wordBreak(remainOfs, wordDict, map).map(e => `${w} ${e}`))
      } else {
        res.push(w)
      }
    }
  });

  map.set(s, res)
  return res
};

// s = "catsanddog"
// dic = ["cat","cats","and","sand","dog"]

s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
dic = ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"]


console.log(wordBreak(s, dic))
