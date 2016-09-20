$ ->
  $('.mobile-menu').click ->
    $('.mobile-links-section').slideToggle()
  $('img.svg').each ->
    $img = $(this)
    imgID = $img.attr('id')
    imgClass = $img.attr('class')
    imgURL = $img.attr('src')
    $.get imgURL, ((data) ->
      # Get the SVG tag, ignore the rest
      $svg = $(data).find('svg')
      # Add replaced image's ID to the new SVG
      if typeof imgID != 'undefined'
        $svg = $svg.attr('id', imgID)
      # Add replaced image's classes to the new SVG
      if typeof imgClass != 'undefined'
        $svg = $svg.attr('class', imgClass + ' replaced-svg')
      # Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a')
      # Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if !$svg.attr('viewBox') and $svg.attr('height') and $svg.attr('width')
        $svg.attr 'viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width')
      # Replace image with new SVG
      $img.replaceWith $svg
    ), 'xml'

  $('a[href*="#"]:not([href="#"])').click ->
    if location.pathname.replace(/^\//, '') == @pathname.replace(/^\//, '') and location.hostname == @hostname
      target = $(@hash)
      target = if target.length then target else $('[name=' + @hash.slice(1) + ']')
      if target.length
        $('html, body').animate { scrollTop: target.offset().top }, 1000
        return false
    return
  return
