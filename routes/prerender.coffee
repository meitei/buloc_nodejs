module.exports = (req, res, next) ->
  # console.log "prerender accept => #{req.get('Content-Type')}"
  # console.log req
  # console.log res.format
  # console.log req.accepted
  res.format

    '*/*': ->
      # console.log 'prerender (*)'

    'text/css': ->
      # console.log 'prerender (css)'


    # text: ->
    #   console.log 'prerender (text)'

    html: ->
      # console.log 'prerender (html)'
      res.charset = "UTF-8"
      # res.contentType 'text/html'

    json: ->
      # console.log 'prerender (json)'

    default: ->
      # console.log 'prerender (default)'

  # if req.accepts('html')
  #   console.log 'prerender (html)'
  #   res.charset = "UTF-8"
  #   res.contentType 'text/html'
  # else
  #   console.log 'prerender (not html)'

  next()
