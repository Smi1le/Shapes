goog.provide("ispring.shapes.Controller");

// goog.require("ispring.shapes.Rectangle");
goog.require("ispring.shapes.History");
goog.require("ispring.shapes.EventType");
goog.require("goog.dom");
goog.require("goog.style");
// goog.require("goog.events");
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

            /**@private {ispring.shapes.History}*/
            this._history = new ispring.shapes.History();

            // this._isFigureSelected = false;

            /**@private {!Element}*/
            var btn = goog.dom.createElement(goog.dom.TagName.INPUT);
            btn.id = "btn";
            btn.type = "submit";
            btn.value = "Add rect";
            goog.style.setPosition(btn, new goog.math.Coordinate(300, 0));
            goog.style.setSize(btn, new goog.math.Size(100, 50));
            document.body.appendChild(btn);
            btn.addEventListener("click", goog.bind(this._createShape, this));

            /**@private {!Element}*/
            var undoButton = goog.dom.createElement(goog.dom.TagName.INPUT);
            undoButton.id = "undoButton";
            undoButton.style.position = "absolute";
            undoButton.type = "submit";
            undoButton.value = "Undo";
            goog.style.setPosition(undoButton, new goog.math.Coordinate(60, 0));
            goog.style.setSize(undoButton, new goog.math.Size(100, 50));
            document.body.appendChild(undoButton);
            undoButton.addEventListener("click", goog.bind(this._undo, this));

            /**@private {!Element}*/
            var redoButton = goog.dom.createElement(goog.dom.TagName.INPUT);
            redoButton.id = "undoButton";
            redoButton.style.position = "absolute";
            redoButton.type = "submit";
            redoButton.value = "Redo";
            goog.style.setPosition(redoButton, new goog.math.Coordinate(180, 0));
            goog.style.setSize(redoButton, new goog.math.Size(100, 50));
            document.body.appendChild(redoButton);
            redoButton.addEventListener("click", goog.bind(this._redo, this));

            document.addEventListener(ispring.shapes.EventType.SHAPE_ADDED, goog.bind(function (e) {
                this._leftView.addView(e.detail);
            }, this), false);


            document.addEventListener(ispring.shapes.EventType.REDRAW, goog.bind(function (e) {
                this._leftView.redraw(e.detail);
            }, this), false);

            document.addEventListener(ispring.shapes.EventType.REMOVE, goog.bind(function (e) {
                this._leftView.removeShapesAtIndex(e.detail.amount);
                this._model.removeShapesAtIndex(e.detail.amount);
            }, this), false);
            /*goog.events.listen(document, ispring.shapes.EventType.REDRAW, goog.bind(function(e){
                this._leftView.draw();
            }, this));*/

            var lv = this._leftView.getBody();

            lv.onmousedown = goog.bind(function(e){
                var key = this._model.getShapeUId(e);
                var shapeView = this._leftView.getShapeByIndex(key);

                var shiftX = e.pageX - shapeView.getPosition().x;
                var shiftY = e.pageY - shapeView.getPosition().y;

                document.onmousemove = goog.bind(function(e){
                    shapeView.setPosition(new goog.math.Coordinate(e.pageX - shiftX, e.pageY - shiftY));
                    this._leftView.draw();
                }, this);

                lv.onmouseup = goog.bind(function(e){
                    console.log("shapeView.getPosition() = " + shapeView.getPosition());
                    this._model.getShapeByIndex(key).setPosition(shapeView.getPosition());
                    this._history.saveStep(this._model);
                    this._history.readHistory();
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
            this._history.saveStep(this._model);
        },

        /**
         * @private
         */
        _undo:function()
        {
            this._history.undo();
        },

        /**
         * @private
         */
        _redo:function()
        {
            this._history.redo();
        }


    })
});
