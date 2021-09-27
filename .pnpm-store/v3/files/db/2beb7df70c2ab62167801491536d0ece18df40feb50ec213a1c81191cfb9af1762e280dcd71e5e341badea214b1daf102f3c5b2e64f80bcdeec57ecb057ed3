root = exports ? this

class root.Lethargy
  constructor: (stability, sensitivity, tolerance, delay) ->

    # Stability is how many records to use to calculate the average
    @stability = if stability? then Math.abs stability else 8

    # The wheelDelta threshold. If an event has a wheelDelta below this value, it will not register
    @sensitivity = if sensitivity? then 1 + Math.abs sensitivity else 100

    # How much the old rolling average have to differ from the new rolling average for it to be deemed significant
    @tolerance = if tolerance? then 1 + Math.abs tolerance else 1.1

    # Threshold for the amount of time between mousewheel events for them to be deemed separate
    @delay = if delay? then delay else 150

    # Used internally and should not be manipulated
    @lastUpDeltas = (null for [1..(@stability * 2)])
    @lastDownDeltas = (null for [1..(@stability * 2)])
    @deltasTimestamp = (null for [1..(@stability * 2)])

  # Checks whether the mousewheel event is an intent
  check: (e) ->
    # Use jQuery's e.originalEvent if available
    e = e.originalEvent || e

    # Standardise wheelDelta values for different browsers
    if e.wheelDelta?
      lastDelta = e.wheelDelta
    else if e.deltaY?
      lastDelta = e.deltaY * -40
    else if (e.detail? or e.detail == 0)
      lastDelta = e.detail * -40

    # Add the new event timestamp to deltasTimestamp array, and remove the oldest entry
    @deltasTimestamp.push(Date.now())
    @deltasTimestamp.shift()

    # If lastDelta is positive, it means the user scrolled up
    if (lastDelta > 0)
      @lastUpDeltas.push(lastDelta)
      @lastUpDeltas.shift()
      return @isInertia(1)
    # Otherwise, the user scrolled down
    else
      @lastDownDeltas.push(lastDelta)
      @lastDownDeltas.shift()
      return @isInertia(-1)
    false;

  isInertia: (direction) ->
    # Get the relevant last*Delta array
    lastDeltas = if direction == -1 then @lastDownDeltas else @lastUpDeltas

    # If the array is not filled up yet, we cannot compare averages, so assume the scroll event to be intentional
    if lastDeltas[0] == null
      return direction

    # If the last mousewheel occurred within the specified delay of the penultimate one, and their values are the same. We will assume that this is a trackpad with a constant profile, and will return false
    if @deltasTimestamp[(this.stability * 2) - 2] + @delay > Date.now() and lastDeltas[0] == lastDeltas[(@stability * 2) - 1]
      return false

    # Check to see if the new rolling average (based on the last half of the lastDeltas array) is significantly higher than the old rolling average. If so return direction, else false
    lastDeltasOld = lastDeltas.slice(0, @stability)
    lastDeltasNew = lastDeltas.slice(@stability, (@stability * 2))

    oldSum = lastDeltasOld.reduce (t, s) -> t + s
    newSum = lastDeltasNew.reduce (t, s) -> t + s

    oldAverage = oldSum / lastDeltasOld.length
    newAverage = newSum / lastDeltasNew.length

    if Math.abs(oldAverage) < Math.abs(newAverage * @tolerance) && (@sensitivity < Math.abs(newAverage))
      direction
    else
      false

  showLastUpDeltas: ->
    return @lastUpDeltas

  showLastDownDeltas: ->
    return @lastDownDeltas