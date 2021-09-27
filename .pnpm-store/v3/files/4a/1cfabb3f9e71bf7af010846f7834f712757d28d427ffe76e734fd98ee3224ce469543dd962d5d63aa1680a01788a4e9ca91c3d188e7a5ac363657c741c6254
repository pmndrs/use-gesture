const fetch = require('node-fetch')

const radix = 36

async function generateClassData(sourceUrl, classFilter = cls => true) {
  const response = await fetch(sourceUrl)
  const txt = await response.text()
  const classMap = new Map()
  txt.split('\n').forEach(line => {
    line.trim()
    if (!line || line.startsWith('#')) return
    const match = line.match(/^([A-Z0-9.]+)\s*;\s([\w]+)*/)
    if (match) {
      const cls = match[2]
      if (classFilter(cls)) {
        let codePoints = match[1].split('..').map(c => parseInt(c, 16))
        let ranges = classMap.get(cls)
        if (!ranges) {
          classMap.set(cls, ranges = [])
        }
        ranges.push(codePoints)
      }
    }
  })

  const out = {}
  classMap.forEach((ranges, cls) => {
    let lastCode = 0
    ranges.sort((a, b) => a[0] - b[0])

    // Map absolute ranges to relative skip/step increments
    ranges = ranges.map(([from, to]) => {
      const skip = from - lastCode
      const step = to - from
      lastCode = to || from
      return [skip, step]
    })

    // Collapse ranges that were adjacent in the data
    for (let i = 0; i < ranges.length - 1; i++) {
      while (ranges[i + 1] && ranges[i + 1][0] === 1) {
        ranges[i][1] = (ranges[i][1] || 0) + 1 + (ranges[i + 1][1] || 0)
        ranges.splice(i + 1, 1)
      }
    }

    // Stringify
    ranges = ranges.map(([skip, step]) => {
      return `${skip.toString(radix)}${step ? '+' + step.toString(radix) : ''}`
    })

    out[cls] = ranges.join(',')
  })

  console.log(JSON.stringify(out, null, 2))
  console.log(JSON.stringify(out, null).length)
}


// Generate data for bidi:
// - Strong directional characters (R, L, AL)
// - Paragraph separators (B)
// - Directional instructions (LRE, RLE, PDF, etc.)
// - BN for exclusion
// generateClassData(
//   'JT_https://www.unicode.org/Public/13.0.0/ucd/extracted/DerivedBidiClass.txt',
//   cls => cls !== 'L' //omit 'L' (strong left-to-right) as that's the default
// )

// Generate data for Arabic joining types
// generateClassData(
//   'JT_https://www.unicode.org/Public/13.0.0/ucd/extracted/DerivedJoiningType.txt',
//   cls => /^[RLDCT]$/.test(cls) //omit 'U' (non-joining) as that's the default
// )

// Generate data for character scripts
// generateClassData(
//   'JT_https://www.unicode.org/Public/13.0.0/ucd/Scripts.txt',
//   cls => true
// )


async function generateBracketsData() {
  const response = await fetch('https://www.unicode.org/Public/13.0.0/ucd/BidiBrackets.txt')
  const txt = await response.text()
  let pairs = []
  txt.split('\n').forEach(line => {
    line.trim()
    if (!line || line.startsWith('#')) return
    const match = line.match(/^([A-Z0-9.]+)\s*;\s*([A-Z0-9.]+)\s*;\s*o/)
    if (match) {
      pairs.push([parseInt(match[1], 16), parseInt(match[2], 16)])
    }
  })
  pairs.sort((a, b) => a[0] - b[0])

  // Map absolute codes to relative offsets
  let lastCode = 0
  pairs = pairs.map((codes) => {
    return [codes[0] - lastCode, (lastCode = codes[1]) - codes[0]]
  })

  // Stringify
  pairs = pairs.map((offsets) => {
    return `${offsets[0].toString(radix)}+${offsets[1].toString(radix)}`
  })

  pairs = pairs.join(',')

  console.log(JSON.stringify(pairs))
}

generateBracketsData()
