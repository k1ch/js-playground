const votes = [{
  name: 'joe',
  time: 1
}, {
  name: 'don',
  time: 1
}, {
  name: 'don',
  time: 6
}, {
  name: 'don',
  time: 9
}, {
  name: 'bush',
  time: 19
}, {
  name: 'bush',
  time: 20
}, {
  name: 'joe',
  time: 19
}, {
  name: 'bush',
  time: 9
}, {
  name: 'joe',
  time: 15
}, {
  name: 'joe',
  time: 21
}]


/**
 * Get the winner in the given time
 * @param {name: string, time: number } votes - list of votes 
 * @param {number} time - winner up to that point
 * @returns {winners: string[], voteCount: number} - return array of winners and the number of vote (multiple winner if tied)
 */
function getWinner(votes, time) {
  let winner = [null, 0]
  let ties = []
  const voteCount = {}

  votes.forEach((v, i, a) => {
    if (v.time <= time) {
      if (voteCount[v.name]) voteCount[v.name]++
      else voteCount[v.name] = 1
      if (voteCount[v.name] > winner[1]) {
        ties = []
        winner = [v.name, voteCount[v.name]]
      } else if (voteCount[v.name] === winner[1]) ties.push(v.name)
    }
  });
  return {
    winners: [winner[0], ...ties],
    voteCount: winner[1]
  }
}

// console.log(getWinner(votes, 19))


/**
 * Get count status at each time in order
 * winners at each time
 * @param {name: string, time: number } votes - list of votes 
 * @return {} ordered vote counts in each time 
 */
function voteAtEachTime(votes) {
  const voteCounts = {}
  const voteCountsInTime = new Map()

  votes.sort((a, b) => a.time - b.time)
  votes.forEach((v) => {
    if (voteCounts[v.name]) voteCounts[v.name]++
    else voteCounts[v.name] = 1

    const timeMap = voteCountsInTime.get(v.time)
    if (timeMap) timeMap.set(v.name, (timeMap.get(v.name) || 0) + 1)
    else {
      const latestTime = [...voteCountsInTime.entries()].pop()
      const countedSofar = latestTime ? [...latestTime[1].entries()] : null
      const initialEntries = countedSofar && countedSofar.length > 0 ? [...countedSofar, [v.name, voteCounts[v.name]]] : [
        [v.name, voteCounts[v.name]]
      ]
      voteCountsInTime.set(v.time, new Map(initialEntries))
    }
  });
  voteCountsInTime.forEach((v, k) => {
    voteCountsInTime.set(k, new Map([...v].sort((a, b) => b[1] - a[1])))
  })
  return voteCountsInTime
}

console.log(voteAtEachTime(votes))