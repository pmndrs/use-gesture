'use strict'

var expect = require('expect')
var move = require('../lib/index').default

describe('#move', () => {

  it('moves items in an array', () => {
    expect(move(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b'])
    expect(
      move([
        {name: 'Fred'},
        {name: 'Barney'},
        {name: 'Wilma'},
        {name: 'Betty'}
      ], 2, 1)
    ).toEqual([
      {name: 'Fred'},
      {name: 'Wilma'},
      {name: 'Barney'},
      {name: 'Betty'}
    ])
    expect(move([1, 2, 3], 2, 1)).toEqual([1, 3, 2])
  })

})
