goog.provide("ispring.shapes.LeftView");

goog.require("ispring.shapes.RectangleView");
goog.require("ispring.shapes.CircleView");
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

            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(10, 100);

            /**@private {!Element}*/
            this._body = goog.dom.createElement(goog.dom.TagName.DIV);
            this._body.id = "leftView";
            goog.style.setPosition(this._body, this._position);
            goog.style.setSize(this._body, new goog.math.Size(this._width, this._height));
            document.body.appendChild(this._body);

            /**@private {!Element}*/
            this._contour = goog.dom.createElement(goog.dom.TagName.DIV);
            this._contour.id = "contour";
            goog.style.setPosition(this._contour, ispring.shapes.LeftView.START_POINT);
            goog.style.setSize(this._contour, ispring.shapes.LeftView.START_SIZE);
            document.body.appendChild(this._contour);
            
            for (var i = 0; i != 8; ++i)
            {
                this._resizePointsList[i] = goog.dom.createElement(goog.dom.TagName.DIV);
                if (i < 4) {
                    this._resizePointsList[i].id = "cornerResizePoint";
                }
                else {
                    this._resizePointsList[i].id = "resizePoint";
                }
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
            this._settingFifthPointResizing();
            this._settingSixthPointResizing();
            this._settingSeventhPointResizing();
            this._settingEighthPointResizing();
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
                if(shape != undefined) {
                    document.onmousemove = goog.bind(function (e) {
                        var oldPos = shape.getPosition();
                        var shiftX = oldPos.x - e.pageX;
                        var shiftY = oldPos.y - e.pageY;
                        var width = shape.getSize().width + shiftX;
                        var height = shape.getSize().height + shiftY;
                        var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                        if (this.checkOutputAbroadForResize(pos)) {
                            shape.setPosition(pos);
                            shape.setSize(new goog.math.Size(width, height));
                            goog.style.setPosition(this._contour, new goog.math.Coordinate(e.pageX, e.pageY));
                            goog.style.setSize(this._contour, new goog.math.Size(width, height));
                            this.setPositionResizePoints(shape);
                            var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                                "detail": {
                                    "shape": shape
                                }
                            });
                            document.dispatchEvent(event);
                            this.draw();
                        }
                    }, this);

                    this._resizePointsList[0].onmouseup = goog.bind(function (e) {
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                            "detail": {
                                "shapeView": shape
                            }
                        });
                        document.dispatchEvent(event);
                        document.onmousemove = null;
                        this._resizePointsList[0].onmouseup = null;
                    }, this);
                }
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
                    var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                    if (this.checkOutputAbroadForResize(pos)) {
                        shape.setPosition(new goog.math.Coordinate(shape.getPosition().x, e.pageY));
                        shape.setSize(new goog.math.Size(width, height));
                        goog.style.setPosition(this._contour, new goog.math.Coordinate(shape.getPosition().x, e.pageY));
                        goog.style.setSize(this._contour, new goog.math.Size(width, height));
                        this.setPositionResizePoints(shape);
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                            "detail": {
                                "shape": shape
                            }
                        });
                        document.dispatchEvent(event);
                        this.draw();
                    }
                }, this);

                this._resizePointsList[1].onmouseup = goog.bind(function (e) {
                    var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                        "detail": {
                            "shapeView": shape
                        }
                    });
                    document.dispatchEvent(event);
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
                    var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                    if (this.checkOutputAbroadForResize(pos)) {
                        shape.setPosition(new goog.math.Coordinate(shape.getPosition().x, shape.getPosition().y));
                        shape.setSize(new goog.math.Size(width, height));
                        goog.style.setPosition(this._contour, new goog.math.Coordinate(shape.getPosition().x, shape.getPosition().y));
                        goog.style.setSize(this._contour, new goog.math.Size(width, height));
                        this.setPositionResizePoints(shape);
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                            "detail": {
                                "shape": shape
                            }
                        });
                        document.dispatchEvent(event);
                        this.draw();
                    }
                }, this);

                this._resizePointsList[2].onmouseup = goog.bind(function (e) {
                    var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                        "detail": {
                            "shapeView": shape
                        }
                    });
                    document.dispatchEvent(event);
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
                    var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                    if (this.checkOutputAbroadForResize(pos)) {
                        shape.setPosition(new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                        shape.setSize(new goog.math.Size(width, height));
                        goog.style.setPosition(this._contour, new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                        goog.style.setSize(this._contour, new goog.math.Size(width, height));
                        this.setPositionResizePoints(shape);
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                            "detail": {
                                "shape": shape
                            }
                        });
                        document.dispatchEvent(event);
                        this.draw();
                    }
                }, this);

                this._resizePointsList[3].onmouseup = goog.bind(function (e) {
                    var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                        "detail": {
                            "shapeView": shape
                        }
                    });
                    document.dispatchEvent(event);
                    document.onmousemove = null;
                    this._resizePointsList[3].onmouseup = null;
                }, this);
            }, this);
        },

        _settingFifthPointResizing:function()
        {
            this._resizePointsList[4].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                if(shape != undefined) {
                    document.onmousemove = goog.bind(function (e) {
                        var oldPos = shape.getPosition();
                        var shiftY = oldPos.y - e.pageY;
                        var height = shape.getSize().height + shiftY;
                        var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                        if (this.checkOutputAbroadForResize(pos)) {
                            shape.setPosition(new goog.math.Coordinate(oldPos.x, e.pageY));
                            shape.setSize(new goog.math.Size(shape.getSize().width, height));
                            goog.style.setPosition(this._contour, new goog.math.Coordinate(oldPos.x, e.pageY));
                            goog.style.setSize(this._contour, new goog.math.Size(shape.getSize().width, height));
                            this.setPositionResizePoints(shape);
                            var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                                "detail": {
                                    "shape": shape
                                }
                            });
                            document.dispatchEvent(event);
                            this.draw();
                        }
                    }, this);

                    this._resizePointsList[4].onmouseup = goog.bind(function (e) {
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                            "detail": {
                                "shapeView": shape
                            }
                        });
                        document.dispatchEvent(event);
                        document.onmousemove = null;
                        this._resizePointsList[4].onmouseup = null;
                    }, this);
                }
            }, this);
        },

        _settingSixthPointResizing:function()
        {
            this._resizePointsList[5].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                if(shape != undefined) {
                    document.onmousemove = goog.bind(function (e) {
                        var oldPos = new goog.math.Coordinate(shape.getPosition().x + shape.getSize().width,
                            shape.getPosition().y);
                        var shiftX = oldPos.x - e.pageX;
                        var width = shape.getSize().width - shiftX;
                        var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                        if (this.checkOutputAbroadForResize(pos)) {
                            shape.setSize(new goog.math.Size(width, shape.getSize().height));
                            goog.style.setSize(this._contour, new goog.math.Size(width, shape.getSize().height));
                            this.setPositionResizePoints(shape);
                            var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                                "detail": {
                                    "shape": shape
                                }
                            });
                            document.dispatchEvent(event);
                            this.draw();
                        }
                    }, this);

                    this._resizePointsList[5].onmouseup = goog.bind(function (e) {
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                            "detail": {
                                "shapeView": shape
                            }
                        });
                        document.dispatchEvent(event);
                        document.onmousemove = null;
                        this._resizePointsList[5].onmouseup = null;
                    }, this);
                }
            }, this);
        },

        /**@private*/
        _settingSeventhPointResizing:function()
        {
            this._resizePointsList[6].onmousedown = goog.bind(function(e){
                var shape = null;
                for (var i = 0; i != this._viewList.length; ++i) {
                    if (this._viewList[i].getKey() == this._numberVariableShape) {
                        shape = this._viewList[i];
                    }
                }
                document.onmousemove = goog.bind(function(e){
                    var oldPos = new goog.math.Coordinate(shape.getPosition().x + shape.getSize().width,
                        shape.getPosition().y + shape.getSize().height);
                    var shiftY = oldPos.y - e.pageY;
                    var height = shape.getSize().height - shiftY;
                    var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                    if (this.checkOutputAbroadForResize(pos)) {
                        shape.setSize(new goog.math.Size(shape.getSize().width, height));
                        goog.style.setSize(this._contour, new goog.math.Size(shape.getSize().width, height));
                        this.setPositionResizePoints(shape);
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                            "detail": {
                                "shape": shape
                            }
                        });
                        document.dispatchEvent(event);
                        this.draw();
                    }
                }, this);

                this._resizePointsList[6].onmouseup = goog.bind(function (e) {
                    var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                        "detail": {
                            "shapeView": shape
                        }
                    });
                    document.dispatchEvent(event);
                    document.onmousemove = null;
                    this._resizePointsList[6].onmouseup = null;
                }, this);
            }, this);
        },

        /**@private*/
        _settingEighthPointResizing:function()
        {
            this._resizePointsList[7].onmousedown = goog.bind(function(e){
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
                    var width = shape.getSize().width + shiftX;
                    var pos = new goog.math.Coordinate(e.pageX, e.pageY);
                    if (this.checkOutputAbroadForResize(pos)) {
                        shape.setPosition(new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                        shape.setSize(new goog.math.Size(width, shape.getSize().height));
                        goog.style.setPosition(this._contour, new goog.math.Coordinate(e.pageX, shape.getPosition().y));
                        goog.style.setSize(this._contour, new goog.math.Size(width, shape.getSize().height));
                        this.setPositionResizePoints(shape);
                        var event = new CustomEvent(ispring.shapes.EventType.RESIZE_RIGHT_VIEW, {
                            "detail": {
                                "shape": shape
                            }
                        });
                        document.dispatchEvent(event);
                        this.draw();
                    }
                }, this);

                this._resizePointsList[7].onmouseup = goog.bind(function (e) {
                    var event = new CustomEvent(ispring.shapes.EventType.RESIZE, {
                        "detail": {
                            "shapeView": shape
                        }
                    });
                    document.dispatchEvent(event);
                    document.onmousemove = null;
                    this._resizePointsList[7].onmouseup = null;
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
            var view;
            if (detail.type == "rectangle") {
                view = new ispring.shapes.RectangleView(detail.key);
            }
            else if(detail.type == "circle")
            {
                view = new ispring.shapes.CircleView(detail.key);
            }
            goog.array.insert(this._viewList, view);
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
                var position = null;
                var size = null;
                if (view.getType() == "rectangle") {
                    position = (view.getPosition().x - ispring.shapes.LeftView.INDENT) + "px " +
                        (view.getPosition().y - ispring.shapes.LeftView.TOP) + "px";
                    size = view.getSize().width + "px " + view.getSize().height + "px";
                    background += "linear-gradient(-45deg, #ba3e23, #f7941e) " + position + " / " + size;
                }
                else if (view.getType() == "circle")
                {
                    position = (view.getPosition().x - ispring.shapes.LeftView.INDENT - this._width / 2 + view.getSize().width / 2) + "px " +
                        (view.getPosition().y - ispring.shapes.LeftView.TOP - this._height / 2 + view.getSize().height / 2) + "px";
                    background += "radial-gradient(circle closest-side, " + " #333 " +  view.getRadius() + "px, white 1px, white 5px, transparent 6px)"
                        + position;
                }
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
                    this._viewList[i].setSize(e.shape.getSize());
                }
            }
            this.draw();
        },

        checkOutputAbroad:function(position, shapeSize)
        {
            return ((position.x >= this._position.x) && (position.x + shapeSize.width <= this._position.x + this._width) &&
            (position.y >= this._position.y) && (position.y + shapeSize.height <= this._position.y + this._height));

        },

        checkOutputAbroadForResize:function(position)
        {
            return ((position.x >= this._position.x) && (position.x <= this._position.x + this._width) &&
            (position.y >= this._position.y) && (position.y <= this._position.y + this._height));

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
            for (var i = 0; i != this._resizePointsList.length; ++i)
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
            var shapeSize = shape.getSize();
            goog.style.setPosition(this._resizePointsList[0], new goog.math.Coordinate(shape.getPosition().x - size.width / 2,
                shape.getPosition().y - size.height / 2));
            goog.style.setPosition(this._resizePointsList[1], new goog.math.Coordinate(shape.getPosition().x +
                shape.getSize().width - size.width / 2, shape.getPosition().y - size.height / 2));
            goog.style.setPosition(this._resizePointsList[2], new goog.math.Coordinate(shape.getPosition().x +
                shape.getSize().width - size.width / 2, shape.getPosition().y + shape.getSize().height - size.height / 2));
            goog.style.setPosition(this._resizePointsList[3], new goog.math.Coordinate(shape.getPosition().x - size.width / 2,
                shape.getPosition().y + shape.getSize().height - size.height / 2));
            goog.style.setPosition(this._resizePointsList[4], new goog.math.Coordinate(shape.getPosition().x - size.width / 2 + shapeSize.width / 2,
                shape.getPosition().y - size.height / 2));
            goog.style.setPosition(this._resizePointsList[5], new goog.math.Coordinate(shape.getPosition().x - size.width / 2 + shapeSize.width,
                shape.getPosition().y - size.height / 2 + shapeSize.height / 2));
            goog.style.setPosition(this._resizePointsList[6], new goog.math.Coordinate(shape.getPosition().x - size.width / 2 + shapeSize.width / 2,
                shape.getPosition().y - size.height / 2 + shapeSize.height));
            goog.style.setPosition(this._resizePointsList[7], new goog.math.Coordinate(shape.getPosition().x - size.width / 2,
                shape.getPosition().y - size.height / 2 + shapeSize.height / 2));
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
