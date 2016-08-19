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
            goog.style.setPosition(this._contour, new goog.math.Coordinate(-10, -10));
            goog.style.setSize(this._contour, new goog.math.Size(0, 0));
            document.body.appendChild(this._contour);
            
            
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
            goog.style.setPosition(this._contour, shape.getPosition());
            goog.style.setSize(this._contour, shape.getSize());
        },

        deselectedShape:function()
        {
            goog.style.setPosition(this._contour, new goog.math.Coordinate(-10, -10));
            goog.style.setSize(this._contour, new goog.math.Size(0, 0));
        },

        /**
         * @public
         * @param position
         */
        setPositionContour:function(position)
        {
            goog.style.setPosition(this._contour, position);
        },

        statics:{
            INDENT : 10,
            TOP : 100
        }
    })
});
