goog.provide("ispring.shapes.Controller");

// goog.require("ispring.shapes.Rectangle");
// goog.require("ispring.shapes.RectangleView");
goog.require("ispring.shapes.EventType");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.events");
goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.Controller = goog.defineClass(null, {
        constructor:function(model, leftView)
        {
            /**@private {ispring.shapes.ShapesModel}*/
            this._model = model;

            /**@private {ispring.shapes.LeftView}*/
            this._leftView = leftView;


            this._isFigureSelected = false;

            /**@private {!Element}*/
            var btn = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn.id = "btn";
            btn.type = "submit";
            btn.value = "Нажми меня";
            goog.style.setPosition(btn, new goog.math.Coordinate(300, 0));
            goog.style.setSize(btn, new goog.math.Size(100, 50));
            document.body.appendChild(btn);
            btn.addEventListener("click", goog.bind(this._createShape, this));

            document.addEventListener(ispring.shapes.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._leftView.addView(e.detail);
            }, this), false);

            var lv = this._leftView.getBody();

            lv.onmousedown = goog.bind(function(e){
                var key = this._model.getShapeUId(e);
                var shapeView = this._leftView.getViewShape(key);

                var shiftX = e.pageX - shapeView.getPosition().x;
                var shiftY = e.pageY - shapeView.getPosition().y;

                document.onmousemove = goog.bind(function(e){
                    shapeView.setPosition(new goog.math.Coordinate(e.pageX - shiftX, e.pageY - shiftY));
                    this._leftView.draw();
                }, this);

                lv.onmouseup = goog.bind(function(e){
                    this._model.getShape(key).setPosition(shapeView.getPosition());
                    document.onmousemove = null;
                    document.onmouseup = null;
                }, this);
            }, this);
        },

        /** 
         * @private
         */
        _createShape:function()
        {
            this._model.addShape();
        },
    })
});
