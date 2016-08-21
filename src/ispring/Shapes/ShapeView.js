goog.provide("ispring.shapes.ShapeView");

goog.require("goog.math");
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.ShapeView = goog.defineClass(null, {
        constructor:function(type, key)
        {
            /**@private {goog.math.Coordinate}*/
            this._position = new goog.math.Coordinate(200, 200);

            /**@private {goog.math.Size}*/
            this._size = new goog.math.Size(150, 150);

            /**@private {string}*/
            this._type = type;

            /**@private {number}*/
            this._key = key;
        },

        /**
         * @public
         * @virtual
         */
        draw:function() {},


        /**
         * @public
         * @returns {goog.math.Coordinate}
         */
        getPosition:function()
        {
            return this._position;
        },

        /**
         * @public
         * @returns {goog.math.Size}
         */
        getSize:function()
        {
            return this._size;
        },

        /**
         * @public
         * @returns {number}
         */
        getKey:function()
        {
            return this._key;
        },

        /**
         * @public
         * @param pos
         */
        setPosition:function(pos)
        {
            if(pos == this._position)
            {
                return;
            }
            this._position = pos;
        },

        /**
         * @public
         * @param size
         */
        setSize:function(size)
        {
            if(size == this._size)
            {
                return;
            }
            this._size = size;
        }
    })
});
