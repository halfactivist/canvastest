# canvastest
Testing canvas

TODO:
- Create a base PathDrawable object (replace drawable?)
    - createPath( ctx ) method: subclasses would use it to provide the context with the path
        - could be used for hit testing: build path call ctx.isPointInPath()
    - the stroke and fill would happen in the draw method of the root class (ie PathDrawable)
- rotation property
- arc object
- polygon object
