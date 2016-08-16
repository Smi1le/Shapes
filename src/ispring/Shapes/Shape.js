goog.provide("ispring.shapes.Shape");

goog.require("goog.math");

goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.shapes.Shape = goog.defineClass(null, {
        constructor:function(position, size, type)
        {
            /**@private {goog.math.Coordinate}*/
            this._position = position;

            /**@private {goog.math.Size}*/
            this._size = size;

            /**@private {string}*/
            this._type = type;

            /**@private {number}*/
            this._key = goog.getUid(this);
            // goog.getUid(this);

            
        },

        /**
         * @public
         * @param position {goog.math.Coordinate}
         */
        setPosition:function(position)
        {
            if(this._position == position)
            {
                return;
            }
            this._position = position;
            /*var event = new CustomEvent(ispring.shapes.EventType.MOVE, {
                "detail" :{
                    "type" : this._type,
                    "key" : this._key,
                    "position" : this._position,
                    "size" : this._size
                }});
            document.dispatchEvent(event);*/
        },

        /**
         * @public
         * @returns {string}
         */
        getType:function()
        {
            return this._type;
        },

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
         * @returns {number}
         */
        getKey:function()
        {
            return this._key;
        },

        /**
         * @public
         * @returns {goog.math.Size|*|number}
         */
        getSize:function()
        {
            return this._size;
        },

        /**
         * @public
         * @param size
         */
        setSize:function(size)
        {
            if (size == this._size)
            {
                return;
            }
            this._size = size;
        },

        /**
         * @public
         * @param key
         */
        setKey:function(key)
        {
            if (key == this._key)
            {
                return;
            }
            this._key = key;
        }
    })
});