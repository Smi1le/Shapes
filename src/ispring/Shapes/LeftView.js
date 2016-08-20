goog.provide("ispring.shapes.LeftView");

// goog.require("ispring.shapes.Rectangle");
goog.require("ispring.shapes.RectangleView");
goog.require("goog.math");
goog.require("goog.dom");
goog.require("goog.array");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.LeftView = goog.defineClass(null, {
        constructor:function()
        {
            /**@private {Array}*/
            this._viewList = [];

            /**@private {Array}*/
            this._resizePointsList = [];

            /**@private {?number}*/
            this._numberVariableShape = null;

            /**@private {?boolean}*/
            this._isShapeSelected = false;

            /**@private {number}*/
            this._width = (document.documentElement.clientWidth / 2) - ispring.shapes.LeftView.INDENT * 2;

            /**@private {number}*/
            this._height = document.documentElement.clientHeight - ispring.shapes.LeftView.TOP - ispring.shapes.LeftView.INDENT;

            /**@private {!Element}*/
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.id = "leftView";
            goog.style.setPosition(this._body, new goog.math.Coordinate(10, 100));
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);

            /**@private {!Element}*/
            this._contour = goog.dom.createElement(goog.dom.TagName.DIV);
            this._contour.id = "contour";
            goog.style.setPosition(this._contour, ispring.shapes.LeftView.START_POINT);
            goog.style.setSize(this._contour, ispring.shapes.LeftView.START_SIZE);
            document.body.appendChild(this._contour);
            
            for (var i = 0; i != 4; ++i)
            {
                this._resizePointsList[i] = goog.dom.createElement(goog.dom.TagName.DIV);
                this._resizePointsList[i].id = "resizePoint";
                goog.style.setPosition(this._resizePointsList[i], ispring.shapes.LeftView.START_POINT);
                goog.style.setSize(this._resizePointsList[i], ispring.shapes.LeftView.START_SIZE);
                document.body.appendChild(this._resizePointsList[i]);
            }

            this._settingPointsResizing();
        },

        _settingPointsResizing:function()
        {
            this._settingFirstPointResizing();
            this._settingSecondPointResizing();
            this._settingThirdPointResizing();
            this._settingFourthPointResizing();
        },

        /**@private*/
        _settingFirstPointResizing:function()
        {
            this._resizePointsList[0].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                document.onmousemove = goog.bind(function(e){
                    var oldPos = shape.getPosition();
                    var shiftX = oldPos.x - e.pageX;
                    var shiftY = oldPos.y - e.pageY;
                    var width = shape.getSize().width + shiftX;
                    var height = shape.getSize().height + shiftY;
                    shape.setPosition(new goog.math.Coordinate(e.pageX, e.pageY));
                    shape.setSize(new goog.math.Size(width, height));
                    goog.style.setPosition(this._contour, new goog.math.Coordinate(e.pageX, e.pageY));
                    goog.style.setSize(this._contour, new goog.math.Size(width, height));
                    this.setPositionResizePoints(shape);
                    this.draw();
                }, this);

                this._resizePointsList[0].onmouseup = goog.bind(function (e) {
                    document.onmousemove = null;
                    this._resizePointsList[0].onmouseup = null;
                }, this);
            }, this);
        },

        /**@private*/
        _settingSecondPointResizing:function()
        {
            this._resizePointsList[1].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                document.onmousemove = goog.bind(function(e){
                    var oldPos = new goog.math.Coordinate(shape.getPosition().x + shape.getSize().width,
                        shape.getPosition().y);
                    var shiftX = oldPos.x - e.pageX;
                    var shiftY = oldPos.y - e.pageY;
                    var width = shape.getSize().width - shiftX;
                    var height = shape.getSize().height + shiftY;
                    shape.setPosition(new goog.math.Coordinate(shape.getPosition().x, e.pageY));
                    shape.setSize(new goog.math.Size(width, height));
                    goog.style.setPosition(this._contour, new goog.math.Coordinate(shape.getPosition().x, e.pageY));
                    goog.style.setSize(this._contour, new goog.math.Size(width, height));
                    this.setPositionResizePoints(shape);
                    this.draw();
                }, this);

                this._resizePointsList[1].onmouseup = goog.bind(function (e) {
                    document.onmousemove = null;
                    this._resizePointsList[1].onmouseup = null;
                }, this);
            }, this);
        },

        /**@private*/
        _settingThirdPointResizing:function()
        {
            this._resizePointsList[2].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                document.onmousemove = goog.bind(function(e){
                    var oldPos = new goog.math.Coordinate(shape.getPosition().x + shape.getSize().width,
                        shape.getPosition().y + shape.getSize().height);
                    var shiftX = oldPos.x - e.pageX;
                    var shiftY = oldPos.y - e.pageY;
                    var width = shape.getSize().width - shiftX;
                    var height = shape.getSize().height - shiftY;
                    shape.setPosition(new goog.math.Coordinate(shape.getPosition().x, shape.getPosition().y));
                    shape.setSize(new goog.math.Size(width, height));
                    goog.style.setPosition(this._contour, new goog.math.Coordinate(shape.getPosition().x, shape.getPosition().y));
                    goog.style.setSize(this._contour, new goog.math.Size(width, height));
                    this.setPositionResizePoints(shape);
                    this.draw();
                }, this);

                this._resizePointsList[2].onmouseup = goog.bind(function (e) {
                    document.onmousemove = null;
                    this._resizePointsList[2].onmouseup = null;
                }, this);
            }, this);
        },

        /**@private*/
        _settingFourthPointResizing:function()
        {
            this._resizePointsList[3].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                document.onmousemove = goog.bind(function(e){
                    var oldPos = new goog.math.Coordinate(shape.getPosition().x,
                        shape.getPosition().y + shape.getSize().height);
                    var shiftX = oldPos.x - e.pageX;
                    var shiftY = oldPos.y - e.pageY;
                    var width = shape.getSize().width + shiftX;
                    var height = shape.getSize().height - shiftY;
                    shape.setPosition(new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                    shape.setSize(new goog.math.Size(width, height));
                    goog.style.setPosition(this._contour, new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                    goog.style.setSize(this._contour, new goog.math.Size(width, height));
                    this.setPositionResizePoints(shape);
                    this.draw();
                }, this);

                this._resizePointsList[3].onmouseup = goog.bind(function (e) {
                    document.onmousemove = null;
                    this._resizePointsList[3].onmouseup = null;
                }, this);
            }, this);
        },

        /**
         * @public
         * @returns {!Element|*}
         */
        getBody:function()
        {
            return this._body;
        },

        /**
         * @public
         * @param detail
         */
        addView:function(detail)
        {
            var rectView = new ispring.shapes.RectangleView(detail.key);
            goog.array.insert(this._viewList, rectView);
            this.draw();
        },


        moveShape:function(detail)
        {
            for(var i = 0; i != this._viewList.length; ++i)
            {
                var shape = this._viewList[i];
                if (detail.key == shape.getKey())
                {
                    shape.setPosition(detail.position);
                    shape.setSize(detail.size);
                }
            }
            this.draw();
        },

        /**
         * @public
         * @param key
         * @returns {number|*|goog.math.Coordinate|Array|goog.positioning.AbstractPosition|!goog.math.Coordinate}
         */
        getShapeByIndex:function(key)
        {
            for (var i = 0; i != this._viewList.length; ++i) {
                if (key == this._viewList[i].getKey())
                {
                    return this._viewList[i];
                }
            }
        },

        getContour:function()
        {
            return this._contour;
        },


        /**
         * @public
         */
        draw:function()
        {
            var background = "";
            for(var i = 0; i != this._viewList.length; ++i)
            {
                var view = this._viewList[i];
                var position = (view.getPosition().x - ispring.shapes.LeftView.INDENT) + "px " +
                    (view.getPosition().y - ispring.shapes.LeftView.TOP) + "px";
                var size = view.getSize().width + "px " + view.getSize().height + "px";
                background += "linear-gradient(-45deg, #ba3e23, #f7941e) " + position + " / " + size;

                if (i + 1 != this._viewList.length)
                {
                    background += ", ";
                }

            }

            this._body.style.background = background;
            this._body.style.backgroundRepeat = "no-repeat";
        },

        /**
         * @public
         */
        removeLastShape:function()
        {
            this._viewList.splice(this._viewList.length - 1);
            this.draw();
        },

        redraw:function(e) {
            for (var i = 0; i != this._viewList.length; ++i)
            {
                if (e.shape.getKey() == this._viewList[i].getKey())
                {
                    this._viewList[i].setPosition(e.shape.getPosition());
                }
            }
            this.draw();
        },

        chooseShape:function(shape)
        {
            this._isShapeSelected = true;
            this._numberVariableShape = shape.getKey();
            goog.style.setPosition(this._contour, shape.getPosition());
            goog.style.setSize(this._contour, shape.getSize());
            var size = ispring.shapes.LeftView.SIZE_RESIZE_POINT;
            for(var i = 0; i != this._resizePointsList.length; ++i)
            {
                var point = this._resizePointsList[i];
                goog.style.setSize(point, size);
            }

            this.setPositionResizePoints(shape);
        },

        getShapeSelected:function()
        {
            return this._isShapeSelected;
        },

        deselectedShape:function()
        {
            goog.style.setPosition(this._contour, ispring.shapes.LeftView.START_POINT);
            goog.style.setSize(this._contour, ispring.shapes.LeftView.START_SIZE);
            for (var i = 0; i != 4; ++i)
            {
                goog.style.setPosition(this._resizePointsList[i], ispring.shapes.LeftView.START_POINT);
            }
        },

        /**
         * @public
         * @param position
         */
        setPositionContour:function(position)
        {
            goog.style.setPosition(this._contour, position);

        },

        /**
         * @public
         * @param shape
         */
        setPositionResizePoints:function(shape)
        {
            var size = ispring.shapes.LeftView.SIZE_RESIZE_POINT;
            goog.style.setPosition(this._resizePointsList[0], new goog.math.Coordinate(shape.getPosition().x - size.width / 2,
                shape.getPosition().y - size.height / 2));
            goog.style.setPosition(this._resizePointsList[1], new goog.math.Coordinate(shape.getPosition().x +
                shape.getSize().width - size.width / 2, shape.getPosition().y - size.height / 2));
            goog.style.setPosition(this._resizePointsList[2], new goog.math.Coordinate(shape.getPosition().x +
                shape.getSize().width - size.width / 2, shape.getPosition().y + shape.getSize().height - size.height / 2));
            goog.style.setPosition(this._resizePointsList[3], new goog.math.Coordinate(shape.getPosition().x - size.width / 2,
                shape.getPosition().y + shape.getSize().height - size.height / 2));
        },

        statics:{
            INDENT : 10,
            TOP : 100,
            START_POINT : new goog.math.Coordinate(-30, -30),
            START_SIZE : new goog.math.Size(0, 0),
            SIZE_RESIZE_POINT : new goog.math.Size(20, 20)
        }
    })
});
